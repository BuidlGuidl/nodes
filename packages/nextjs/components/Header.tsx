"use client";

import React from "react";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <>
      {/* Logo div with mix-blend-exclusion */}
      <div className="fixed top-6 left-10 z-30 mix-blend-difference">
        <div>
          <img src="client-logo.svg" alt="logo" />
        </div>
      </div>

      {/* Connect button */}
      <div className="fixed top-10 right-10 z-30 flex items-center">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </>
  );
};
