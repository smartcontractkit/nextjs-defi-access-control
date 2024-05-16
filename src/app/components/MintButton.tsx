"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getContract } from "viem"
import { sepolia } from "viem/chains"

import { ConnectBlockchain } from "@/lib/BlockchainClient"
import { ConnectWalletClient } from "@/lib/WalletClient"
import { NFT_ADDRESS } from "../constants/addresses"
import { NFT_ABI } from "../constants/abis"

export default function MintButton() {
    // State variables to store the wallet address and balance
    const [walletAddress, setWalletAddress] = useState('')
    const [balance, setBalance] = useState('0')

    async function handleConnect() {
        try {
            // instantiates: a Wallet Client and a Public Client
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
            // updates: the state variables with the retrieved address and balance.
            setWalletAddress(address);

            await walletClient.switchChain({ id: sepolia.id });
            // @ts-ignore
            const nftBalance = await nftContract.read.balanceOf([address]);
            console.log("nftBalance", nftBalance);

            setBalance(parseInt(nftBalance)?.toString() ?? '0');

        } catch (error) {
            // Error handling: Display an alert if the transaction fails
            alert(`Transaction Failed: ${error}`);
        }
    }

    async function handleMint(toAddress: string) {
        try {
            console.log("toAddress", toAddress);
            // Instantiate a Wallet Client and a Public Client
            const walletClient = await ConnectWalletClient();
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
            alert(`Transaction Failed: ${error}`);
        }
    }

    return (
        <div>
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                {!walletAddress ? (
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
                ) : (
                    <div className="flex items-center">

                        <div className="grid gap-4 items-center">
                            <div className="text-xs md:text-xs">
                                {walletAddress} <br /> Balance: {balance}
                            </div>
                            <button
                                onClick={() => handleMint(walletAddress)}
                                className="px-8 py-2 rounded bg-purple-500 text-white"
                            >
                                Grant Access
                            </button>
                            <Link
                                href={"https://remix.ethereum.org/#url=https://github.com/BunsDev/nextjs-defi-access-control/blob/develop/src/lib/OpenAccess.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js"}
                                target="_blank"
                                className="px-8 py-1 rounded bg-blue-500 text-white"
                            >
                                <button>
                                    Open Code in Remix (Ethereum IDE)
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </p>
        </div>
    );
}
