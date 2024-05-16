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

    async function handleConnect() {
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

            // @ts-ignore
            const nftBalance = await nftContract.read.balanceOf([address]);
            console.log("nftBalance", nftBalance);

            setBalance(nftBalance.toString() ?? '0');

            // updates: the state variables with the retrieved address and balance.
            setAddress(address);
        } catch (error) {
            // Error handling: Display an alert if the transaction fails
            alert(`Transaction Failed: ${error}`);
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
            alert(`Transaction Failed: ${error}`);
        }
    }

    return (
        <div>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {!address ? (
                    <button
                        className={`px-8 py-2 rounded-md bg-slate-400 flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10`}
                        onClick={handleConnect}
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
                            {`Connect Wallet`}
                        </h1>
                    </button>
                ) : (
                    <div className="flex items-center">

                        <div className="grid gap-4 items-center">
                            <div className="text-xs md:text-xs">
                                {address} <br /> Balance: {balance}
                            </div>
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
                    </div>

                )}
            </p>
        </div>
    );
}
