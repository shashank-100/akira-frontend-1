'use client';

import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';
import { Space_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

// Dynamically import wallet components
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

const space = Space_Grotesk({ subsets: ["latin"] });

export default function WalletPage() {
    const router = useRouter();
    
    const handleLogout = () => {
        // Remove the auth cookie
        deleteCookie('auth-session');
        // Redirect to homepage
        router.push('/');
    }
    
    return (
        <div className={`${space.className} flex flex-col bg-[#0e1b29] min-h-screen px-3 text-[#e6e6e6]`}>
            <header className="py-6 flex justify-between items-center">
                <Link href="/" className="text-[#db5930] text-xl font-bold">Akira</Link>
                <Button variant="outline" onClick={handleLogout} size="sm">
                    Logout
                </Button>
            </header>
            
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-8">Solana Wallet</h1>
                <div className="mb-8">
                    <WalletMultiButton />
                </div>
                <div className="w-full max-w-md">
                    <DynamicWalletContent />
                </div>
            </div>
        </div>
    );
}

// Dynamically import WalletContent to avoid SSR issues
const DynamicWalletContent = dynamic(
  () => import('./wallet-content').then(mod => mod.WalletContent),
  { ssr: false }
); 