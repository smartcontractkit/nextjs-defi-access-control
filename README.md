This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

[**MintButton.tsx**](./src/app/components/MintButton.tsx): enables you to mint the Access Token, which enables users to unlock VIP access.

## Constants
### Smart Contract ABI
- **Location**: [constants/abis.ts](/src/app/constants/abis.ts)
- **Stores**: the Application Binary Interface (ABI) for our AccessToken smart contract.
- **ABIs**: inform the blockchain how to treat each of its functions.
    - `balanceOf(account)`: reads the balance of the connected wallet address.
    - `grantAccess(to)`: writes the address of the user we want to grant access to.

### Smart Contract Address
- **Location**: [constants/addresses.ts](/src/app/constants/addresses.ts)
- **Stores**: the address for our deployed Access Token smart contract.


<br />

# Resources

## Smart Contract

**[OpenAccess.sol](https://remix.ethereum.org/#url=https://github.com/BunsDev/nextjs-defi-access-control/blob/develop/src/lib/OpenAccess.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js)**: smart contract written in Solidity programming language that enables you to write `grantAccess(address to)` on a EVM-compatible blockchain network (e.g. Ethereum Sepolia)

## NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

> This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Vercel Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.