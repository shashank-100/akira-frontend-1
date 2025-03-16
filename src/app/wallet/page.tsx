'use client';

import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { FC, useEffect, useState } from 'react';
import { Space_Grotesk } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Add Buffer polyfill for browser
import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

const space = Space_Grotesk({ subsets: ["latin"] });

export default function WalletPage() {
    return (
        <div className={`${space.className} flex flex-col bg-[#0e1b29] min-h-screen px-3 text-[#e6e6e6]`}>
            <header className="py-6">
                <Link href="/" className="text-[#db5930] text-xl font-bold">Akira</Link>
            </header>
            
            <div className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-8">Solana Wallet</h1>
                <div className="mb-8">
                    <WalletMultiButton />
                </div>
                <div className="w-full max-w-md">
                    <WalletContent />
                </div>
            </div>
        </div>
    );
}

const WalletContent: FC = () => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [transferAmount, setTransferAmount] = useState<string>('0.001');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [txSignature, setTxSignature] = useState<string | null>(null);
    
    // Hardcoded recipient address - replace with your actual recipient
    const recipientAddress = new PublicKey("2p9SEZ3sw9uWvPfXj3gwyStVLQyzPJh5yYETWAqcdCss");

    useEffect(() => {
        if (wallet) {
            setWalletAddress(wallet.publicKey.toString());
        } else {
            setWalletAddress(null);
        }
    }, [wallet]);

    // Direct function to send SOL to hardcoded address
    const sendSol = async () => {
        if (!wallet) {
            alert('Please connect your wallet first!');
            return;
        }
        
        // Validate amount
        const amount = parseFloat(transferAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount greater than 0');
            return;
        }
        
        setIsLoading(true);
        
        try {
            // Create a transaction to send SOL to the hardcoded address
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: recipientAddress,  // Send to specified address
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );
            
            // Get the latest blockhash
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = wallet.publicKey;
            
            // Sign and send the transaction
            const signature = await wallet.signTransaction(transaction);
            const txid = await connection.sendRawTransaction(signature.serialize());
            
            // Wait for confirmation
            await connection.confirmTransaction(txid);
            
            setTxSignature(txid);
            alert(`Success! ${amount} SOL sent to ${recipientAddress.toString()}`);
            console.log('Transaction signature:', txid);
            
        } catch (error: any) {
            console.error('Error:', error);
            alert(`Transaction failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return wallet ? (
        <div className="p-4 border border-[#db5930] rounded-lg">
            <div className="mb-4">
                <p className="mb-2"><strong>Your wallet:</strong> {walletAddress}</p>
                <p className="mb-2"><strong>Recipient:</strong> {recipientAddress.toString().slice(0, 15)}...</p>
                {txSignature && (
                    <p className="mb-2 break-all">
                        <strong>Last Transaction:</strong> 
                        <a 
                            href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#db5930] underline ml-2"
                        >
                            {txSignature.slice(0, 15)}...
                        </a>
                    </p>
                )}
            </div>
            
            <div className="mb-4">
                <label htmlFor="amount" className="block mb-2">
                    Amount (SOL):
                </label>
                <input
                    id="amount"
                    type="number"
                    step="0.000000001"
                    min="0.000000001"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full p-2 bg-[#1a2a3a] border border-[#3a4a5a] rounded text-white"
                />
            </div>
            
            <Button
                onClick={sendSol}
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Processing...' : 'Send SOL'}
            </Button>
        </div>
    ) : (
        <div className="text-center">
            <p className="mb-4">Please connect your wallet to send SOL.</p>
        </div>
    );
}; 