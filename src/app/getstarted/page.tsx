"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/button";

const space = Space_Grotesk({ subsets: ["latin"] });

type FormFields = {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
  terms: boolean;
};

export default function GetStarted() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <div className="flex flex-col items-start h-screen bg-black text-[#e6e6e6]">
      <div className="flex items-start gap-4 h-auto text-base p-4 w-full">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h1 className={`${space.className}`}>Create your account</h1>
      </div>
      <div className="bg-gray-950 flex flex-col rounded-3xl rounded-b-none h-screen w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-4 gap-6"
        >
          {/* Input Fields */}
          {[
            { name: "fullname", label: "Full Name", type: "text", placeholder: "Enter your full name" },
            { name: "email", label: "Email Address", type: "email", placeholder: "Enter email address" },
            { name: "password", label: "Password", type: "password", placeholder: "Enter password" },
            { name: "confirmpassword", label: "Confirm Password", type: "password", placeholder: "Confirm password" },
          ].map(({ name, label, type, placeholder }) => (
            <div key={name} className="flex flex-col gap-2">
              <label>{label}</label>
              <input
                className="h-12 px-4 w-full rounded-xl border-2 border-gray-600 bg-gray-950 text-white outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-transparent"
                {...register(name as keyof FormFields, {
                  required: `${label} is required`,
                  ...(name === "password" && { minLength: { value: 8, message: "Password must be at least 8 characters" } }),
                  ...(name === "confirmpassword" && { validate: (value) => value === password || "Passwords must match" }),
                })}
                type={type}
                placeholder={placeholder}
              />
              {errors[name as keyof FormFields] && <div>{errors[name as keyof FormFields]?.message}</div>}
            </div>
          ))}   
          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" {...register("terms", { required: "You must accept the Terms & Conditions" })} />
            <label className="text-sm">
              By ticking this box, I confirm that I have read and accept the <span className="text-[#db5930]">Terms & Conditions</span> and <span className="text-[#db5930]">Privacy Policy</span>.
            </label>
          </div>
          {errors.terms && <div className="text-[#db5930] text-sm">{errors.terms.message}</div>}
          <div className="flex flex-col pb-10 w-full">
            <Button type="submit" variant="secondary">
              Create your account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
