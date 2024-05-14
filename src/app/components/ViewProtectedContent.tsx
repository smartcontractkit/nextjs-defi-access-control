"use client";

import { useState } from "react";
import { ConnectWalletClient, ConnectPublicClient } from "../../lib/client";
import { getContract } from "viem";
import { sepolia } from "viem/chains";
import Image from "next/image";
import { NFT_ABI } from "../constants/abis"
import React from "react";
import { NFT_ADDRESS } from "../constants/addresses";

export default function WalletButton() {
  // State variables to store the wallet address and balance
  const [address, setAddress] = useState('');
  const [isOwner, setOwner] = useState(false);
  const [contractOwner, setContractOwner] = useState('');
  // Function to handle the button click event
  async function handleClick() {
    try {
      // Instantiate a Wallet Client and a Public Client
      const walletClient = await ConnectWalletClient();
      const publicClient = ConnectPublicClient();

      const nftContract = getContract({
        // The contract address of the NFT contract
        address: NFT_ADDRESS,
        abi: NFT_ABI,
        // @ts-ignore
        client: publicClient,
      });
      // @ts-ignore
      const contractOwner = await nftContract.read.owner();
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
      const valid = await publicClient.verifyMessage({
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
        } else {
          setOwner(false)
        }
      }
      const owner = isOwner;

      // Update the state variables with the retrieved address and balance
      setAddress(address);
      setOwner(owner);
      // @ts-ignore
      setContractOwner(contractOwner);
    } catch (error) {
      // Error handling: Display an alert if the transaction fails
      alert(`Transaction failed: ${error}`);
    }
  }

  return (
    <div>
      {/* Render the Status component with the address and balance */}
      <Content address={address} owner={isOwner} contractOwner={contractOwner} />

      {/* Render the Connect Wallet button */}
      {/* only render if !address */}

      {!address && (
        <button
          className="px-8 py-2 rounded-md bg-slate-400 flex flex-row items-center justify-center border border-[#1e2124] hover:border hover:border-indigo-600 shadow-md shadow-indigo-500/10"
          onClick={handleClick}
        >
          {/* Display the MetaMask Fox image */}
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            alt="MetaMask Fox"
            width={25}
            height={25}
          />
          <h1 className="mx-auto">Connect Wallet (Owner Verification)</h1>
        </button>
      )}
    </div>
  );
}

// Component to display the wallet status (connected or disconnected)
function Content({ address, owner, contractOwner }) {
  let mintButton = null;
  async function handleMint(toAddress) {
    try {
      console.log("toAddress", toAddress);
      // Instantiate a Wallet Client and a Public Client
      const walletClient = await ConnectWalletClient();
      const publicClient = ConnectPublicClient();
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
      // run safeMint
      const { request } = await publicClient.simulateContract({
        address: nftContract.address,
        abi: nftContract.abi,
        functionName: "safeMint",
        args: [toAddress],
        account: address,
      });
      await walletClient.writeContract(request);
    } catch (error) {
      // Error handling: Display an alert if the transaction fails
      alert(`Transaction failed: ${error}`);
    }
  }
  if (!address) {
    // If no address is provided, display "Disconnected" status
    return (
      <div className="flex items-center">
        <div className="border bg-red-600 border-red-600 rounded-full w-1.5 h-1.5 mr-2"></div>
        <div>Disconnected</div>
      </div>
    );
  }
  // If the address is the owner of the contract, display a mint button
  if (address && contractOwner === address) {
    // @ts-ignore
    mintButton = (
      <div className="flex items-center">
        <input
          type="text"
          id="mintInput"
          className="mx-2 border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        // @ts-ignore
          onClick={() => handleMint(document.getElementById("mintInput").value)}
          className="px-4 py-2 rounded bg-blue-500 text-white"
        >
          Mint
        </button>
      </div>
    );
  }
  // If an address is provided, but the owner is false, display a sad face
  if (address && !owner) {
    return (
      <>
        {mintButton}
        <div className="flex items-center">
          <div className="border bg-yellow-500 border-yellow-500 rounded-full w-1.5 h-1.5 mr-2"></div>
          <div>Sad Face {owner} owner</div>
        </div>
      </>
    );
  }
  // If an address is provided, display the address and a secret message
  return (
    <>
      {mintButton}
      <div className="flex items-center w-full">
        <div className="border bg-green-500 border-green-500 rounded-full w-1.5 h-1.5 mr-2"></div>
        <div className="text-xs md:text-xs">
          {address}
          <br /> Something Secret
        </div>
      </div>
    </>
  );
}
