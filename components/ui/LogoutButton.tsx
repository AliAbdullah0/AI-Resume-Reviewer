"use client";

import { Button } from "./button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    await signOut();
    router.push('/')
    // Delay added so animation is visible for a moment
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? "Logging Out..." : "Log Out"}
    </Button>
  );
};

export default LogoutButton;
