"use client";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      {/* First row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap">
        {/* Introduction section */}
        <section className="bg-[#df57c4] p-10 lg:w-[45vw]">
          <div className="flex flex-col">
            <p>
              A one line command to deploy and monitor an Ethereum Node, funded and maintained by BuidlGuidl members.
            </p>
            <p>Mac/linux</p>
            <code className="bg-black p-6 text-white text-base">{`
                    /bin/bash -c "$(curl -fsSL https://client.buidlguidl.com/runBuidlGuidlClient.sh)"
                  `}</code>
            <p> or run the client from the repo:</p>
            <code className="bg-black p-6 text-white text-base">{`
                    git clone https://github.com/BuidlGuidl/buidlguidl-client.git
                    cd buidlguidl-client
                    yarn install
                    node index.js
                  `}</code>
          </div>
        </section>

        {/* Screenshot section */}
        <section className="bg-[#DDDDDD] flex-1 p-8 flex justify-center">
          <img src="computer-screenshot.png" alt="screenshot" className="object-contain" />
        </section>

        {/* Satellite section */}
        <section className="bg-[#12D855] p-6 w-[40vw] lg:flex-1 flex justify-center">
          <img src="satellite-test.png" alt="satellite" className="object-contain" />
        </section>
      </div>

      {/* Second row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap mb-10">
        {/* Map section */}
        <section className="bg-[#F6F6F6] p-10">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-lg">📡 Clients running</h1>
            <img src="live-tag.svg" alt="live tag" className="w-16 animate-pulse-fast mb-1.5" />
          </div>
          <div className="relative flex items-center justify-center pt-10">
            <img src="map.png" alt="map" className="w-auto" />
            {/* Continent tags */}
            <div className="text-sm lg:text-base flex items-center justify-center">
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[90px] right-[300px] lg:top-[110px] lg:right-[300px]">
                <p className="text-center whitespace-nowrap">europe (10)</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[140px] right-[140px] lg:top-[160px] lg:right-[160px]">
                <p className="text-center whitespace-nowrap">asia (10)</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[120px] left-[80px] lg:top-[140px] lg:left-[70px]">
                <p className="text-center whitespace-nowrap">north america (10)</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[80px] left-[140px] lg:bottom-[80px] lg:left-[160px]">
                <p className="text-center whitespace-nowrap">south america (10)</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[120px] left-[350px] lg:bottom-[170px] lg:left-[400px]">
                <p className="text-center whitespace-nowrap">africa (10)</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[70px] right-[60px] lg:bottom-[60px] lg:right-[30px]">
                <p className="text-center whitespace-nowrap">australia (10)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Docs section */}
        <section className="bg-black p-10 lg:w-[30vw] w-full text-white">
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
        </section>
      </div>
    </>
  );
};

export default Home;
