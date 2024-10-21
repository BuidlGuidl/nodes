"use client";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      {/* First row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap mt-10">
        {/* Introduction section */}
        <div className="bg-[#7877FF] p-10 lg:w-[45vw]">
          <div className="flex flex-col">
            <p className="text-lg">
              A one line command to deploy and monitor an Ethereum Node, funded and maintained by BuidlGuidl members.
            </p>
            <p className="text-lg">Mac/linux</p>
            <code className="bg-black p-6 text-white">{`
                    /bin/bash -c "$(curl -fsSL https://client.buidlguidl.com/runBuidlGuidlClient.sh)"
                  `}</code>
            <p className="text-lg">or run the client from the repo:</p>
            <code className="bg-black p-6 text-white">{`
                    git clone https://github.com/BuidlGuidl/buidlguidl-client.git
                    cd buidlguidl-client
                    yarn install
                    node index.js
                  `}</code>
          </div>
        </div>

        {/* Screenshot section */}
        <div className="bg-[#DDDDDD] flex-1 p-10 flex justify-center">
          <img src="computer-screenshot.png" alt="screenshot" className="object-contain" />
        </div>

        {/* Satellite section */}
        <div className="bg-[#12D855] p-6 w-[40vw] lg:flex-1 flex justify-center">
          <img src="satellite-test.png" alt="satellite" className="object-contain" />
        </div>
      </div>

      {/* Second row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap mb-10">
        {/* Map section */}
        <div className="bg-[#F6F6F6] p-10">
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-lg">📡 Clients running</h1>
            <img src="live-tag.svg" alt="live tag" className="w-16" />
          </div>
          <div className="flex items-center justify-center pt-10">
            <img src="map.png" alt="map" className="w-auto" />
          </div>
        </div>

        {/* Docs section */}
        <div className="bg-black p-10 lg:w-[30vw] w-full text-white">
          <h1 className="text-lg">Useful links | Docs</h1>
          <ul className="list-disc list-outside flex flex-col m-auto lg:mx-0 pl-8 lg:pl-4 ">
            <li>
              <a href="https://docs.rocketpool.net/guides/node/local/hardware" className="link">
                On how to select hardware
              </a>
            </li>
            <li>
              <a href="https://gist.github.com/yorickdowne/f3a3e79a573bf35767cd002cc977b038" className="link">
                All about how to buy the correct drive
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
