"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SignupFormProps {
  onSwitchToLogin: () => void
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <>
      <h1 className="text-2xl font-semibold mb-8">Create your account</h1>

      <form className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Enter full name"
            className="bg-black border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            className="bg-black border-gray-800 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="bg-black border-gray-800 text-white placeholder:text-gray-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            className="border-gray-700 data-[state=checked]:bg-[#E13D2D] data-[state=checked]:border-[#E13D2D]"
          />
          <label htmlFor="terms" className="text-sm text-gray-300 leading-tight">
            By ticking this box, I confirm that I have read and accept the{" "}
            <Link href="#" className="text-[#E13D2D] hover:underline">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#E13D2D] hover:underline">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button type="submit" className="w-full bg-[#E13D2D] hover:bg-[#c13525] cursor-pointer text-white py-6 rounded-md mt-4">
          Create your account
        </Button>

        <div className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} className="text-[#E13D2D] cursor-pointer hover:underline">
            Login
          </button>
        </div>
      </form>
    </>
  )
}

