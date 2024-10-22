"use client";

import React from "react";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <div className="sticky top-2 navbar min-h-0 flex-shrink-0 justify-between z-20 px-0">
      <div>
        <img src="client-logo.svg" alt="logo" />
      </div>
      <div className="navbar-end flex-grow">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};
