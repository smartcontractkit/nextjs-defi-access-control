import { createWalletClient, createPublicClient, custom, http } from "viem"
import { sepolia } from "viem/chains"
import "viem/window"

export async function ConnectWalletClient() {
  // window.ethereum //
  // window.ethereum is an object provided by MetaMask or other web3 wallets.
  let transport;
  if (window.ethereum) {
    // [if] window.ethereum exists, [then] create custom transport.
    transport = custom(window.ethereum);
  } else {
    // [if] window.ethereum is not available, [then] throw error.
    const errorMessage =
      "MetaMask or another web3 wallet is not installed. Please install one to proceed.";
    throw new Error(errorMessage);
  }

  // Wallet Client //
  // creates: wallet client using the Sepolia chain and the custom transport.
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: transport,
  });

  // Return the wallet client
  return walletClient;
}

export function ConnectPublicClient() {
  // declares: Public Client
  // creates: public client using the Sepolia chain and an HTTP transport.
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://rpc.sepolia.org"),
  });

  // Return the public client
  return publicClient;
}
