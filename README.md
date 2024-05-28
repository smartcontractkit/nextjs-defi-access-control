# Disclaimer

This tutorial represents an educational example to use a Chainlink system, product, or service and is provided to demonstrate how to interact with Chainlink’s systems, products, and services to integrate them into your own. This template is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, it has not been audited, and it may be missing key checks or error handling to make the usage of the system, product or service more clear. Do not use the code in this example in a production environment without completing your own audits and application of best practices. Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for unintended outputs that are generated due to errors in code.

# NextJS
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

TODO @BunsDev - perhaps link to Metamask installation portion of https://docs.chain.link/quickstarts/deploy-your-first-contract?

Run the dev server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Directory

## Components

- [**AccessToken.tsx**](./src/app/components/AccessToken.tsx): only shows the VIP token when a user is granted access successfully.
- [**ConnectButton.tsx**](./src/app/components/ConnectButton.tsx): connects your wallet to the blockchain for read/write functionality.
- [**GrantAccessButton.tsx**](./src/app/components/GrantAccessButton.tsx): enables you to grant access to the Access Control Token, which unlocks VIP access.
- [**ViewCodeButton.tsx**](./src/app/components/ViewCodeButton.tsx): redirects the user to the [smart contract code](#smart-contract) prepopulated within the Remix browser IDE for convenient deployment.

## Constants
### Smart Contract ABI
- **Location**: [constants/abis.ts](/src/app/constants/abis.ts)
- **Stores**: the Application Binary Interface (ABI) for our AccessToken smart contract.
- **ABIs**: interface that permits programmatic interaction with smart contract bytecode deployed to a blockchain.
    - `balanceOf(account)`: reads the balance of the provided wallet address.
    - `grantAccess(to)`: writes the address of the user we want to grant access to.

### Smart Contract Address
- **Location**: [constants/addresses.ts](/src/app/constants/addresses.ts)
- **Stores**: the address for our deployed Access Token smart contract.


<br />

# Resources

## Smart Contract

**[OpenAccess.sol](https://remix.ethereum.org/#url=https://github.com/BunsDev/nextjs-defi-access-control/blob/develop/src/lib/OpenAccess.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js)**: smart contract written in Solidity programming language that enables you to call `grantAccess()` on a EVM-compatible blockchain network (e.g. Ethereum Sepolia)

## NextJS

<!-- TODO @BunsDev I think this and the vercel stuff can be removed.  Maybe add the same links @rgottleber has at the end of the preso here? -->

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

> This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Vercel Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
