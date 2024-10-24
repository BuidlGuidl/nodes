"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";

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
    <>
      {/* First row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap lg:border-x-[1px] lg:border-y-[1px] border-black">
        {/* Introduction section */}
        <section className="bg-[#df57c4] p-10 lg:w-[45vw] border-x-[1px] border-y-[1px] border-black lg:border-none">
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
        <section className="bg-[#DDDDDD] flex-1 p-8 flex justify-center border-x-[1px] border-b-[1px] border-black lg:border-b-0">
          <img src="screenshot-2.png" alt="screenshot" className="object-contain" />
        </section>

        {/* Satellite section */}
        <section className="bg-[#12D855] p-6 w-[40vw] lg:flex-1 flex justify-center border-r-[1px] border-b-[1px] border-black lg:border-r-0 lg:border-b-0">
          <img src="satellite-test.png" alt="satellite" className="object-contain" />
        </section>
      </div>

      {/* Second row */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap mb-10">
        {/* Map section */}
        <section className="bg-[#F6F6F6] p-10 border-x-[1px] border-black lg:border-b-[1px]">
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-lg">📡 Clients running</h1>
            <img src="live-tag.svg" alt="live tag" className="w-16 animate-pulse-fast mb-1.5" />
          </div>
          <div className="relative flex items-center justify-center pt-10">
            <img src="map.png" alt="map" className="w-auto" />
            {/* Continent tags */}
            <div className="text-sm lg:text-base flex items-center justify-center">
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[90px] right-[200px] md:top-[100px] md:right-[280px] lg:top-[130px] lg:right-[420px]">
                <p className="text-center whitespace-nowrap">europe ({continentData?.Europe ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[120px] right-[80px] md:top-[130px] md:right-[120px] lg:top-[170px] lg:right-[220px]">
                <p className="text-center whitespace-nowrap">asia ({continentData?.Asia ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute top-[100px] left-[30px] md:top-[130px] md:left-[60px] lg:top-[170px] lg:left-[120px]">
                <p className="text-center whitespace-nowrap">
                  north america ({continentData?.["North America"] ?? "..."})
                </p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[40px] left-[100px] md:bottom-[80px] md:left-[160px] lg:bottom-[120px] lg:left-[220px]">
                <p className="text-center whitespace-nowrap">
                  south america ({continentData?.["South America"] ?? "..."})
                </p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[100px] left-[220px] md:bottom-[140px] md:left-[320px] lg:bottom-[190px] lg:left-[490px]">
                <p className="text-center whitespace-nowrap">africa ({continentData?.Africa ?? "..."})</p>
              </div>
              <div className="bg-[#f359d4] px-3 leading-none absolute bottom-[30px] right-[30px] lg:bottom-[80px] lg:right-[60px]">
                <p className="text-center whitespace-nowrap">australia ({continentData?.Australia ?? "..."})</p>
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
