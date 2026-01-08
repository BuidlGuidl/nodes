"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";
import liveTag from "~~/public/live-tag.svg";
import map from "~~/public/map.png";

interface ContinentData {
  "North America": number;
  "South America": number;
  Europe: number;
  Asia: number;
  Africa: number;
  Australia: number;
}

const Home: NextPage = () => {
  const [continentData, setContinentData] = useState<ContinentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pool.mainnet.rpc.buidlguidl.com:48547/nodecontinents");
        const data = await response.json();
        setContinentData(data.continents);
      } catch (error) {
        console.error("Error fetching continent data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      {/* First row */}
      <div className="flex flex-col lg:flex-row lg:border-x-[1px] lg:border-y-[1px] border-black">
        {/* Introduction section */}
        <section className="bg-[#df57c4] p-6 lg:p-10 w-full lg:w-[45vw] border-x-[1px] border-y-[1px] border-black lg:border-none overflow-auto">
          <div className="flex flex-col">
            <p className="mt-0">Run an Ethereum node with a single command:</p>
            <p className="mt-0">Mac/linux</p>
            <div className="bg-black p-2 lg:p-4 text-white text-sm overflow-auto">
              <p className="m-2">/bin/bash -c &quot;$(curl -fsSL https://bgclient.io)&quot;</p>
            </div>
            <p> or run the client from the repo:</p>
            <div className="bg-black p-2 lg:p-4 text-white text-sm overflow-auto">
              <p className="m-2 whitespace-nowrap">git clone https://github.com/BuidlGuidl/buidlguidl-client.git</p>
              <p className="m-2">cd buidlguidl-client</p>
              <p className="m-2">yarn install</p>
              <p className="m-2">node index.js</p>
            </div>
          </div>
        </section>

        {/* Second row for mobile - flex row to make sections share the row */}
        <div className="flex flex-row flex-1">
          {/* Screenshot section */}
          <section className="bg-[#F6F6F6] w-7/12 lg:flex-1 p-6 flex justify-center border-x-[1px] border-b-[1px] border-black lg:border-b-0">
            <Image
              src="/screenshot-3.png"
              alt="screenshot"
              className="object-contain cursor-pointer"
              width={972}
              height={875}
              onClick={() => setIsModalOpen(true)}
            />
          </section>

          {/* Satellite section */}
          <section className="bg-[#20F658] p-6 w-5/12 lg:flex-1 flex justify-center border-r-[1px] border-b-[1px] border-black lg:border-r-0 lg:border-l-0 lg:border-b-0">
            <Image src="/satellite-10fps.gif" alt="satellite" className="object-contain" width={436} height={535} />
          </section>
        </div>
      </div>

      {/* Second row */}
      <div className="lg:grid lg:grid-cols-3 lg:border-x-[1px] lg:border-black">
        {/* Map section */}
        <section className="bg-[#DDDDDD] col-span-2 p-6 lg:p-10 border-x-[1px] border-black lg:border-x-0 lg:border-b-[1px] lg:border-r-[1px]">
          <div className="flex flex-col">
            <p className="mt-0">
              You can earn{" "}
              <a href="https://bread.buidlguidl.com/" target="_blank" rel="noreferrer" className="link">
                BuidlGuidl Bread
              </a>{" "}
              (
              <a
                href="https://basescan.org/address/0xF9206cA52a336Fba43264bc6822046D60aEdfc3C"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                BGBRD
              </a>
              ) by handling requests for the distributed{" "}
              <a href="https://rpc.buidlguidl.com/" target="_blank" rel="noreferrer" className="link">
                BuidlGuidl Mainnet RPC
              </a>
              .
            </p>
            <p className="mt-10">Start your BG Client with the --owner flag set to your eth address or ens:</p>
            <div className="bg-black p-2 lg:p-4 mb-6 text-white text-sm overflow-auto">
              <p className="m-2">node index.js --owner &lt;address or ens&gt;</p>
            </div>
            <a
              href="https://apps.apple.com/de/app/bg-client/id6756518184?l=en-GB"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
              Track your clients & BGBRD rewards on iOS
            </a>
          </div>
        </section>

        {/* Docs section */}
        <section className="bg-black p-6 lg:p-10 text-white border-x-[1px] border-b-[1px] border-black lg:border-x-0 lg:border-b-[1px]">
          <h1 className="text-lg">Useful links | Docs</h1>
          <ul className="list-disc list-outside pl-4">
            <li className="my-4">
              <a href="https://github.com/BuidlGuidl/buidlguidl-client" className="link">
                BuidlGuidl Client Repo
              </a>
            </li>
            <li className="my-4">
              <a href="https://docs.rocketpool.net/guides/node/local/hardware" className="link">
                Node Hardware Guide (Rocket Pool)
              </a>
            </li>
            <li className="my-4">
              <a href="https://gist.github.com/yorickdowne/f3a3e79a573bf35767cd002cc977b038" className="link">
                SSD Selection Guide
              </a>
            </li>
            <li className="my-4">
              <a href="https://reth.rs/" className="link">
                Reth Docs
              </a>
            </li>
            <li className="my-4">
              <a href="https://lighthouse-book.sigmaprime.io/" className="link">
                Lighthouse Docs
              </a>
            </li>
            <li className="my-4">
              <a href="https://geth.ethereum.org/docs" className="link">
                Geth Docs
              </a>
            </li>
            <li className="my-4">
              <a href="https://docs.prylabs.network/docs/getting-started" className="link">
                Prysm Docs
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Third row */}
      <div className="lg:grid lg:grid-cols-3 mb-10">
        {/* Map section */}
        <section className="col-span-3 bg-[#F6F6F6] p-6 lg:p-10 border-x-[1px] border-black border-b-[1px]">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-lg m-0">📡 Contributing clients</h1>
            <Image src={liveTag} alt="live tag" className="w-16 animate-pulse-fast" />
          </div>
          <div className="flex items-center justify-center pt-10">
            <div className="relative">
              <Image src={map} alt="map" />
              {/* Continent tags */}
              <div className="text-xs md:text-sm lg:text-base">
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[18%] right-[38%] lg:right-[42%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">europe ({continentData?.Europe ?? "..."})</p>
                </div>
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[27%] right-[17%] xl:right-[18%] lg:top-[27%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">asia ({continentData?.Asia ?? "..."})</p>
                </div>
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[26%] left-[1%] sm:left-[7%] lg:left-[10%] xl:left-[9%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                    north america ({continentData?.["North America"] ?? "..."})
                  </p>
                </div>
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[22%] left-[12%] sm:left-[20%] xl:left-[22%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                    south america ({continentData?.["South America"] ?? "..."})
                  </p>
                </div>
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[39%] left-[45%] lg:left-[46%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">africa ({continentData?.Africa ?? "..."})</p>
                </div>
                <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[16%] right-[2%] sm:right-[6%] lg:right-[8%]">
                  <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                    australia ({continentData?.Australia ?? "..."})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Image
              src="/screenshot-3-modal.png"
              alt="screenshot"
              className="object-contain"
              width={2030}
              height={1327}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
