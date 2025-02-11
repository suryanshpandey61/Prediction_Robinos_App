
import React, { useEffect, useState,useRef } from "react";
import eventData from "../../events.json";
import { ethers } from "ethers";
import RobinoLogo from "../assets/token_40px.png";
import Image from "next/image";
import Slider from "./Slider";
import { AiFillThunderbolt } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import IPLLogo from "../assets/IPl.png"

import { SlCalender } from "react-icons/sl";

interface Team {
  name: string;
  img: string;
  symbol: string;
  image: string;
}

interface Event {
  eventCode: string;
  league: string;
  teamA: Team;
  teamB: Team;
  tokenAddress?: string;
  saleEnds: string;
}

// Define placeholder components for Ongoing, Results, and Staked events


const OngoingEvents: React.FC = () => {
  const [data, setData] = useState<Event[]>([]); // List of ongoing events
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // For team selection (A or B)
  const [amount, setAmount] = useState<string>(""); // Amount to bid
  const [tokenContract, setTokenContract] = useState<any | null>(null); // State for token contract
  const [balance, setBalance] = useState<string>("0"); // User token balance
  const [signer, setSigner] = useState<any | null>(null); // State for the signer

  useEffect(() => {
    setData(eventData);

    const initializeContract = async () => {
      if (window.ethereum && selectedEvent && selectedEvent.tokenAddress) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          if (!userSigner) {
            alert("No signer found. Make sure your wallet is connected.");
            return;
          }

          setSigner(userSigner); // Store signer in state

          const contract = new ethers.Contract(
            selectedEvent.tokenAddress,
            [
              "function transfer(address to, uint amount) public returns (bool)",
              "function balanceOf(address owner) public view returns (uint256)",
            ],
            userSigner
          );

          setTokenContract(contract);

          const userAddress = await userSigner.getAddress();
          // const userBalance = await contract.balanceOf(userAddress);
          // setBalance(ethers.formatUnits(userBalance, 18)); // Assuming 18 decimals
        } catch (error) {
          console.error("Error initializing contract:", error);
          alert("Failed to initialize the contract. Please check if MetaMask is connected.");
        }
      } else {
        alert("Token address is missing or MetaMask is not available.");
      }
    };

    if (selectedEvent) {
      initializeContract();
    }
  }, [selectedEvent]);

  const handleSubmit = async () => {
    if (selectedTeam && amount && tokenContract && signer) {
      try {
        const amountInWei = ethers.parseUnits(amount, 18); // Convert amount to BigNumber in Wei
        const userAddress = await signer.getAddress();

        const userBalance = await tokenContract.balanceOf(userAddress);
        const userBalanceInWei = ethers.formatUnits(userBalance, 18); // Convert balance to decimal format

        if (parseFloat(userBalanceInWei) < parseFloat(amount)) {
          alert("Insufficient balance in the provided token address.");
          return;
        }

        const tx = await tokenContract.transfer(userAddress, amountInWei); // Deduct tokens (if required by your contract)
        await tx.wait();

        const updatedBalance = await tokenContract.balanceOf(userAddress);
        setBalance(ethers.formatUnits(updatedBalance, 18)); // Update the balance in the UI

        alert(`Bid of ${amount} tokens placed on ${selectedTeam}!`);

        closeModal();
      } catch (error) {
        console.error("Error making transaction:", error);
        alert("Failed to place bid.");
      }
    } else {
      alert("Please select a team and enter a valid amount.");
    }
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="text-white w-full flex flex-col gap-x-5 mt-8 pb-8">
      {/* Scrollable Cards Container */}
      <div className="overflow-y-auto gap-y-4 max-h-[600px] flex gap-x-5 flex-wrap scrollbar-hidden">
        {data.map((items, index) => (
          <div
            onClick={() => openModal(items)} // Opens the modal on click
            key={index}
            className="bg-[#2D2F6F] hover:translate-y-[-5.5px] transition-all duration-200 hover:cursor-pointer w-[31.8%] border border-pink-300 rounded-lg"
          >
            {/* Content of each event */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-x-4 font-serif mt-5">
                <p className="text-slate-400 font-bold pl-4">{items.league}</p>
                <div className="flex gap-x-1 items-center pl-4 text-[20px]">
                  <p>{items.teamA.name}</p> v.
                  <p>{items.teamB.name}</p>
                </div>
              </div>

              <Image src={IPLLogo} alt="" className="pr-2 w-[20%]" />
            </div>

            <div className="flex p-4 w-full gap-x-4">
              {/* Team A */}
              <div className="bg-[#453982] items-center w-[50%] flex-col gap-y-2 flex justify-center border border-pink-200 rounded-lg">
                <p className="text-[16px]">
                  {items.teamA.symbol} <span className="text-green-400">+0.5</span>
                </p>
                <img
                  src={items.teamA.image}
                  alt={`${items.teamA} Image`}
                  className="object-cover w-[80px] rounded-xl"
                />
                <div className="flex flex-col ml-[-70px]">
                  <p className="text-slate-400 font-semibold">ROI</p>
                  <p className="text-[20px]">1.90</p>
                </div>
              </div>
              {/* Team B */}
              <div className="bg-[#453982] pt-2 flex-col w-[50%] items-center flex justify-center gap-y-4 border border-pink-200 rounded-lg">
                <p className="text-[16px]">
                  {items.teamB.symbol} <span className="text-red-600">-0.5</span>
                </p>
                <img
                  src={items.teamB.image}
                  alt={`${items.teamB} Image`}
                  className="object-cover w-[80px] flex justify-center rounded-xl"
                />
                <div className="flex flex-col ml-[-50px]">
                  <p className="text-slate-400 font-bold">ROI</p>
                  <p className="text-[20px]">1.90</p>
                </div>
              </div>
            </div>
            <div className="w-[95%] pl-4">
              <Slider />
            </div>

            {/* Prize Pool */}
            <div className="pl-4 cursor-pointer mt-4">
              <div className="flex justify-between rounded-lg bg-[#061230] w-[95%] pl-4 items-center">
                <div className="flex flex-col gap-x-2 py-[6px]">
                  <p className="text-slate-400 items-center flex font-bold">Prize Pool</p>
                  <div className="flex gap-x-1 items-center text-[20px]">
                    <p className="font-bold flex items-center">40.0K RBN</p>
                  </div>
                </div>
                <Image src={RobinoLogo} alt="" className="pr-2 w-[48px]" />
              </div>
            </div>

            <div className="h-[1px] ml-[14px] mt-4 w-[90%] bg-slate-400"></div>
            <div className="flex w-full pl-4 justify-between items-center mt-4 mb-4">
              <p className="text-[16px]">
                Sale End at <span className="font-semibold"> {items.saleEnds}</span>
              </p>
              <div className="pr-5">
                <SlCalender />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2D2F6F] p-8 w-[610px] rounded-lg flex gap-x-5">
            {/* Left Card (Team Selection) */}
            <div className="w-[55%] bg-[#453982] p-4 rounded-lg flex flex-col items-center ">
              <p className="text-white text-lg font-semibold">Select Team</p>
              <div className="flex gap-x-3 mt-[20%]">
                {/* Team A Selection */}
                <div
                  className={`flex items-center flex-col justify-between p-2 w-full rounded-lg bg-[#4A50A1] cursor-pointer ${selectedTeam === "A" ? "border-2 border-green-400" : ""}`}
                  onClick={() => handleTeamChange("A")}
                >
                  <div className="flex flex-col items-center gap-y-2 gap-x-2">
                    <img
                      src={selectedEvent?.teamA.image}
                      alt={`${selectedEvent?.teamA.name} Image`}
                      className=" rounded-xl"
                    />
                    <p className="text-white">{selectedEvent?.teamA.name}</p>
                  </div>
                </div>

                {/* Team B Selection */}
                <div
                  className={`flex  items-center justify-between p-2 w-full rounded-lg bg-[#4A50A1] cursor-pointer ${selectedTeam === "B" ? "border-2 border-green-400" : ""}`}
                  onClick={() => handleTeamChange("B")}
                >
                  <div className="flex flex-col gap-y-2 items-center gap-x-2">
                    <img
                      src={selectedEvent?.teamB.image}
                      alt={`${selectedEvent?.teamB.name} Image`}
                      className="  rounded-xl"
                    />
                    <p className="text-white">{selectedEvent?.teamB.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
              
                <div className="flex  gap-x-2 items-center text-white text-xl mt-4">
                  <p>Balance : </p>
                  <p className="text-yellow-600">{balance} Tokens</p>
                </div>
              </div>
            </div>

            {/* Right Card (Balance, Bid & Selected Team) */}
            <div className="w-[45%] bg-[#453982] p-4 rounded-lg flex flex-col justify-between">
              {/* Selected Team */}
              <div>
                <p className="text-white text-lg font-semibold">Selected Team</p>
                <div className="flex justify-between items-center text-white text-xl mt-4">
                  <p>Team: </p>
                  <p>{selectedTeam === "A" ? selectedEvent?.teamA.name : selectedTeam === "B" ? selectedEvent?.teamB.name : "None"}</p>
                </div>
              </div>

              {/* Token Balance */}
            

              {/* Bid Section */}
              <div className="mt-4">
                <p className="text-white text-lg font-semibold">Place a Bid</p>
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="p-2 text-black w-full rounded-lg"
                    placeholder="Enter amount to bid"
                  />
                  <span className="ml-4 text-white text-lg">Tokens</span>
                </div>
                <button
                  onClick={handleSubmit}
                  className="mt-2 bg-green-600 hover:bg-green-400 transition-all duration-500 text-white py-2 rounded-lg w-full"
                >
                  Place Bid
                </button>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-red-500 hover:bg-red-400 transition-all duration-500 text-white py-2 rounded-lg w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsEvents: React.FC = () => {
  const [data, setData] = useState<Event[]>([]); // List of ongoing events
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // For team selection (A or B)
  const [amount, setAmount] = useState<string>(""); // Amount to bid
  const [tokenContract, setTokenContract] = useState<any | null>(null); // State for token contract
  const [balance, setBalance] = useState<string>("0"); // User token balance
  const [signer, setSigner] = useState<any | null>(null); // State for the signer

  useEffect(() => {
    setData(eventData);

    const initializeContract = async () => {
      if (window.ethereum && selectedEvent && selectedEvent.tokenAddress) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          if (!userSigner) {
            alert("No signer found. Make sure your wallet is connected.");
            return;
          }

          setSigner(userSigner); // Store signer in state

          const contract = new ethers.Contract(
            selectedEvent.tokenAddress,
            [
              "function transfer(address to, uint amount) public returns (bool)",
              "function balanceOf(address owner) public view returns (uint256)",
            ],
            userSigner
          );

          setTokenContract(contract);

          const userAddress = await userSigner.getAddress();
          const userBalance = await contract.balanceOf(userAddress);
          setBalance(ethers.formatUnits(userBalance, 18)); // Assuming 18 decimals
        } catch (error) {
          console.error("Error initializing contract:", error);
          alert("Failed to initialize the contract. Please check if MetaMask is connected.");
        }
      } else {
        alert("Token address is missing or MetaMask is not available.");
      }
    };

    if (selectedEvent) {
      initializeContract();
    }
  }, [selectedEvent]);

  const handleSubmit = async () => {
    if (selectedTeam && amount && tokenContract && signer) {
      try {
        const amountInWei = ethers.parseUnits(amount, 18); // Convert amount to BigNumber in Wei
        const userAddress = await signer.getAddress();

        const userBalance = await tokenContract.balanceOf(userAddress);
        const userBalanceInWei = ethers.formatUnits(userBalance, 18); // Convert balance to decimal format

        if (parseFloat(userBalanceInWei) < parseFloat(amount)) {
          alert("Insufficient balance in the provided token address.");
          return;
        }

        const tx = await tokenContract.transfer(userAddress, amountInWei); // Deduct tokens (if required by your contract)
        await tx.wait();

        const updatedBalance = await tokenContract.balanceOf(userAddress);
        setBalance(ethers.formatUnits(updatedBalance, 18)); // Update the balance in the UI

        alert(`Bid of ${amount} tokens placed on ${selectedTeam}!`);

        closeModal();
      } catch (error) {
        console.error("Error making transaction:", error);
        alert("Failed to place bid.");
      }
    } else {
      alert("Please select a team and enter a valid amount.");
    }
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="text-white w-full  flex flex-col gap-x-5 mt-8 pb-8">
      {/* Scrollable Cards Container */}
      <div className="overflow-y-auto gap-y-4 max-h-[600px] flex gap-x-5 flex-wrap scrollbar-hidden">
        {data.map((items, index) => (
          <div
         
            key={index}
            className="bg-[#2D2F6F] hover:translate-y-[-5.5px] transition-all duration-200 hover:cursor-pointer w-[31.8%] border border-pink-300 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-x-4 font-serif mt-5">
                <p className="text-slate-400 font-bold pl-4">{items.league}</p>
                <div className="flex gap-x-1 items-center pl-4 text-[20px]">
                  <p>{items.teamA.name}</p> v.
                  <p>{items.teamB.name}</p>
                </div>
              </div>

              <Image src={IPLLogo} alt="" className="pr-2 w-[20%]" />
            </div>

            <div className="flex p-4 w-full gap-x-4 ">
              <div className="bg-[#5334ee] items-center w-[50%]  flex-col gap-y-2 flex justify-center border border-pink-200 rounded-lg">
                <p className="text-[16px]">
                  {items.teamA.symbol} <span className="text-green-400">+0.5</span>
                </p>
                <img
                  src={items.teamA.image}
                  alt={`${items.teamA} Image`}
                  className="object-cover w-[80px] rounded-xl"
                />
                <div className="flex ">
                <div className="flex flex-col ">
                  <p className="text-slate-400 font-semibold">ROI</p>
                  <p className="text-[20px]">1.90</p>
                </div>
                <div className="text-[25px]  ml-9 mt-8 flex items-center">
              <TiPlus />
            </div>
                </div>
              
              </div>
              <div className="bg-[#453982] pt-2  flex-col w-[50%] items-center flex justify-center gap-y-4 border border-pink-200 rounded-lg">
                <p className="text-[16px]">
                  {items.teamB.symbol} <span className="text-red-600">-0.5</span>
                </p>
                <img
                  src={items.teamB.image}
                  alt={`${items.teamB} Image`}
                  className="object-cover w-[80px] flex justify-center rounded-xl"
                />
                <div className="flex flex-col ml-[-50px]">
                  <p className="text-slate-400 font-bold">ROI</p>
                  <p className="text-[20px]">1.90</p>
                  
                </div>
              </div>
            </div>
            <div className="w-[95%] pl-4">
              <Slider />
            </div>

            <div className="pl-4 cursor-pointer mt-4">
              <div className="flex justify-between rounded-lg bg-[#061230] w-[95%] pl-4 items-center">
                <div className="flex flex-col gap-x-2 py-[6px]">
                  <p className="text-slate-400 items-center flex font-bold">Prize Pool</p>
                  <div className="flex gap-x-1 items-center text-[20px]">
                    <p className="font-bold flex items-center">40.0K RBN</p>
                  </div>
                </div>
                <Image src={RobinoLogo} alt="" className="pr-2 w-[48px]" />
              </div>
            </div>

            <div className="h-[1px] ml-[14px] mt-4 w-[90%] bg-slate-400"></div>
            <div className="flex w-full pl-4 justify-between items-center mt-4 mb-4">
              <p className="text-[16px]">
                Rewards Distributed
              </p>
              <div className="pr-5">
              <AiFillThunderbolt />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Unchanged) */}
      {isModalOpen && selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2D2F6F] p-8 w-[610px] rounded-lg">
            {/* Modal content goes here */}
            {/* You can keep the modal structure as is */}
          </div>
        </div>
      )}
    </div>
  );
};

const StakedEvents = () => (
  <div className=" overflow-x-hidden text-white text-[20px] sm:text-[18px] md:text-[22px] lg:text-[24px] flex justify-center items-center">
    You do not have any staked Events
  </div>
);




const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ongoing");
  const [isTokensDropdownOpen, setTokensDropdownOpen] = useState<boolean>(false);
  const [isSportsDropdownOpen, setSportsDropdownOpen] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<string>("All Tokens");
  const [selectedSport, setSelectedSport] = useState<string>("All Sports");

  // Refs for the dropdowns
  const tokensDropdownRef = useRef<HTMLUListElement | null>(null);
  const sportsDropdownRef = useRef<HTMLUListElement | null>(null);
  const tokensButtonRef = useRef<HTMLButtonElement | null>(null);
  const sportsButtonRef = useRef<HTMLButtonElement | null>(null);

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

  // Close dropdowns if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tokensDropdownRef.current &&
        !tokensDropdownRef.current.contains(event.target as Node) &&
        tokensButtonRef.current &&
        !tokensButtonRef.current.contains(event.target as Node)
      ) {
        setTokensDropdownOpen(false);
      }
      if (
        sportsDropdownRef.current &&
        !sportsDropdownRef.current.contains(event.target as Node) &&
        sportsButtonRef.current &&
        !sportsButtonRef.current.contains(event.target as Node)
      ) {
        setSportsDropdownOpen(false);
      }
    };

    // Add event listener for click outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ml-[4%] flex ">
      {/* ----------versus--------- */}
      <div className="mt-[10px]   z-10 w-[80%]  ">
        <h1 className="text-[30px] text-white lg:text-[40px] leading-[40px] mb-[10px] lg:mb-[20px] font-medium">
          Versus
        </h1>
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="items-center justify-center bg rounded-xl text-slate-500 dark:bg-slate-800 dark:text-slate-400  shadow p-[10px] font-medium text-[14px] lg:text-[16px] flex flex-col xl:flex-row gap-[20px]"
          data-orientation="horizontal"
        >
          <div className="flex bg-slate-950 rounded-2xl p-[5px]  xl:w-[60%]">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "ongoing"}
              aria-controls="radix-:R5f6la:-content-ongoing"
              id="radix-:R5f6la:-trigger-ongoing"
              className={`inline-flex items-center justify-center px-[25px] py-4 font-medium transition-all ${
                activeTab === "ongoing"
                  ? "bg-blue-600 text-white rounded-xl"
                  : "text-gray-300"
              }`}
              onClick={() => handleTabClick("ongoing")}
            >
              Ongoing<span className="hidden lg:block">&nbsp;Events</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "results"}
              aria-controls="radix-:R5f6la:-content-results"
              id="radix-:R5f6la:-trigger-results"
              className={`inline-flex items-center justify-center whitespace-nowrap px-[25px] py-4 font-medium transition-all ${
                activeTab === "results"
                  ? "bg-blue-600 text-white rounded-xl"
                  : "text-gray-300"
              }`}
              onClick={() => handleTabClick("results")}
            >
              <span className="hidden lg:block">Events&nbsp;</span>Results
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "staked"}
              aria-controls="radix-:R5f6la:-content-staked"
              id="radix-:R5f6la:-trigger-staked"
              className={`inline-flex items-center justify-center whitespace-nowrap px-[29px] py-4 font-medium transition-all ${
                activeTab === "staked"
                  ? "bg-blue-600 text-white rounded-xl"
                  : "text-gray-300"
              }`}
              onClick={() => handleTabClick("staked")}
            >
              Staked<span className="hidden lg:block">&nbsp;Events</span>
            </button>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-[10px]">
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
                ref={tokensButtonRef}
                onClick={toggleTokensDropdown}
                className="flex  h-[60px] items-center justify-between rounded-[10px] border border-slate-700 text-white px-[10px] xl:px-[20px] w-full"
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
                <ul
                  ref={tokensDropdownRef}
                  className="absolute top-[70px]  bg-slate-900 z-10 text-white border rounded-[10px] w-[50%] p-4 shadow-md"
                >
                  {["All Tokens", "RBN"].map((token) => (
                    <li
                      key={token}
                      className="p-5 hover:bg-white hover:text-black rounded flex justify-center cursor-pointer"
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
                ref={sportsButtonRef}
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
                <ul
                  ref={sportsDropdownRef}
                  className="absolute top-[70px] bg-slate-900 right-0 z-10 border text-white rounded-[10px] w-[50%] p-4 shadow-md"
                >
                  {["All Sports", "Other", "Fifa", "Crypto", "Football"].map((sport) => (
                    <li
                      key={sport}
                      className="p-5 hover:bg-white hover:text-black rounded cursor-pointer flex justify-center"
                      onClick={() => handleSportSelect(sport)}
                    >
                      {sport}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Render the active tab content */}
        <div className="mt-[20px]">
          {activeTab === "ongoing" && <OngoingEvents />}
          {activeTab === "results" && <ResultsEvents />}
          {activeTab === "staked" && <StakedEvents />}
        </div>
      </div>
    </div>
  );
};




export default Main;
