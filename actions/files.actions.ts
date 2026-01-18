"use server"

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma"
import { GoogleGenAI,Type } from "@google/genai";
import z from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { Buffer } from "buffer";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema = z.object({
  title: z.string(),
  skills: z.array(z.string()),
  experience: z.array(z.string()),
  education: z.array(z.string()),
  rating: z.number(),
  improvements: z.array(z.string()),
});

interface responseType {
    title:string;
    skills:string[];
    experience:string[];
    education:string[];
    rating:number;
    improvements:string[];
}

export const createResponse = async (data:responseType)=>{
    const session = await auth.api.getSession();
    try {
        const res = await prisma.response.create({
            data:{
                userId:session?.user.id!,
                response: JSON.stringify(data),
                fileId:"",
            }
        })
        return {
            status : 201,
            message:"Review stored in database successfully !",
        }
    } catch (error) {
        return {
            status:500,
            message:error
        }
    }
}

export const getAllResponses = async ()=>{
    try {
        const response = await prisma.response.findMany({
            include:{
                user:true,
            }
        })
        return response;
    } catch (error) {
        throw error
    }
}

export const getFiles = async ()=>{
    try{
        const files = await prisma.file.findMany({})
        return {
            status:200,
            files
        };
    } catch (error){
        throw error
    }
}

export const getResponseById = async (id:string)=>{
    try{
        const res = await prisma.response.findUnique({
            where:{
                id:id
            },
            include:{
                user:true,
            }
        })
        if(!res) return {
            status:404,
            message:"Response not found !"
        }
        return res;
    } catch (error) {
        throw error
    }
}

export const deleteResponse = async (id:string)=>{
    try {
        await prisma.response.delete({
            where:{
                id:id
            }
        })
        return {
            status:200,
            message:"Response Deleted Successfully !"
        }
    } catch(error){
        throw error
    } 
}



export const reviewResume = async (form: FormData) => {
    const schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Title of resume" },
    skills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List skills"
    },
    experience: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List experiences"
    },
    education: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List educations"
    },
    rating:{ type : Type.NUMBER,description:"give rating out of 10"},
    improvements: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List 4-5 improvements"
    },
  },
  required: ["title", "skills", "experience","education","rating","improvements"]
};
  try {
    const file = form.get("file") as Blob;

    if (!file) {
      return { error: "No file uploaded", status: 400 };
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    const contents = [
      { text: "Extract resume details and provide feedback and rating" },
      { inlineData: { mimeType: "application/pdf", data: base64Data } },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema:schema,
        systemInstruction: "You are an expert resume reviewer with a critical.You value honesty and brevity.",
      },
    });

    console.log("Raw Gemini response:", response);
    await createResponse(responseSchema.parse(JSON.parse(response.text!)))
    const result = responseSchema.parse(JSON.parse(response.text!));

    return { result, status: 200 };
  } catch (err: any) {
    console.error("Error in reviewResume server action:", err);
    return { error: err.message || "Unknown error", status: 500 };
  }
};
