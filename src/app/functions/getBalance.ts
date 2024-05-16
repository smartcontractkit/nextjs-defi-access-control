import { ConnectBlockchain } from "@/lib/BlockchainClient";
import { ConnectWalletClient } from "@/lib/WalletClient";
import { useState } from "react";
import { getContract } from "viem";
import { sepolia } from "viem/chains";
import { NFT_ABI } from "../constants/abis";
import { NFT_ADDRESS } from "../constants/addresses";

export function getBalance() {
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

        console.log("balance", balance);
    }
    return balance;
}