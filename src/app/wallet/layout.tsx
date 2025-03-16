'use client';

import { SolanaProvider } from '@/lib/solana/provider';

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SolanaProvider>
      {children}
    </SolanaProvider>
  );
} 