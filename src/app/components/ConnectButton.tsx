"use client"

import React, { useState } from "react"
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
                <button
                    onClick={handleConnect}
                    className={
                        walletAddress ? `hidden`
                        : `text-lg font-bold fixed left-0 top-0 flex w-full justify-center border-8 border-red-600 p-4 backdrop-blur-2xl bg-red-300 text-red-900`
                    }
                >
                    <h1
                        className="mx-auto"
                    >
                        {`Connect Wallet`}
                    </h1>
                </button>
                <AccessToken isGranted={accessGranted} />
            </div>
        </div>
    );
}
