"use client"

import React, { useState } from "react"
import { getContract } from "viem"
import { sepolia } from "viem/chains"

import { ConnectWalletClient } from "@/lib/WalletClient"
import { ACCESS_TOKEN_ADDRESS } from "../constants/addresses"
import { ACCESS_ABI } from "../constants/abis"

export default function GrantAccessButton() {
    // State variables to store the wallet address and balance
    const [walletAddress, setWalletAddress] = useState('')
    const [accessGranted, setAccessGranted] = useState(false)

    async function handleMint(toAddress: string) {
        try {
            console.log("toAddress", toAddress);
            // instantiates: Wallet Client and a Public Client.
            const walletClient = await ConnectWalletClient();
            const nftContract = getContract({
                address: ACCESS_TOKEN_ADDRESS,
                abi: ACCESS_ABI,
                // @ts-ignore
                client: walletClient,
            });
            console.log("nftContract", nftContract);
            // retrieves: wallet address using the Wallet Client.
            const [address] = await walletClient.requestAddresses();
            await setWalletAddress(address);
            console.log('wally', walletAddress);
            await walletClient.switchChain({ id: sepolia.id });
            // @ts-ignore
            const nftBalance = await nftContract.read.balanceOf([address]);
            // console.log("nftBalance", nftBalance);

            setAccessGranted(
                parseInt(nftBalance)?.toString() !== '0' ? true : false
            );

            // runs: grantAccess(address to)
            const hash = await walletClient.writeContract({
                account: address,
                address: nftContract.address,
                abi: nftContract.abi,
                functionName: "grantAccess",
                args: [toAddress],
                chain: sepolia
            });

            await hash 

    } catch (error) {
            // Error handling: Display an alert if the transaction fails
            setAccessGranted(false)
            alert(`Transaction Failed: ${error}`);
        }
    }

    return (
        <button
            onClick={() => handleMint(walletAddress)}
            className={accessGranted ? 'hidden' : ''}
        >
            <div className="p-4 text-lg w-full text-center justify-center items-center flex bg-blue-700 rounded-xl text-white font-bold">
                <div className="flex items-center">
                    {`Grant Access`}
                </div>
            </div>
        </button>
    );
}
