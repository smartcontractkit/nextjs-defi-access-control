"use client";

import { useState } from "react"
import { ConnectBlockchain } from "@/lib/BlockchainClient"
import { ConnectWalletClient } from "@/lib/WalletClient"
import { formatEther, getContract } from "viem"
import { sepolia } from "viem/chains"
import Image from "next/image"
import React from "react";
import { NFT_ADDRESS } from "../constants/addresses"
import { NFT_ABI } from "../constants/abis"

export default function MintButton() {
    // State variables to store the wallet address and balance
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')
    const [nftOwner, setOwner] = useState(false)

    async function handleClick() {
        try {
            // Instantiate a Wallet Client and a Public Client
            const walletClient = await ConnectWalletClient();
            const blockchainClient = ConnectBlockchain();

            const nftContract = getContract({
                // The contract address of the NFT contract
                address: NFT_ADDRESS,
                abi: NFT_ABI,
                // @ts-ignore
                client: blockchainClient,
            });
            // @ts-ignore
            //   const nftOwner = await nftContract.read.owner();
            // Retrieve the wallet address using the Wallet Client
            const [address] = await walletClient.requestAddresses();
            await walletClient.switchChain({ id: sepolia.id });

            // Generate a salt
            const salt = Math.floor(Math.random() * 1000000);

            // Concatenate the salt to the original message
            const message = "Hello, World!\nsalt: " + salt;

            const signature = await walletClient.signMessage({
                account: address,
                message,
            });
            const valid = await blockchainClient.verifyMessage({
                address,
                message,
                signature: signature,
            });
            if (valid) {
                // @ts-ignore
                const nft_owned = await nftContract.read.balanceOf([address]);
                // @ts-ignore
                if (parseInt(nft_owned) > 0) {
                    setOwner(true);
                    setBalance(nft_owned.toString())
                } else {
                    setOwner(false)
                    setBalance('0')
                }
            }
            // Update the state variables with the retrieved address and balance
            setAddress(address);
        } catch (error) {
            // Error handling: Display an alert if the transaction fails
            alert(`Transaction failed: ${error}`);
        }
    }

    async function handleMint(toAddress) {
        try {
            console.log("toAddress", toAddress);
            // Instantiate a Wallet Client and a Public Client
            const walletClient = await ConnectWalletClient();
            const blockchainClient = ConnectBlockchain();
            const nftContract = getContract({
                // The contract address of the NFT contract
                address: NFT_ADDRESS,
                abi: NFT_ABI,
                // @ts-ignore
                client: walletClient,
            });
            console.log("nftContract", nftContract);
            // Retrieve the wallet address using the Wallet Client
            const [address] = await walletClient.requestAddresses();
            await walletClient.switchChain({ id: sepolia.id });
            // run grantAccess
            const { request } = await blockchainClient.simulateContract({
                address: nftContract.address,
                abi: nftContract.abi,
                functionName: "grantAccess",
                args: [toAddress],
                account: address,
            });
            await walletClient.writeContract(request);
        } catch (error) {
            // Error handling: Display an alert if the transaction fails
            alert(`Transaction failed: ${error}`);
        }
    }

    return (
        <div>
            {!address ? (
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
                    >
                        {/* Connect Wallet */}
                        {`Connect Minter`}
                    </h1>
                </button>
            ) : (
                <div className="flex items-center">
                    {/* <input
                        type="text"
                        id="mintInput"
                        className="mx-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    /> */}
                    <button
                        onClick={() => handleMint(address)}
                        className="px-8 py-2 rounded bg-blue-500 text-white"
                    >
                        Mint NFT
                    </button>
                </div>
            )}
        </div>
    );
}
