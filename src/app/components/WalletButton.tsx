"use client";

import { useState } from "react"
import { ConnectWalletClient, ConnectPublicClient } from "../../lib/client"
import { formatEther } from "viem"
import { sepolia } from "viem/chains"
import Image from "next/image"
import React from "react";

export default function WalletButton() {
  // State variables to store the wallet address and balance
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')

  async function handleClick() {
      try {
        // instantiates clients: Wallet and Public.
        const walletClient = await ConnectWalletClient();
        const publicClient = ConnectPublicClient();

        // retrieves: wallet address using the Wallet Client.
        const [address] = await walletClient.requestAddresses();
        await walletClient.switchChain({ id: sepolia.id });

        // retrieves: balance of the address using the Public Client.
        const balance = formatEther(await publicClient.getBalance({ address }));

        // updates: state variables with the retrieved address and balance.
        setAddress(address)
        setBalance(balance)
      } catch (error) {
        // [if] error: alerts transaction failure message.
        alert(`Transaction failed: ${error}`);
      }
  }

  return (
    <div>
    { !address ? (
      <button
      className={`px-8 py-2 rounded-md bg-slate-400 flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10`}
      onClick={handleClick}
      >
        {/* Display the MetaMask Fox image */}
          <Image
          src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
          alt="MetaMask Fox"
          width={25}
          height={25}
        />
        <h1 
          className="mx-auto"
        >Connect Wallet</h1>
      </button>
    ) : (
      <div className="flex items-center">
        <div className="text-xs md:text-xs">
          {address} <br /> Balance: {balance}
        </div>
      </div>
    )
  }
    </div>
  );
}
