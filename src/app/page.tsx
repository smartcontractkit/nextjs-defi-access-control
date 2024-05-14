import React from 'react'
import WalletButton from "./components/WalletButton";
import ViewProtectedContent from "./components/ViewProtectedContent";

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-white"
    >
      <WalletButton />
      <ViewProtectedContent />
    </div>
  );
}
