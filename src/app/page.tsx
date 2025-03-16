import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";

const space = Space_Grotesk({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${space.className} flex flex-col justify-end bg-[#0e1b29] h-screen px-3 text-[#e6e6e6]`}>
      <div className="pb-10 text-left">
        <h1 className="text-[#db5930] text-base">Welcome to Akira</h1>
        <h2 className="text-2xl">Decentralized Ads for Web3 Growth!</h2>
        <p className="text-sm leading-normal">
          Reach audiences, drive engagement, and grow with transparent, blockchain-powered ads.
        </p>
      </div>
      <div className="flex flex-col gap-6 pb-10">
        <Button variant="secondary" asChild>
          <Link href="/wallet">Connect Wallet</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
