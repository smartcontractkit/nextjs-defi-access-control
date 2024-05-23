import ConnectButton from "./components/ConnectButton"
import GrantAccessButton from "./components/GrantAccessButton"
import ViewCodeButton from "./components/ViewCodeButton"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <ConnectButton />
      </div>
      <div
        className={"grid grid-cols-1 gap-4 w-full max-w-5xl items-center justify-between font-mono text-sm"}
      >
        <GrantAccessButton />
        <ViewCodeButton />
      </div>
    </main>
  )
}



