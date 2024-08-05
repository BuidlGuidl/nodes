"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">🌐 BuidlGuidl Client 📡</span>
            <span className="block text-2xl mt-4">run an ethereum node in one command</span>
            <span className="block text-2xl mb-2 mt-8">mac/linux:</span>
            <pre className="bg-black text-white p-8 rounded">
              {/* <code>{`curl -s https://nodes.buidlguidl.com/runBuidlGuidlClient.sh | /bin/bash`}</code> */}
              <code>{`/bin/bash -c "$(curl -fsSL https://nodes.buidlguidl.com/runBuidlGuidlClient.sh)"`}</code>
            </pre>
          </h1>
        </div>
        <div className="pt-8">
          <h1 className="text-center">
            <span className="block text-2xl mt-4">or run the client from the repo:</span>
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
      </div>
    </>
  );
};

export default Home;
