import { Buffer } from 'buffer';

// Make Buffer available globally
if (typeof window !== 'undefined') {
    window.Buffer = window.Buffer || Buffer;
}

// This is needed for Solana Web3.js to work properly in the browser 