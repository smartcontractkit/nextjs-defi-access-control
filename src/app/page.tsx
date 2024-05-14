import React from 'react'
import WalletButton from "./components/WalletButton";
import ViewProtectedContent from "./components/ViewProtectedContent";

export default function Home() {
  return (
    <div>
      <WalletButton />
      <ViewProtectedContent />
    </div>
  );
}
