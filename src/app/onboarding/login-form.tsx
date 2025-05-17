"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface LoginFormProps {
    onSwitchToSignup: () => void
    onResetPassword: () => void
  }


export default function LoginForm({ onSwitchToSignup, onResetPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Login your account</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loginEmail">Email address</Label>
          <Input
            id="loginEmail"
            type="email"
            placeholder="Enter email address"
            className="bg-black border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loginPassword">Password</Label>
          <div className="relative">
            <Input
              id="loginPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter an 8 digit password"
              className="bg-black border-gray-800 text-white placeholder:text-gray-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex justify-end mt-1">
            <button type="button"
      onClick={onResetPassword}
      className="text-sm text-[#E13D2D] hover:underline">Reset Password</button>
  </div>
        </div>

        <Button type="submit" className="w-full bg-[#E13D2D] hover:bg-[#c13525] text-white py-6 rounded-md mt-4">
          Login
        </Button>

        <div className="text-center text-sm text-gray-400 mt-4">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSwitchToSignup} className="text-[#E13D2D] cursor-pointer hover:underline">
            Create an account
          </button>
        </div>
      </form>
    </>
  )
}

