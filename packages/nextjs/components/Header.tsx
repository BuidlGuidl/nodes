"use client";

import Image from "next/image";

// import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  return (
    <header className="container mx-auto border-l border-r border-black">
      <div className="container z-10 mix-blend-difference p-6 lg:p-8">
        <Image className="w-40 md:w-auto invert" src="client-logo.svg" alt="logo" width={260} height={78} />
      </div>
      {/* <div className="fixed container z-10 p-6 lg:p-8 flex justify-end">
        <div className="mt-2">
          <RainbowKitCustomConnectButton />
        </div>
      </div> */}
    </header>
  );
};
