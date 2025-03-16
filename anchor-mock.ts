import { Connection, PublicKey } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';

// Mock AnchorProvider class
export class AnchorProvider {
  constructor(
    public connection: Connection,
    public wallet: AnchorWallet,
    public opts: { preflightCommitment: string }
  ) {}
}

// Mock Program class
export class Program {
  constructor(
    public idl: any,
    public programId: PublicKey,
    public provider: AnchorProvider
  ) {}
} 