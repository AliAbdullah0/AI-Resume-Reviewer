"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 ">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="">
          <CardTitle className="text-2xl font-semibold text-black mb-2">Sign In</CardTitle>
          {error && <p className="text-red-500 mb-2">{error}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="email" type="email" placeholder="Email" required className="bg-white" />
            <Input name="password" type="password" placeholder="Password" required className="bg-white" />
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
              Sign In
            </Button>
          </form>
          <CardFooter className="border-t ">
            Already have an account?{' '}
            <Link href="/sign-up" className="text-blue-600 text-sm hover:underline">
              Sign Up
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
  );
}
