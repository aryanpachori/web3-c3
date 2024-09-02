"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import { useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/qlsrTkNGjnuK46GWAC2AVAaVnVZ2ylVf"
  );
  async function airdrop() {
    if (!publicKey) {
      console.error("Wallet is not connected");
      return;
    }
    const sol = LAMPORTS_PER_SOL * Number(amount);
    await connection.requestAirdrop(new PublicKey(publicKey), sol);
    alert("airdrop successfull");
  }
  const [amount, setAmount] = useState("");
  return (
    <div className="flex flex-col items-center mt-10">
      {publicKey ? <WalletDisconnectButton /> : <WalletMultiButton />}

      <div className="flex flex-col items-center mt-4">
        <input
          className="mb-2 p-2 border border-gray-300 rounded mt-5 text-black"
          placeholder="Request airdrop"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
        <button
          onClick={() => airdrop()}
          className="p-2 bg-blue-500 text-white rounded mt-2"
        >
          Airdrop
        </button>
      </div>
    </div>
  );
}
