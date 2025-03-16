'use client';

import dynamic from 'next/dynamic';
import { FC, ReactNode } from 'react';

// Dynamically import wallet components to avoid SSR issues
const WalletProvider = dynamic(
    () => import('@solana/wallet-adapter-react').then(mod => mod.WalletProvider),
    { ssr: false }
);

const ConnectionProvider = dynamic(
    () => import('@solana/wallet-adapter-react').then(mod => mod.ConnectionProvider),
    { ssr: false }
);

const WalletModalProvider = dynamic(
    () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletModalProvider),
    { ssr: false }
);

// Required for wallet adapter UI
import '@solana/wallet-adapter-react-ui/styles.css';

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
    if (typeof window === 'undefined') {
        return <>{children}</>;
    }

    // Import these only on client side
    const { WalletAdapterNetwork } = require('@solana/wallet-adapter-base');
    const { UnsafeBurnerWalletAdapter } = require('@solana/wallet-adapter-wallets');
    const { clusterApiUrl } = require('@solana/web3.js');

    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = clusterApiUrl(network);

    const wallets = [new UnsafeBurnerWalletAdapter()];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}; 