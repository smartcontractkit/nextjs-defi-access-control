import { createPublicClient, http } from "viem"
import { sepolia } from "viem/chains"
import "viem/window"

export function ConnectPublicClient() {
  // creates: public client using the Sepolia chain and an HTTP transport.
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http("https://rpc.sepolia.org"),
  });

  // returns: public client.
  return publicClient;
}
