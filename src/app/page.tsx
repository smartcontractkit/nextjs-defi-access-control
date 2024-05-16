"use client"

import Image from "next/image"
import MintButton from "./components/MintButton"
import { getBalance } from "./functions/getBalance";

export default async function Home() {
  const nftBalance = await getBalance();
  // console.log("nftBalance", nftBalance);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <MintButton />
      </div>
      <div
        className={"flex w-full mt-4 items-center justify-center font-mono text-sm"}
      >
        {nftBalance != '0' ? (
          <Image
            src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDhqN3k5ZmI0dHd4ZGFxNnhlNWkzaHZxOWR5ZmFybTB5bWFkMmhreCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IgpsRT6FdinjrDWzNu/giphy.gif"}
            height={400}
            width={400}
            alt={'VIP token'}
          />
        ) : (
            <Image
              src={"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWUweDVkMHp1Zno0MXJvdnpmcnNycTd6bjBmdGxvc21qdGEzMDI4dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9EdzfOSgfyueLm/giphy.gif"}
              height={400}
              width={400}
              alt={'Basic User'}
            />
          )
        }
      </div>
    </main>
  )
}



