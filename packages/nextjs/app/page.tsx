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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://rpc.buidlguidl.com:48544/nodecontinents");
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
      <div className="flex flex-row flex-wrap lg:flex-nowrap lg:border-x-[1px] lg:border-y-[1px] border-black">
        {/* Introduction section */}
        <section className="bg-[#df57c4] p-6 lg:p-10 lg:w-[45vw] border-x-[1px] border-y-[1px] border-black lg:border-none overflow-auto">
          <div className="flex flex-col">
            <p className="mt-0">Run an Ethereum node with a single command:</p>
            <p className="mt-0">Mac/linux</p>
            <div className="bg-black p-2 lg:p-4 text-white text-sm overflow-auto">
              <p className="m-2">
                /bin/bash -c &quot;$(curl -fsSL https://client.buidlguidl.com/runBuidlGuidlClient.sh)&quot;
              </p>
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

        {/* Screenshot section */}
        <section className="bg-[#DDDDDD] flex-1 p-6 flex justify-center border-x-[1px] border-b-[1px] border-black lg:border-b-0">
          <Image src="/screenshot-2.png" alt="screenshot" className="object-contain" width={972} height={875} />
        </section>

        {/* Satellite section */}
        <section className="bg-[#20F658] p-6 w-[40vw] lg:flex-1 flex justify-center border-r-[1px] border-b-[1px] border-black lg:border-r-0 lg:border-b-0">
          <Image src="/satellite-10fps.gif" alt="satellite" className="object-contain" width={436} height={535} />
        </section>
      </div>

      {/* Second row */}
      <div className="lg:grid lg:grid-cols-3 mb-10">
        {/* Map section */}
        <section className="col-span-2 bg-[#F6F6F6] p-6 lg:p-10 border-x-[1px] border-black lg:border-b-[1px]">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-lg m-0">📡 Clients running</h1>
            <Image src={liveTag} alt="live tag" className="w-16 animate-pulse-fast" />
          </div>
          <div className="relative flex items-center justify-center pt-10">
            <Image src={map} alt="map" />
            {/* Continent tags */}
            <div className="text-xs md:text-sm lg:text-base flex items-center justify-center">
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[26%] right-[33%] lg:right-[37%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">europe ({continentData?.Europe ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[35%] right-[14%] xl:right-[18%] lg:top-[30%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">asia ({continentData?.Asia ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute top-[32%] left-[5%] lg:left-[6%] xl:left-[9%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                  north america ({continentData?.["North America"] ?? "..."})
                </p>
              </div>
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[20%] left-[15%] xl:left-[20%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                  south america ({continentData?.["South America"] ?? "..."})
                </p>
              </div>
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[35%] left-[43%] lg:left-[45%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">africa ({continentData?.Africa ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] lg:px-3 leading-none absolute bottom-[10%] right-[5%] lg:bottom-[13%]">
                <p className="m-2 xl:my-3 text-center whitespace-nowrap">
                  australia ({continentData?.Australia ?? "..."})
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Docs section */}
        <section className="bg-black p-6 lg:p-10 text-white">
          <h1 className="text-lg">Useful links | Docs</h1>
          <ul className="list-disc list-outside pl-4">
            <li className="my-4">
              <a href="https://docs.rocketpool.net/guides/node/local/hardware" className="link">
                On how to select hardware
              </a>
            </li>
            <li className="my-4">
              <a href="https://gist.github.com/yorickdowne/f3a3e79a573bf35767cd002cc977b038" className="link">
                All about how to buy the correct drive
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
