"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"] });

export default function Mail() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError(value.length < 8 ? "Password must be at least 8 characters" : "");
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isFormValid = password.length >= 8 && password === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col items-start h-screen bg-black text-[#e6e6e6]">
      <div className="flex items-start gap-4 h-auto text-base p-4 w-full">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h1 className={`${space.className}`}>Set a new password</h1>
      </div>
      <div className="bg-gray-950 flex flex-col rounded-3xl rounded-b-none h-screen w-full">
        <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6">
          <h1 className="pb-3">Enter your new password below</h1>
          
          <div className="flex flex-col gap-2">
            <label>New password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="h-12 rounded-xl outline-none focus:ring-0"
            />
            {error && <p className="text-[#db5930]">{error}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="h-12 rounded-xl outline-none focus:ring-0"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[#db5930]">Passwords do not match</p>
            )}
          </div>

          <Button
            type="submit"
            variant="secondary"
            disabled={!isFormValid}
            className={`p-2 rounded ${!isFormValid ? "cursor-not-allowed opacity-50" : ""}`}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
