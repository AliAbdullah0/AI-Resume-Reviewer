"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const router = useRouter()
    const [error,setError] = useState<string | null>(null);
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);
        const res = await signUp.email({
            name:formData.get('name') as string,
            email:formData.get('email') as string,
            password:formData.get('password') as string,
        })
        if(res.error){
            setError(res.error.message || 'An error occurred during sign up.');
        }else{
            router.push('/dashboard');
        }
    }
  return (
    <main className="max-w-md mx-auto p-6 space-y-4 text-white">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <form action="" onSubmit={handleSubmit} className="space-y-4">
        <input
         type="text" 
         name="name" 
         placeholder="Full Name"
         required
         className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
        />
        <input
         type="email" 
         name="email" 
         placeholder="Email"
         required
         className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
        />
        <input
         type="password" 
         name="password" 
         placeholder="Password"
         required
         className="w-full p-2 border border-gray-300 rounded bg-gray-800 text-white"
        />
        <button
        type="submit"
        className="w-full bg-white text-black font-medium rouned-md px-4 py-2 hover:bg-gray-200 transition"
        >Create Account</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}