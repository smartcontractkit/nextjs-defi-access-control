# Disclaimer

This tutorial represents an educational example to use a Chainlink system, product, or service and is provided to demonstrate how to interact with Chainlink’s systems, products, and services to integrate them into your own. This template is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, it has not been audited, and it may be missing key checks or error handling to make the usage of the system, product or service more clear. Do not use the code in this example in a production environment without completing your own audits and application of best practices. Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for unintended outputs that are generated due to errors in code.

# NextJS
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

If you are new to wallets, please setup your wallet using these notes: [https://docs.chain.link/quickstarts/deploy-your-first-contract](https://docs.chain.link/quickstarts/deploy-your-first-contract)

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
    - `grantAccess()`: grants access to the connect wallet address (write function).

### Images
- **Location**: [constants/images.ts](/src/app/constants/images.ts)
- **Stores**: the images we use to indicate whether (or not) a given user has access granted.

<br />

# Resources

## Smart Contract

**[OpenAccess.sol](https://remix.ethereum.org/#url=https://github.com/SmartContractKit/nextjs-defi-access-control/blob/main/src/lib/OpenAccess.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js)**: smart contract written in Solidity programming language that enables you to call `grantAccess()` on a EVM-compatible blockchain network (e.g. Ethereum Sepolia)

## Vercel Preview
View the latest version of this repository live on Vercel at https://nextjs-defi-access-control.vercel.app/ 


## Contact Chainlink Labs
- **Discord**: http://chn.lk/chainlink-discord
- **Documentation**: http://docs.chain.link

Disclaimer: Please note, this repo contains community examples only  — these are not Chainlink products or services and are not supported or maintained by Chainlink. This code represents an example of using a Chainlink product or service, and is intended for demonstration and educational purposes only. It is provided “AS IS” and “AS AVAILABLE” without warranties of any kind, may not have been audited, and may omit checks or error handling. Each party intending to use this example code does so entirely at their own risk and must perform its own audits, security and code review, key management, and testing before any production deployment and ensure the operation and performance of such code matches expectations. Neither Chainlink Labs nor the Chainlink Foundation deploys, operates, monitors, maintains or endorses any deployment of this code. Note that this is not a Chainlink product, feature or service, and there are no commitments made with respect to the code, including compatibility with future Chainlink releases. You should not rely on this code without first conducting your own technical, engineering, and security review. This code is also outside the scope of any Chainlink bug bounty programs. Neither Chainlink Labs, the Chainlink Foundation, nor Chainlink node operators are responsible for outcomes due to errors in this example or how it is deployed or operated, or liable for any resulting claims or damages. Use of the Chainlink Network is subject to the Chainlink Foundation [Terms of Service](https://chain.link/terms), which provides important information and disclosures. By using this code, you acknowledge and agree to these terms.
