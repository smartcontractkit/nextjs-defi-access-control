"use client"

import React, { useState } from "react"
import { getContract } from "viem"
import { sepolia } from "viem/chains"

import { ConnectBlockchain } from "@/lib/BlockchainClient"
import { ConnectWalletClient } from "@/lib/WalletClient"
import { ACCESS_TOKEN_ADDRESS } from "../constants/addresses"
import { ACCESS_ABI } from "../constants/abis"
import AccessToken from "./AccessControlledView"

export default function ConnectButton() {
    // stores: the wallet address and balance
    const [walletAddress, setWalletAddress] = useState('')
    const [accessGranted, setAccessGranted] = useState(false)

    async function handleConnect() {
        try {
            // instantiates: Wallet Client and Public Client
            const walletClient = await ConnectWalletClient();
            const blockchainClient = ConnectBlockchain();

            const accessControlContract = getContract({
                address: ACCESS_TOKEN_ADDRESS,
                abi: ACCESS_ABI,
                // @ts-ignore
                client: blockchainClient,
            });
            // retrieves: your wallet address using the Wallet Client.
            const [address] = await walletClient.requestAddresses();
            // updates: the state variables with the retrieved address.
            setWalletAddress(address);

            await walletClient.switchChain({ id: sepolia.id });
            // @ts-ignore
            const accessTokens = await accessControlContract.read.balanceOf([address]);
            console.log("accessTokens", accessTokens);

            setAccessGranted(
                parseInt(accessTokens)?.toString() !== '0' ? true : false
            );

        } catch (error) {
            // error displays: alert if the transaction fails.
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
