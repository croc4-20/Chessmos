// utility.js
// Dynamically import 'crypto'
let crypto;
import('crypto').then((mod) => {
  crypto = mod.default;
}).catch(err => console.error('Failed to load crypto module:', err));



export function generateSeed(addresses) {
    const hash = crypto.createHash('sha256');
    addresses.forEach(addr => {
        if (addr && addr.walletAddress) {  // Ensure the object and property exist
            hash.update(addr.walletAddress);  // Use the walletAddress string for hashing
        } else {
            console.warn("Invalid address object received:", addr);
        }
    });
    return hash.digest('hex');  // Returns a hexadecimal string as the seed
}
