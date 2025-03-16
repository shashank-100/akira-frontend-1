"use client"

import { useState } from "react"
import { Space_Grotesk, Manrope } from "next/font/google"
import Image from "next/image"
import { AkiraLogo } from "@/assets"
import SignupForm from "./signup-form"
import LoginForm from "./login-form"
import ResetPasswordForm from "./reset-password"

const space = Space_Grotesk({ subsets: ["latin"] })
const manrope = Manrope({ subsets: ["latin"] })

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"signup" | "login" | "reset">("signup")

  return (
    <div className={`${space.className} flex min-h-screen bg-black`}>
      {/* Left side - Red background with branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#E13D2D] text-white p-12 flex-col relative rounded-3xl">
        <div className="mb-16">
          <div className="flex items-center gap-1">
            <Image src={AkiraLogo} alt="logo"/>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-[20px] tracking-[2px] font-[400] leading-[100%] mb-4">WELCOME TO AKIRA</h2>
          <h1 className="text-[48px] font-bold mb-4 leading-[100%] font-[700]">
            Decentralized Ads for
            <br />
            Web3 Growth!
          </h1>
          <p className={`${manrope.className} text-[16px] font-[400] leading-[150%]`}>
            Reach audiences, drive engagement, and grow with transparent, blockchain-powered ads.
          </p>
        </div>

        {/* Background texture/pattern effect */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay rounded-3xl"></div>
      </div>

      {/* Right side - Dark background with form */}
      <div className="w-full md:w-1/2 bg-black text-white p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {authMode === "signup" ? (
            <SignupForm onSwitchToLogin={() => setAuthMode("login")} />
          ) : authMode === "login" ? (
            <LoginForm 
              onSwitchToSignup={() => setAuthMode("signup")} 
              onResetPassword={() => setAuthMode("reset")}
            />
          ) : (
            <ResetPasswordForm onSwitchToLogin={() => setAuthMode("login")} />
          )}
        </div>
      </div>

      {/* Mobile view - Red background section */}
      <div className="md:hidden fixed inset-0 bg-[#E13D2D] -z-10"></div>
    </div>
  )
}