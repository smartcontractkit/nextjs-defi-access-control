"use client"

import React, { useState } from "react"
import Link from "next/link"
import { getContract } from "viem"
import { sepolia } from "viem/chains"

import { ConnectBlockchain } from "@/lib/BlockchainClient"
import { ConnectWalletClient } from "@/lib/WalletClient"
import { ACCESS_TOKEN_ADDRESS } from "../constants/addresses"
import { ACCESS_ABI } from "../constants/abis"
import AccessToken from "./AccessToken"

export default function ConnectButton() {
    // State variables to store the wallet address and balance
    const [walletAddress, setWalletAddress] = useState('')
    const [accessGranted, setAccessGranted] = useState(false)

    async function handleConnect() {
        try {
            // instantiates: a Wallet Client and a Public Client
            const walletClient = await ConnectWalletClient();
            const blockchainClient = ConnectBlockchain();

            const accessContract = getContract({
                address: ACCESS_TOKEN_ADDRESS,
                abi: ACCESS_ABI,
                // @ts-ignore
                client: blockchainClient,
            });
            // retrieves: wallet address using the Wallet Client.
            const [address] = await walletClient.requestAddresses();
            // updates: the state variables with the retrieved address and balance.
            setWalletAddress(address);

            await walletClient.switchChain({ id: sepolia.id });
            // @ts-ignore
            const accessTokens = await accessContract.read.balanceOf([address]);
            console.log("accessTokens", accessTokens);

            setAccessGranted(
                parseInt(accessTokens)?.toString() !== '0' ? true : false
            );

        } catch (error) {
            // error handling: Display an alert if the transaction fails.
            alert(`Transaction Failed: ${error}`);
        }
    }

    return (
        <div>
            <div>
                <p
                    className={
                        walletAddress ? `hidden`
                            : "fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit"}>
                    <button
                        className={`px-8 py-2 rounded-md bg-slate-400 flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10`}
                        onClick={handleConnect}
                    >
                        <h1
                            className="mx-auto"
                        >
                            {`Connect Wallet`}
                        </h1>
                    </button>
                </p>
            </div>
            <AccessToken isGranted={accessGranted} />
        </div>
    );
}
