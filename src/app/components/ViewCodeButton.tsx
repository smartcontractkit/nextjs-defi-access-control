import Link from "next/link"

export default function ViewCodeButton() {
    // TODO @BunsDev please update github url to SCK.
    return (
        <Link
            href={"https://remix.ethereum.org/#url=https://github.com/SmartContractKit/nextjs-defi-access-control/blob/main/src/lib/OpenAccess.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.25+commit.b61c2a91.js"}
            target="_blank"
            className="p-4 text-lg w-full text-center justify-center items-center flex bg-black rounded-xl text-white font-bold"
        >
            <div className="flex items-center">
                <button>
                    {`View Code in Remix`}
                </button>
            </div>
        </Link>
    )
}