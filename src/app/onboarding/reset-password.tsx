"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ResetPasswordFormProps {
  onSwitchToLogin: () => void
}

export default function ResetPasswordForm({ onSwitchToLogin }: ResetPasswordFormProps) {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Reset your password</h1>
      <p className="text-gray-400 text-sm mb-8">Enter your email to receive a reset link.</p>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="resetEmail">Email address</Label>
          <Input
            id="resetEmail"
            type="email"
            placeholder="Enter email address"
            className="bg-black border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        <Button type="submit" className="w-full bg-[#E13D2D] hover:bg-[#c13525] cursor-pointer text-white py-6 rounded-md mt-4">
          Send reset link
        </Button>

        <div className="text-center text-sm text-gray-400 mt-4">
          Remember your password?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-[#E13D2D] cursor-pointer hover:underline">
            Back to login
          </button>
        </div>
      </form>
    </>
  )
}