"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconFolderCode, IconStar, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { reviewResume } from "@/actions/files.actions";

interface responseType {
  title: string;
  skills: string[];
  experience: string[];
  education: string[];
  rating: number;
  improvements: string[];
}

interface LoadingSkeletonProps {
  lines?: number;
  height?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ lines = 3, height = "h-4" }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className={`animate-pulse bg-gray-200 rounded-md ${height} w-full`}
      />
    ))}
  </div>
);

const RatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: 10 }, (_, i) => (
    <IconStar
      key={i}
      className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
    />
  ));

  return (
    <div className="flex items-center gap-2">
      <div className="flex">{stars}</div>
      <span className="text-sm font-medium text-gray-300">{rating}/10</span>
    </div>
  );
};

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reviewResult, setReviewResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log(formData.get('file'));
      const res = await reviewResume(formData);
      console.log(res.result);
      setReviewResult(res.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetReview = () => {
    setReviewResult(null);
    setSelectedFile(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-8 rounded-md px-4 sm:px-6 lg:px-8">
      <div className="4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Analyzer</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Upload your resume to get comprehensive analysis and improvement suggestions
          </p>
        </div>

        {!reviewResult ? (
          <div className="grid place-items-center min-h-[60vh]">
            <Empty className="w-full max-w-md">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="text-primary">
                  <IconFolderCode className="h-12 w-12" />
                </EmptyMedia>
                <EmptyTitle className="text-2xl">No Resumes Analyzed</EmptyTitle>
                <EmptyDescription className="text-center">
                  Get started by uploading your resume to receive detailed analysis and personalized improvement suggestions.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="flex-1">
                        <IconFolderCode className="mr-2 h-4 w-4" />
                        Upload Resume
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Upload Your Resume</DialogTitle>
                        <DialogDescription className="text-sm">
                          Please upload your resume in PDF format. We'll analyze it and provide comprehensive feedback.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="grid flex-1 gap-2">
                            <Label htmlFor="file" className="text-sm font-medium">
                              Select PDF File
                            </Label>
                            <Input
                              id="file"
                              type="file"
                              accept="application/pdf"
                              required
                              onChange={handleFileChange}
                              disabled={loading}
                              className="cursor-pointer"
                            />
                          <DialogClose asChild>
                            <Button 
                              onClick={handleUpload} 
                              disabled={!selectedFile || loading}
                              className="min-w-25 mt-3"
                              >
                              {loading ? (
                                <>
                                  <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Analyzing...
                                </>
                              ) : (
                                "Analyze"
                              )}
                            </Button>
                          </DialogClose>
                              </div>
                        </div>
                        {selectedFile && (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                            <IconAlertCircle className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-gray-700">
                              Selected: {selectedFile.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <p className="text-xs text-gray-500">
                          Only PDF files are supported.
                        </p>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className="bg-linear-to-r bg-black text-white p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg md:text-xl">{reviewResult.title}</CardTitle>
                    <CardDescription className="text-blue-100 text-sm">
                      Resume Analysis Complete
                    </CardDescription>
                  </div>
                  <RatingDisplay rating={reviewResult.rating} />
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Overall Score</span>
                    <span className="font-semibold text-gray-900">
                      {reviewResult.rating}/10
                    </span>
                  </div>
                  <Progress value={(reviewResult.rating / 10) * 100} className="w-full h-2" />
                </div>

                <Separator className="my-4" />

                <Card className="border border-neutral-50 bg-white shadow-sm">
                  <CardHeader className="pb-3 p-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <div className="h-2 w-2 bg-green-500 rounded-full" />
                      Skills Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {reviewResult.skills.map((skill:string, idx:number) => (
                        <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Separator className="my-4" />

                <Card className="border border-neutral-50 bg-white shadow-sm">
                  <CardHeader className="pb-3 p-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <div className="h-2 w-2 bg-blue-500 rounded-full" />
                      Professional Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-3">
                      {reviewResult.experience.map((exp:string, idx:number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                          <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 shrink-0" />
                          <span className="text-gray-700">{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Separator className="my-4" />
                <Card className="border border-neutral-50 bg-white shadow-sm">
                  <CardHeader className="pb-3 p-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <div className="h-2 w-2 bg-purple-500 rounded-full" />
                      Education Background
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-3">
                      {reviewResult.education.map((edu:string, idx:number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm md:text-base">
                          <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 shrink-0" />
                          <span className="text-gray-700">{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Separator className="my-4" />
                <Card className="border-0 bg-linear-to-r from-red-50 to-orange-50 shadow-sm">
                  <CardHeader className="pb-3 p-4">
                    <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                      <div className="h-2 w-2 bg-red-500 rounded-full" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-4">
                      {reviewResult.improvements.map((imp:string, idx:number) => (
                        <li key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                          <div className="h-2 w-2 bg-red-400 rounded-full mt-2 shrink-0" />
                          <div className="text-sm md:text-base text-gray-700">
                            <p>{imp}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter className="pt-4 md:pt-6 bg-gray-50 border-t p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-3 w-full justify-between items-center">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600">
                      Ready to improve your resume? Focus on the highlighted areas above.
                    </p>
                  </div>
                  <Button 
                    onClick={resetReview} 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    size="lg"
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        {loading && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md shadow-xl">
              <CardContent className="p-6 text-center space-y-4">
                <IconLoader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <h3 className="text-lg font-semibold text-gray-900">Analyzing Resume</h3>
                <p className="text-sm text-gray-600">
                  We're processing your resume and generating detailed feedback. This may take a few moments.
                </p>
                <LoadingSkeleton lines={3} height="h-2" />
                <div className="flex justify-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full animate-pulse" 
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}