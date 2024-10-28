"use client";

import Image from "next/image";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <header className="container mx-auto">
      <div className="p-6 lg:p-8 flex flex-wrap items-center justify-between border-l border-r border-black">
        <Image className="w-40 md:w-auto" src="client-logo.svg" alt="logo" width={260} height={78} />
        <RainbowKitCustomConnectButton />
      </div>
    </header>
  );
};
