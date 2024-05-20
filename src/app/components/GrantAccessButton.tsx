"use client"

import React, { useState } from "react"
import { getContract } from "viem"
import { sepolia } from "viem/chains"

import { ConnectWalletClient } from "@/lib/WalletClient"
import { ACCESS_TOKEN_ADDRESS } from "../constants/addresses"
import { ACCESS_ABI } from "../constants/abis"

export default function GrantAccessButton() {
    const [accessGranted, setAccessGranted] = useState(false)

    async function grantAccess() {
        try {
            // instantiates: Wallet Client and a Public Client.
            const walletClient = await ConnectWalletClient();
            const accessContract = getContract({
                address: ACCESS_TOKEN_ADDRESS,
                abi: ACCESS_ABI,
                // @ts-ignore
                client: walletClient,
            });
            console.log("accessContract", accessContract);
            // retrieves: wallet address using the Wallet Client.
            const [address] = await walletClient.requestAddresses();
            await walletClient.switchChain({ id: sepolia.id });
            // @ts-ignore
            const accessTokens = await accessContract.read.balanceOf([address]);

            setAccessGranted(
                parseInt(accessTokens)?.toString() !== '0' ? true : false
            );

            // runs: grantAccess(address to)
            const hash = await walletClient.writeContract({
                account: address,
                address: accessContract.address,
                abi: accessContract.abi,
                functionName: "grantAccess",
                chain: sepolia
            });

            await hash 

    } catch (error) {
            // error handling: alerts if the transaction fails (with reason).
            setAccessGranted(false)
            alert(`Transaction Failed: ${error}`);
        }
    }

    return (
        <button
            onClick={() => grantAccess()}
            className={accessGranted ? 'hidden' : ''}
        >
            <div className="p-4 text-lg w-full text-center justify-center items-center flex bg-blue-700 rounded-xl text-white font-bold border-black border-8">
                <div className="flex items-center">
                    {`Grant Access`}
                </div>
            </div>
        </button>
    );
}
