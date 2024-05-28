import { createWalletClient, custom } from "viem"
import { sepolia } from "viem/chains"
import "viem/window"

export async function ConnectWalletClient() {
  // window.ethereum is an object provided by MetaMask or other web3 wallets.
  let transport;
  if (window.ethereum) {
    // [if] window.ethereum exists, [then] create custom transport.
    transport = custom(window.ethereum);
  } else {
    // [if] window.ethereum is not available, [then] throw error.
    const errorMessage =
      "Please install an EVM-compatible blockchain wallet to proceed.";
    throw new Error(errorMessage);
  }

  /*/ Wallet Client /*/

  // creates: wallet client using the Sepolia chain and the custom transport.
  // wallet client: provides access to Wallet Actions, such as sendTransaction and signMessage (this requires a wallet to be connected).
  // see viem documentation for more details: https://viem.sh/docs/clients/wallet.html
  const walletClient = createWalletClient({
    chain: sepolia,
    transport: transport,
  });

  // returns: wallet client
  return walletClient;
}