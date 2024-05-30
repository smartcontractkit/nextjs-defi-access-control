"use client";

import React, { useState } from "react";
import { getContract } from "viem";
import { sepolia } from "viem/chains";

import { ConnectWalletClient } from "@/lib/WalletClient";
import { ACCESS_ABI } from "../constants/abis";
import AccessControlledView from "./AccessControlledView";

export default function GrantAccessView() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const ACCESS_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ACCESS_TOKEN_ADDRESS ?? '0xa8d3d48C41C2f0Cd37B3eb303a90A7841E15E6f4'

  async function handleConnect() {
    try {
      // instantiates: Wallet Client and Public Client
      const walletClient = await ConnectWalletClient();

      const accessControlContract = getContract({
        address: ACCESS_TOKEN_ADDRESS as `0x${string}`,
        abi: ACCESS_ABI,
        // @ts-ignore
        client: walletClient,
      });
      // retrieves: your wallet address using the Wallet Client.
      const [myAddress] = await walletClient.requestAddresses();
      // updates: the state variables with the retrieved address.
      setWalletAddress(myAddress);

      await walletClient.switchChain({ id: sepolia.id });

      // @ts-ignore
      const accessTokens = await accessControlContract.read.balanceOf([myAddress]);

      setAccessGranted(parseInt(accessTokens)?.toString() !== "0" ? true : false);

    } catch (error) {
      // error displays: alert if the transaction fails.
      alert(`Transaction Failed: ${error}`);
    }
  }

  async function grantAccess() {
    try {
      // instantiates: Wallet Client.
      const walletClient = await ConnectWalletClient();
      const accessControlContract = getContract({
        address: ACCESS_TOKEN_ADDRESS as `0x${string}`,
        abi: ACCESS_ABI,
        // @ts-ignore
        client: walletClient,
      });
      console.log("accessControlContract", accessControlContract);
      // retrieves: your wallet address using the Wallet Client.
      const [myAddress] = await walletClient.requestAddresses();

      await walletClient.switchChain({ id: sepolia.id });

      // @ts-ignore
      const accessTokens = await accessControlContract.read.balanceOf([myAddress]);

      setAccessGranted(parseInt(accessTokens)?.toString() !== "0" ? true : false);

      // runs: grantAccess()
      const txHash = await walletClient.writeContract({
        account: myAddress,
        address: accessControlContract.address,
        abi: accessControlContract.abi,
        functionName: "grantAccess",
        chain: sepolia,
      });
      console.log('txHash: %s', txHash);
    } catch (error) {
      // error handling: alerts if the transaction fails (with reason).
      setAccessGranted(false);
      // returns: alert containing the error message (already formatted for debugging purposes).
      alert(`Transaction Failed: ${error}`);
    }
  }

  return (
    <div
      className="p-6 text-lg w-full text-center justify-center items-center grid bg-black rounded-xl text-white font-bold">
      {!walletConnected &&
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm"
          onClick={() => setWalletConnected(true)}
        >
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
            </div>
          </div>
        </div>
      }
      <div
        className={"z-10 -mt-12 w-full max-w-5xl items-center justify-between"}
      >
        <AccessControlledView isGranted={accessGranted} />
      </div>

      {/* GrantAccessButton */}
      <button onClick={async () => await grantAccess()} className={!accessGranted && walletConnected ? "" : "hidden"}>
        <div className="p-4 mt-4 text-lg w-full text-center justify-center items-center flex bg-blue-700 rounded-xl text-white font-bold border-black border-8">
          <div className=" flex items-center">
            {`Grant Access`}
          </div>
        </div>
      </button>
    </div>
  )

};
