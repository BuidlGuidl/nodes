"use client";

import { useState } from "react";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">🌐 BuidlGuidl Client 📡</span>
            <span className="block text-2xl mt-4">run an ethereum node in one command</span>
            <span className="block text-2xl mb-2 mt-8">mac/linux:</span>
            <pre className="bg-black text-white p-8 rounded">
              <code>{`/bin/bash -c "$(curl -fsSL https://client.buidlguidl.com/runBuidlGuidlClient.sh)"`}</code>
            </pre>
          </h1>
        </div>
        <div className="pt-8">
          <h1 className="text-center">
            <span className="block text-2xl mt-4">or run the client from the repo: </span>
            <span className="block text-2xl mb-2 mt-8"></span>
            <pre className="bg-black text-white p-8 rounded text-left">
              <code>{`
git clone https://github.com/BuidlGuidl/buidlguidl-client.git
cd buidlguidl-client
yarn install
node index.js
              `}</code>
            </pre>
          </h1>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl text-center mb-4">screenshot:</h2>
          <Image
            src="/screen.png"
            alt="Screenshot of the node running"
            width={500}
            height={300}
            className="rounded-lg shadow-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="max-w-[90vw] max-h-[90vh]">
              <Image
                src="/screen.png"
                alt="Screenshot of the node running"
                width={1920}
                height={1080}
                className="rounded-lg"
                onClick={e => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
