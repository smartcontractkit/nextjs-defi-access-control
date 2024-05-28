import {createPublicClient, http} from "viem";
import {sepolia} from "viem/chains";
import "viem/window";

export function ConnectBlockchain() {
  // creates: public client using the Sepolia chain and an HTTP transport.
  // TODO@BunsDev should we write a line or two here and in WalletClient to explain what a public/BC client is vs a wallet client?
  // Or we can do in ConnectButton where we use them for different purposes? That could be confusing as to why two clients for "the same thing"

  const blockchainClient = createPublicClient({
    chain: sepolia,
    transport: http("https://rpc.sepolia.org"),
  });

  // returns: public client.
  return blockchainClient;
}
