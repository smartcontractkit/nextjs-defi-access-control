"use client"

import Image from "next/image"
import { ConnectBlockchain } from "@/lib/BlockchainClient"
import { ConnectWalletClient } from "@/lib/WalletClient"
import { useState } from "react"
import { formatEther, getContract } from "viem"
import { sepolia } from "viem/chains"
import { NFT_ADDRESS } from "./constants/addresses"
import { NFT_ABI } from "./constants/abis"
import MintButton from "./components/MintButton"

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <MintButton />
      </div>
    </main>
  )
}
