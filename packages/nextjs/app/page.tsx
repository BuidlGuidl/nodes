"use client";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-4xl font-bold">🌐 BuidlGuidl Nodes 📡</span>
            <span className="block text-2xl mt-4">run an ethereum node in one command</span>
            <span className="block text-2xl mb-2 mt-8">mac/linux:</span>
            <pre className="bg-black text-white p-8 rounded">
              <code>{`curl -s https://nodes.buidlguidl.com/bgnodes.sh | /bin/bash`}</code>
            </pre>
          </h1>

          <h1 className="text-center">
            <span className="block text-2xl mb-2">windows:</span>
            <pre className="bg-black text-white p-8 rounded">
              <code>{`wget -qO- https://nodes.buidlguidl.com/bgnodes.sh | /bin/bash`}</code>
            </pre>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
