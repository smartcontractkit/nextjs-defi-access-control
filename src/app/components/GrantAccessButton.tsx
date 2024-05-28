"use client";

import React, {useState} from "react";
import {getContract} from "viem";
import {sepolia} from "viem/chains";

import {ConnectWalletClient} from "@/lib/WalletClient";
import {ACCESS_TOKEN_ADDRESS} from "../constants/addresses";
import {ACCESS_ABI} from "../constants/abis";

export default function GrantAccessButton() {
  const [accessGranted, setAccessGranted] = useState(false);

  async function grantAccess() {
    try {
      // instantiates: Wallet Client.
      const walletClient = await ConnectWalletClient();
      const accessControlContract = getContract({
        address: ACCESS_TOKEN_ADDRESS,
        abi: ACCESS_ABI,
        // @ts-ignore
        client: walletClient,
      });
      console.log("accessControlContract", accessControlContract);
      // retrieves: your wallet address using the Wallet Client.
      //TODO @BunsDev since in line 34 the writeContract API is kinda confusing between "account" and "address" etc, should we disambiguate by calling this address "myAddress" or "myWalletAddress" ?
      // The viem API really should have called it "from" or something!
      const [address] = await walletClient.requestAddresses();

      await walletClient.switchChain({id: sepolia.id});
      // @ts-ignore
      const accessTokens = await accessControlContract.read.balanceOf([address]);

      setAccessGranted(parseInt(accessTokens)?.toString() !== "0" ? true : false);

      // runs: grantAccess(address to)
      const hash = await walletClient.writeContract({
        //TODO @BunsDev: hash has a ton of meanings, and while it's the same principle,should we call it txHash so they connect it to Tx?
        account: address,
        address: accessControlContract.address,
        abi: accessControlContract.abi,
        functionName: "grantAccess",
        chain: sepolia,
      });

      await hash; //TODO @BunsDev this is already a resolved promise so no need for await? maybe console log the hash for edu purposes.
    } catch (error) {
      // error handling: alerts if the transaction fails (with reason).
      setAccessGranted(false);
      alert(`Transaction Failed: ${error}`); // TODO  @BunsDev if error is an object it wont show in Alert box. May need to stringify....
    }
  }

  return (
    // TODO @BunsDev wont we need to await the grantAccess function to complete before we can set the accessGranted state?
    // Also currently its not showing hidden when i fire up the app. And i can click + transact and no UI change.
    // Needs to only show once wallet connected && accessGranted is false.
    <button onClick={() => grantAccess()} className={accessGranted ? "hidden" : ""}>
      <div className="p-4 text-lg w-full text-center justify-center items-center flex bg-blue-700 rounded-xl text-white font-bold border-black border-8">
        <div className="flex items-center">{`Grant Access`}</div>
      </div>
    </button>
  );
}
