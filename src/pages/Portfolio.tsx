import "../app/globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { FaWallet } from "react-icons/fa";
import RobinoLogo from "../assets/token_40px.png";
import Image from "next/image";
import USDM from "../assets/usdm.png";
import { FaFlag } from "react-icons/fa6";
import React, { useState } from "react";

const Portfolio: React.FC = () => {
  
  const [token, setToken] = useState<string>("Token");
  const tokens=["USDM","RBN"];
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
    <div className="flex relative bg-gradient">
      <Sidebar />
      <div className="absolute ml-[250px]">
        <Navbar />
      </div>

      <div className="mt-[100px] ml-[100px]">
        <h1 className="text-white  text-[40px]">Portfolio </h1>

        {/* wallet div  */}
        <div className="bg-[#242555] border border-pink-900 mt-2 rounded-xl w-[980px]">
          {/* wallet text with icon  */}
          <div className="text-white gap-x-4 flex items-center text-[20px] pl-4 pt-2">
            <FaWallet /> Wallet
          </div>
          <div className="flex gap-x-2">
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[490px] pl-4 ml-4 mt-2 mb-4  items-center">
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
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[490px] pl-4  mt-2 mb-4 mr-4  items-center">
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
        <div className="bg-[#242555] border border-pink-900 mt-4 rounded-xl w-[980px]">
          {/* wallet text with icon  */}
          <div className="text-white gap-x-4 flex items-center text-[20px] pl-4 pt-2">
            <FaFlag /> Versus Event Overview
          </div>
          <div className="flex gap-x-2">
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[250px] pl-4 ml-4 mt-2 mb-4  items-center">
              <div className="flex flex-col gap-x-2  py-[6px]">
                <p className=" text-slate-500 flex items-center">
                  Versus Event Bought
                </p>

                <div className="flex gap-x-1 items-center text-[14px] ">
                  <p className="text-white  items-center flex ">0</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[250px] pl-4  mt-2 mb-4  items-center">
              <div className="flex flex-col gap-x-2  py-[6px]">
                <p className=" text-slate-500 flex items-center">
                  Total Amount Of Rewards
                </p>

                <div className="flex gap-x-1 items-center text-[14px] ">
                  <p className="text-white  items-center flex ">0</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[250px] pl-4 mt-2 mb-4  items-center">
              <div className="flex flex-col gap-x-2  py-[6px]">
                <p className=" text-slate-500 flex items-center">
                  Total Winnings
                </p>

                <div className="flex gap-x-1 items-center text-[14px] ">
                  <p className="text-white  items-center flex ">0</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between   rounded-lg bg-[#061230] w-[270px] pl-4 mr-2  mt-2 mb-4  items-center">
              <div className="flex   py-[6px]">
                <div className="flex flex-col  items-center text-[14px] ">
                  <p className=" text-slate-500 flex items-center">
                    Total Staked
                  </p>
                  <p className="text-white  items-center">0 {token}</p>
                </div>
                <div className="dropdown ml-[50px]">
                  {/* Button to trigger dropdown */}
           

                  {/* Dropdown menu */}
            <div className="flex items-center h-[50px] p-[2px] relative">
            <button
              type="button"
              className="group h-full items-center rounded-[10px] bg-slate-900 border border-slate-500  placeholder:text-white text-white  disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1 z-50 flex rounded-r-[10px] px-[15px] justify-center "
              onClick={toggleDropdown}
            >
              <span>{token} ▼</span>
            </button>

            {dropdownVisible && (
              <div className="absolute top-[55px] text-[20px] left-2 bg-[#061230] text-white rounded-lg shadow-lg w-[100px] z-50">
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
      </div>
    </div>
  );
};

export default Portfolio;
