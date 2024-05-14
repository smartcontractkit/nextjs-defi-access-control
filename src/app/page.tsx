"use client";

import Image from "next/image"
import WalletButton from "./components/WalletButton"
import ViewProtectedContent from "./components/ViewProtectedContent"
// import MintButton from "./components/MintButton"
import { ConnectPublicClient, ConnectWalletClient } from "@/lib/client";
import { useState } from "react";
import { formatEther, getContract } from "viem"
import { sepolia } from "viem/chains"
import { NFT_ADDRESS } from "./constants/addresses";
import { NFT_ABI } from "./constants/abis";
import MintButton from "./components/MintButton";

export default async function Home() {
  const [showMintButton, setShowMintButton] = useState(false);

  const WalletButton = () => {
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')
    const [nftBalance, setNftBalance] = useState('')

    async function handleClick() {
      try {
        // instantiates clients: Wallet and Public.
        const walletClient = await ConnectWalletClient();
        const publicClient = ConnectPublicClient();

        // retrieves: wallet address using the Wallet Client.
        const [address] = await walletClient.requestAddresses();
        await walletClient.switchChain({ id: sepolia.id });

        const nftContract = getContract({
          // The contract address of the NFT contract
          address: NFT_ADDRESS,
          abi: NFT_ABI,
          // @ts-ignore
          client: publicClient,
        });

        // retrieves: balance of the address using the Public Client.
        const balance = formatEther(await publicClient.getBalance({ address }));
        // updates: state variables with the retrieved address and balance.
        setAddress(address)
        setBalance(balance)
        // @ts-ignore
        const nftBalance = await nftContract.read.balanceOf([address]);
        setNftBalance(nftBalance.toString())
      } catch (error) {
        // [if] error: alerts transaction failure message.
        alert(`Transaction failed: ${error}`);
      }
    }

    return (
      <><p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
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
              height={25} />
            <h1
              className="mx-auto"
            >Connect Wallet
            </h1>
          </button>
        ) : (
          <div className="flex items-center">
            <div className="text-xs md:text-xs">
              {address} <br /> Balance: {balance}
              {address} <br /> NFT Balance: {nftBalance}
            </div>
          </div>
        )
        }
      </p>
        <div
          className={"flex w-full mt-4 items-center justify-center font-mono text-sm"}
        >
          {nftBalance != '0' && address ? (
            <Image
              src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDhqN3k5ZmI0dHd4ZGFxNnhlNWkzaHZxOWR5ZmFybTB5bWFkMmhreCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IgpsRT6FdinjrDWzNu/giphy.gif"}
              height={400}
              width={400}
              alt={'VIP token'}
            />
          ) : nftBalance == '0' && address ? (
            <Image
              src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExenA2NTFncXFsdWRxcHdna2RlaWs1dGQ0cW54cm1vZDRuMWx4cTByciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tBb19fgpQDri6EulFvy/giphy.gif"}
              height={400}
              width={400}
              alt={'Basic User'}
            />
          )
            : (
              <Image
                src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWUweDVkMHp1Zno0MXJvdnpmcnNycTd6bjBmdGxvc21qdGEzMDI4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9EdzfOSgfyueLm/giphy.gif"}
                height={400}
                width={400}
                alt={'Basic User'}
              />
            )
          }
        </div>
      </>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <WalletButton />
      </div>
        <MintButton />
    </main>
  )
}
