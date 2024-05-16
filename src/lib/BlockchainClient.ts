import { createPublicClient, http } from "viem"
import { sepolia } from "viem/chains"
import "viem/window"

export function ConnectBlockchain() {
  // creates: public client using the Sepolia chain and an HTTP transport.
  const blockchainClient = createPublicClient({
    chain: sepolia,
    transport: http("https://rpc.sepolia.org"),
  });

  // returns: public client.
  return blockchainClient;
}
