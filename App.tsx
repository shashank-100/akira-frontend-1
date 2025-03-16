import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo, useState, useEffect } from 'react';
import idl from './idl.json';
import * as anchor from '@coral-xyz/anchor';

// Add Buffer polyfill
import { Buffer } from 'buffer';
window.Buffer = Buffer;

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
            /**
             * Wallets that implement either of these standards will be available automatically.
             *
             *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
             *     (https://github.com/solana-mobile/mobile-wallet-adapter)
             *   - Solana Wallet Standard
             *     (https://github.com/solana-labs/wallet-standard)
             *
             * If you wish to support a wallet that supports neither of those standards,
             * instantiate its legacy wallet adapter here. Common legacy adapters can be found
             * in the npm package `@solana/wallet-adapter-wallets`.
             */
            new UnsafeBurnerWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [transferAmount, setTransferAmount] = useState<string>('0.001');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [txSignature, setTxSignature] = useState<string | null>(null);
    
    // Hardcoded recipient address
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

    return (
        <div className="App">
            <h1>Send SOL</h1>
            <div style={{ margin: '20px 0' }}>
                <WalletMultiButton />
            </div>
            
            {wallet ? (
                <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <p><strong>Your wallet:</strong> {walletAddress}</p>
                        <p><strong>Recipient:</strong> 2p9SEZ3sw9uWvPfXj3gwyStVLQyzPJh5yYETWAqcdCss</p>
                        {txSignature && <p><strong>Last Transaction:</strong> {txSignature}</p>}
                    </div>
                    
                    <h3>Send SOL</h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="amount" style={{ display: 'block', marginBottom: '5px' }}>
                            Amount (SOL):
                        </label>
                        <input
                            id="amount"
                            type="number"
                            step="0.000000001"
                            min="0.000000001"
                            value={transferAmount}
                            onChange={(e) => setTransferAmount(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        />
                    </div>
                    
                    <button
                        onClick={sendSol}
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: isLoading ? '#ccc' : '#512da8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Processing...' : 'Send SOL'}
                    </button>
                </div>
            ) : (
                <p>Please connect your wallet to send SOL.</p>
            )}
        </div>
    );
};
