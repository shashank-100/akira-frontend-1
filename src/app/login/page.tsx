"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { setCookie } from 'cookies-next';

const space = Space_Grotesk({ subsets: ["latin"] });

type FormFields = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    // Mock login success - in a real app, this would verify credentials first
    // Set a demo cookie for our middleware to check
    setCookie('auth-session', 'demo-user-session', { 
      maxAge: 60 * 60, // 1 hour
      path: '/' 
    });
    router.push('/wallet');
  };

  return (
    <div className="flex flex-col h-screen bg-black text-[#e6e6e6]">
      <header className="flex items-center gap-4 p-4 text-base w-full">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h1 className={space.className}>Login</h1>
      </header>

      <main className="bg-gray-950 flex flex-col rounded-3xl rounded-b-none h-full w-full p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <InputField
            label="Email Address"
            type="text"
            placeholder="Enter email address"
            register={register("email", {
              required: "Enter valid email",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter password"
            register={register("password", {
              required: "Enter valid password",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
            })}
            error={errors.password?.message}
          />

          <Link href="/reset" className="text-[#db5930] self-end">
            Reset password
          </Link>

          <Button type="submit" variant="secondary" className="mt-16 w-full">
            Login
          </Button>
        </form>
      </main>
    </div>
  );
}

function InputField({ label, type, placeholder, register, error }: any) {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        className="h-12 rounded-xl outline-none focus:ring-0 p-2"
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}