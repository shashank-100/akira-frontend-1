"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const space = Space_Grotesk({ subsets: ["latin"] });

export default function Reset() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value) ? "" : "Invalid email format");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Email:", email);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#e6e6e6]">
      <header className="flex items-center gap-4 p-4 text-base w-full">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h1 className={space.className}>Reset your password</h1>
      </header>

      <main className="bg-gray-950 flex flex-col rounded-3xl rounded-b-none h-full w-full p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h1 className="pb-3">Enter your email to receive a reset link.</h1>

          <div className="flex flex-col gap-2">
            <label>Email Address</label>
            <input
              className="h-12 rounded-xl outline-none focus:ring-0 p-2"
              onChange={handleChange}
              type="text"
              placeholder="Enter email address"
              value={email}
            />
            {error && <p className="text-[#db5930] text-sm">{error}</p>}
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={!email || error !== ""}
            className={`p-2 rounded ${
              !email || error ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            Send reset link
          </Button>
        </form>
      </main>
    </div>
  );
}
