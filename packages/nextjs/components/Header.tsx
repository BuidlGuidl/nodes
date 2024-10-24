"use client";

import React from "react";
import Image from "next/image";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <header className="relative">
      {/* Lines at the sides */}
      <div className="fixed top-0 left-0 w-full h-[130px] z-20">
        <div className="absolute left-10 top-0 bottom-0 w-px bg-black"></div>
        <div className="absolute right-10 top-0 bottom-0 w-px bg-black"></div>
      </div>

      {/* Logo div with mix-blend-exclusion */}
      <div className="fixed top-6 left-[70px] z-30 mix-blend-difference">
        <div>
          <Image src="client-logo.svg" alt="logo" width={260} height={78} />
        </div>
      </div>

      {/* Connect button */}
      <div className="fixed top-10 right-[70px] z-30 flex items-center">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};
