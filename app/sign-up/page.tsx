"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "An error occurred during sign up.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-lg border border-gray-200 rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-black mb-2">
            Create Account
          </CardTitle>
          {error && <p className="text-red-500 mb-2">{error}</p>}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="bg-white"
            />

            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="bg-white"
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="bg-white"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
