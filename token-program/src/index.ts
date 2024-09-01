import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    TransactionSignature,
  } from "@solana/web3.js";
  
  
  const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/qlsrTkNGjnuK46GWAC2AVAaVnVZ2ylVf");
  
  async function airdrop(to: string, amount: number) {
    try {
      const lamports = amount * LAMPORTS_PER_SOL;
      const publicKey = new PublicKey(to);
  
      
      const airdropSignature: TransactionSignature = await connection.requestAirdrop(publicKey, lamports);
  
      console.log("Airdrop signature:", airdropSignature);

      const confirmation = await connection.confirmTransaction(
         airdropSignature,
      );
  
      console.log("Airdrop confirmation:", confirmation);
    } catch (error) {
      console.error("Error during airdrop:", error);
    }
  }
  
 
  airdrop("4PBUECPpQMetbP7eFGQ9udguzVAovjEJjnVyEv13LMxe", 5);
  
