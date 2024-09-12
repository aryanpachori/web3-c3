import { Input } from "@/components/ui/input";
import {
  createAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
export default function Launchpad() {
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/qlsrTkNGjnuK46GWAC2AVAaVnVZ2ylVf"
  );
  const wallet = useWallet();

  async function createMint() {
    if (wallet.publicKey) {
      try {
        const keyPair = Keypair.generate();
        const lamport = await getMinimumBalanceForRentExemptMint(connection);

        const transaction = new Transaction().add(
          SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: keyPair.publicKey,
            lamports: lamport,
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
          }),
          createInitializeMint2Instruction(
            keyPair.publicKey,
            9,
            wallet.publicKey,
            wallet.publicKey,
            TOKEN_PROGRAM_ID
          )
        );

        transaction.feePayer = wallet.publicKey;
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.partialSign(keyPair);
        await wallet.sendTransaction(transaction, connection);
        console.log(`Token mint created at ${keyPair.publicKey.toBase58()}`);

        const ata = getAssociatedTokenAddressSync(
          keyPair.publicKey,
          wallet.publicKey,
          false,
          TOKEN_PROGRAM_ID
        );
        console.log(ata.toBase58());

        const transaction2 = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            wallet.publicKey,
            ata,
            wallet.publicKey,
            keyPair.publicKey,
            TOKEN_PROGRAM_ID
          )
        );
        await wallet.sendTransaction(transaction2, connection);

        const transaction3 = new Transaction().add(
          createMintToInstruction(
            keyPair.publicKey,
            ata,
            wallet.publicKey,
            1000000000,
            [],
            TOKEN_PROGRAM_ID
          )
        );
        await wallet.sendTransaction(transaction3, connection);
        console.log("Minted!")
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center  ">
      <h1 className="text-6xl font-bold font-mono ">Solana token launchpad</h1>
      <div className="mt-5 space-y-4  w-64">
        <Input placeholder="John Doe" />
        <Input placeholder="Symbol" />
        <Input placeholder="Image URL" />
        <Input placeholder="Inital supply" />
        <button
          onClick={createMint}
          className="border border-gray-800 rounded p-2 bg-gray-900"
        >
          Create Token
        </button>
      </div>
    </div>
  );
}
