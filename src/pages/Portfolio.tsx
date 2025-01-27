import "../app/globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { FaWallet } from "react-icons/fa";
import RobinoLogo from "../assets/token_40px.png";
import Image from "next/image";
import USDM from "../assets/usdm.png";
import { FaFlag } from "react-icons/fa6";
import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ongoing");
  const [isTokensDropdownOpen, setTokensDropdownOpen] =
    useState<boolean>(false);
  const [isSportsDropdownOpen, setSportsDropdownOpen] =
    useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string>("All Tokens");
  const [selectedSport, setSelectedSport] = useState<string>("All Sports");

  const handleTabClick = (tab: string): void => {
    setActiveTab(tab);
  };
  const toggleTokensDropdown = (): void => {
    setTokensDropdownOpen((prev) => !prev);
    if (isSportsDropdownOpen) setSportsDropdownOpen(false); // Close other dropdown
  };

  const toggleSportsDropdown = (): void => {
    setSportsDropdownOpen((prev) => !prev);
    if (isTokensDropdownOpen) setTokensDropdownOpen(false); // Close other dropdown
  };
  const handleTokenSelect = (token: string): void => {
    setSelectedToken(token);
    setTokensDropdownOpen(false); // Close dropdown after selection
  };

  const handleSportSelect = (sport: string): void => {
    setSelectedSport(sport);
    setSportsDropdownOpen(false); // Close dropdown after selection
  };
  const [token, setToken] = useState<string>("Token");
  const tokens = ["USDM", "RBN"];
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Toggle dropdown menu visibility
  const handleNetworkChange = (newToken: string): void => {
    setToken(newToken);
    setDropdownVisible(false);
  };

  const toggleDropdown = (): void => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="flex relative w-[100vw] bg-gradient">
      <Sidebar />
      <div className=" flex-col w-[80%]  flex">
        <Navbar />
        <div className="mt-[70px] ml-[100px]">
          <h1 className="text-white  text-[40px]">Portfolio </h1>

          {/* wallet div  */}
          <div className=" border border-pink-900 mt-2 rounded-xl ">
            {/* wallet text with icon  */}
            <div className="text-white gap-x-4 flex items-center text-[20px] pl-4 pt-2">
              <FaWallet /> Wallet
            </div>
            <div className="flex gap-x-3">
              <div className="flex justify-between   rounded-lg bg-[#061230] w-[50%] pl-4 ml-4 mt-2 mb-4  items-center">
                <div className="flex flex-col gap-x-2  py-[6px]">
                  <p className="text-white  items-center flex ">0.0000</p>
                  <div className="flex gap-x-1 items-center text-[14px] ">
                    <p className="font-bold text-slate-500 flex items-center">
                      RBN
                    </p>
                  </div>
                </div>
                <Image src={RobinoLogo} alt="" className="pr-2 w-[48px]" />
              </div>
              <div className="flex justify-between   rounded-lg bg-[#061230] w-[50%] pl-4  mt-2 mb-4 mr-4  items-center">
                <div className="flex flex-col gap-x-2  py-[6px]">
                  <p className="text-white  items-center flex ">0.0000</p>
                  <div className="flex gap-x-1 items-center text-[14px] ">
                    <p className="font-bold text-slate-500 flex items-center">
                      USDM
                    </p>
                  </div>
                </div>
                <Image src={USDM} alt="" className="pr-2 w-[48px]" />
              </div>
            </div>
          </div>

          {/* versus event wala div  */}
          <div className=" border border-pink-900 mt-4 rounded-xl w-[100%]">
            {/* wallet text with icon  */}
            <div className="text-white gap-x-4 flex items-center text-[20px] pl-4 pt-2">
              <FaFlag /> Versus Event Overview
            </div>
            <div className="flex gap-x-2">
              <div className="flex justify-between   rounded-lg bg-[#061230] w-[25%] pl-4 ml-4 mt-2 mb-4  items-center">
                <div className="flex flex-col gap-x-2  py-[6px]">
                  <p className=" text-slate-500 flex items-center">
                    Versus Event Bought
                  </p>

                  <div className="flex gap-x-1 items-center text-[14px] ">
                    <p className="text-white  items-center flex ">0</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between   rounded-lg bg-[#061230] w-[25%] pl-4  mt-2 mb-4  items-center">
                <div className="flex flex-col gap-x-2  py-[6px]">
                  <p className=" text-slate-500 flex items-center">
                    Total Amount Of Rewards
                  </p>

                  <div className="flex gap-x-1 items-center text-[14px] ">
                    <p className="text-white  items-center flex ">0</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between   rounded-lg bg-[#061230] w-[25%] pl-4 mt-2 mb-4  items-center">
                <div className="flex flex-col gap-x-2  py-[7px]">
                  <p className=" text-slate-500 flex items-center">
                    Total Winnings
                  </p>

                  <div className="flex gap-x-1 items-center text-[14px] ">
                    <p className="text-white  items-center flex ">0</p>
                  </div>
                </div>
              </div>
              <div className="flex    rounded-lg bg-[#061230] w-[25%] pl-4 mr-2  mt-2 mb-4  items-center">
                <div className="flex justify-between w-full  p-2">
                  <div className="flex flex-col  items-center text-[14px] ">
                    <p className=" text-slate-500 flex items-center">
                      Total Staked
                    </p>
                    <p className="text-white  items-center">0 {token}</p>
                  </div>
                  <div className="dropdown ">
                    <div className="flex items-center h-[50px] p-[2px] relative">
                      <button
                        type="button"
                        className="group h-full  items-center rounded-[10px]  border border-slate-500  placeholder:text-white text-white  disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 z-50 flex rounded-r-[10px] px-[15px] justify-center "
                        onClick={toggleDropdown}
                      >
                        <span className="flex items-center gap-x-1">
                          {token}{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 opacity-50"
                            aria-hidden="true"
                          >
                            <path d="m6 9 6 6 6-6"></path>
                          </svg>
                        </span>
                      </button>

                      {dropdownVisible && (
                        <div className="absolute top-[55px]  left-2 bg-[#061230] text-white rounded-lg shadow-lg w-[100px] z-50">
                          {tokens.map((net) => (
                            <div
                              key={net}
                              className="px-6 py-2 hover:bg-white hover:text-black rounded-xl  cursor-pointer"
                              onClick={() => handleNetworkChange(net)}
                            >
                              {net}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bet history div  */}
          <div className="w-full  border border-pink-900 rounded-xl p-4 items-center mt-4">
            <div className="text-white gap-x-4 flex items-center text-[20px] pl-2 ">
              <SlCalender />
              Bet History
            </div>
            <div className="flex flex-col lg:flex-row gap-[10px] items-center">
              <div>
                <button className="bg-[#2563EB] text-white px-[70px] outline outline-black text-[20px] py-2 rounded-xl hover:cursor-pointer ">
                  Versus
                </button>
              </div>
              <div className="relative w-full lg:w-[33%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-6 h-6 my-auto text-white right-[13px] xl:right-[20px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <input
                  type="text"
                  className="h-[60px] flex w-full rounded-[10px] border border-slate-700 py-2 text-white outline-0 bg-transparent font-regular pl-[10px] pr-[40px] xl:pr-[50px] xl:pl-[20px] placeholder-white placeholder-opacity-100"
                  placeholder="Search"
                />
              </div>
              <div className="flex flex-col md:flex-row lg:grow gap-[10px] relative">
                {/* All Tokens Dropdown */}
                <button
                  type="button"
                  onClick={toggleTokensDropdown}
                  className="flex h-[60px] items-center justify-between rounded-[10px] border border-slate-700 text-white px-[10px] xl:px-[20px] w-full"
                >
                  <span>{selectedToken}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {isTokensDropdownOpen && (
                  <ul className="absolute top-[70px] z-10 bg-[#061230] text-white rounded-[10px] w-[50%] p-2 shadow-md">
                    {["All Tokens", "USDM", "RBN"].map((token) => (
                      <li
                        key={token}
                        className="px-6 py-2 hover:bg-white hover:text-black rounded-xl  cursor-pointer"
                        onClick={() => handleTokenSelect(token)}
                      >
                        {token}
                      </li>
                    ))}
                  </ul>
                )}

                {/* All Sports Dropdown */}
                <button
                  type="button"
                  onClick={toggleSportsDropdown}
                  className="flex h-[60px] items-center justify-between rounded-[10px] border border-slate-700 text-white px-[10px] xl:px-[20px] w-full"
                >
                  <span>{selectedSport}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 opacity-50"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
                {isSportsDropdownOpen && (
                  <ul className="absolute top-[70px] left-[50%] w-[50%] z-10 bg-[#061230] text-white rounded-[10px]  p-2 shadow-md">
                    {[
                      "League",
                      "Seria A 24/25",
                      "Las Vegas 24/25",
                      "EPL 24/25",
                      "Laliga 24/25",
                    ].map((sport) => (
                      <li
                        key={sport}
                        className="px-6 py-2 hover:bg-white hover:text-black rounded-xl bg:transparent  cursor-pointer"
                        onClick={() => handleSportSelect(sport)}
                      >
                        {sport}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 5 words wala last div  */}
            <div className="flex  border-black border-4 mt-4 py-4 rounded-xl text-slate-500 justify-evenly w-full    ">
              <div>Event</div>
              <div>League</div>
              <div>Token</div>
              <div>Stake</div>
              <div>Reward</div>
            </div>
            <div className="bg-white w-[72%] mt-[-5px] ml-[8px] absolute h-[1px]"></div>
            <div className="text-white font-semibold">Versus Events</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
