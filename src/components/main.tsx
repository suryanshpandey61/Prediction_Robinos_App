
import React, { useEffect, useState } from "react";
import eventData from "../../events.json";
import { ethers } from "ethers";
import RobinoLogo from "../assets/token_40px.png";
import Image from "next/image";
import Slider from "./Slider";
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

    // Function to initialize the contract asynchronously
    const initializeContract = async () => {
      if (window.ethereum && selectedEvent && selectedEvent.tokenAddress) {
        try {
          // Initialize provider and signer
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          if (!userSigner) {
            alert("No signer found. Make sure your wallet is connected.");
            return;
          }

          setSigner(userSigner); // Store signer in state

          // Initialize contract only if tokenAddress is available
          const contract = new ethers.Contract(
            selectedEvent.tokenAddress,
            [
              "function transfer(address to, uint amount) public returns (bool)",
              "function balanceOf(address owner) public view returns (uint256)",
            ],
            userSigner
          );

          setTokenContract(contract);

          // Fetch the user's token balance
          const userAddress = await userSigner.getAddress();
          const userBalance = await contract.balanceOf(userAddress);
          setBalance(ethers.formatUnits(userBalance, 18)); // Assuming 18 decimals
        } catch (error) {
          console.error("Error initializing contract:", error);
          alert(
            "Failed to initialize the contract. Please check if MetaMask is connected."
          );
        }
      } else {
        alert("Token address is missing or MetaMask is not available.");
      }
    };

    if (selectedEvent) {
      initializeContract();
    }
  }, [selectedEvent]); // Dependency on selectedEvent to initialize contract and fetch balance

  const handleSubmit = async () => {
    if (selectedTeam && amount && tokenContract && signer) {
      try {
        const amountInWei = ethers.parseUnits(amount, 18); // Convert amount to BigNumber in Wei
        const userAddress = await signer.getAddress(); // Get the user's address from the signer

        // Fetch the user's current token balance
        const userBalance = await tokenContract.balanceOf(userAddress);
        const userBalanceInWei = ethers.formatUnits(userBalance, 18); // Convert balance to decimal format

        // Check if the user has enough balance
        if (parseFloat(userBalanceInWei) < parseFloat(amount)) {
          alert("Insufficient balance in the provided token address.");
          return;
        }

        // Deduct the amount from the user's balance
        const tx = await tokenContract.transfer(userAddress, amountInWei); // Deduct tokens (if required by your contract)

        // Wait for the transaction to be mined
        await tx.wait();

        // After the transaction is successful, update the user's token balance
        const updatedBalance = await tokenContract.balanceOf(userAddress);
        setBalance(ethers.formatUnits(updatedBalance, 18)); // Update the balance in the UI

        // Show success message
        alert(`Bid of ${amount} tokens placed on ${selectedTeam}!`);

        // Close the modal after success
        closeModal();
      } catch (error) {
        console.error("Error making transaction:", error);
        alert("Failed to place bid.");
      }
    } else {
      alert("Please select a team and enter a valid amount.");
    }
  };

  // Open the modal and set the selected event
  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Reset selected event when closing the modal
  };

  // Handle team selection for bidding
  const handleTeamChange = (team: string) => {
    setSelectedTeam(team);
  };

  // Handle amount input change
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  return (
    <div className="text-white  flex gap-x-5 mt-8 pb-8">
      {data.map((items, index) => (
        <div
          key={index}
          className="bg-[#2D2F6F] w-[315px] border border-pink-300 rounded-lg"
        >
          <div className="flex justify-between  items-center">
            <div className="flex flex-col gap-x-2 font-serif mt-5">
              <p className="text-slate-400  font-bold pl-4">{items.league}</p>
              <div className="flex gap-x-1 items-center pl-4 text-[20px] ">
                <p className=""> {items.teamA.name}</p> v.
                <p>{items.teamB.name}</p>
              </div>
            </div>

            <Image src={RobinoLogo} alt="" className="pr-2 w-[48px]" />
          </div>

          <div className="flex p-4 gap-x-4 mt-4">
            <div className="bg-[#453982] items-center p-4 flex-col w-[180px] gap-y-4 flex justify-center  border border-pink-200 rounded-lg">
              <p className="text-[20px] font-semibold">
                {" "}
                {items.teamA.symbol}{" "}
                <span className="text-green-400">+0.5</span>
              </p>
              <img
                src={items.teamA.image}
                alt={`${items.teamA} Image`}
                className="object-cover w-[80px] rounded-xl"
              />
              <div className="flex  flex-col ml-[-70px]">
                <p className="text-slate-400 font-bold">ROI</p>
                <p className="text-[20px]">1.90</p>
              </div>
            </div>
            <div className="bg-[#453982] p-4 flex-col w-[180px] items-center  flex justify-center gap-y-4 border border-pink-200 rounded-lg">
              <p className="text-[20px] font-semibold">
                {items.teamB.symbol} <span className="text-red-600">-0.5</span>
              </p>
              <img
                src={items.teamB.image}
                alt={`${items.teamB} Image`}
                className="object-cover w-[80px] flex justify-center rounded-xl"
              />
              <div className="flex  flex-col ml-[-50px] ">
                <p className="text-slate-400 font-bold">ROI</p>
                <p className="text-[20px]">1.90</p>
              </div>
            </div>
          </div>
          <div className="pl-4">
            <Slider />
          </div>

          <div className="pl-4 cursor-pointer mt-4" onClick={()=>openModal(items)}>
          <div className="flex justify-between  rounded-lg bg-[#061230] w-[280px] pl-4  items-center">
            <div className="flex flex-col gap-x-2  py-[6px]">
              <p className="text-slate-400  items-center flex font-bold ">Prize Pool</p>
              <div className="flex gap-x-1 items-center text-[20px] ">
                <p className="font-bold flex items-center">40.0K RBN </p>
               
              </div>
            </div> <Image src={RobinoLogo} alt="" className="pr-2 w-[48px]" />
          </div>

           
          </div>
          {/* <button
            className="border border-green-300 mb-4 rounded-lg bg-[#825779] transition-all duration-500 hover:bg-green-500 px-6 text-[20px] flex justify-center mx-auto mt-4"
            onClick={() => openModal(items)}
          >
            Prize Pool
          </button> */}
          <div className="h-[1px] ml-[14px] mt-4 w-[285px] bg-slate-400"></div>
         <div className="flex w-[300px] pl-4 justify-between items-center mt-4 mb-4">
         <p className="text-[16px] ">
            Sale End at <span className="font-semibold"> {items.saleEnds}</span> 
          </p><SlCalender />

         </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2D2F6F] p-8 w-[600px] rounded-lg">
            <h2 className="text-white text-2xl font-bold mb-4">
              Bid on a Team
            </h2>
            <h1 className="text-white font-semibold text-xl mb-3">
              Select Team
            </h1>

            {/* Team Cards for Bid Selection */}
            <div className="flex justify-between mb-4">
              <div
                className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${
                  selectedTeam === selectedEvent.teamA.name
                    ? "border-green-500"
                    : "border-gray-300"
                } transition-all hover:border-green-500`}
                onClick={() => handleTeamChange(selectedEvent.teamA.name)}
              >
                <div className="text-4xl">{selectedEvent.teamA.symbol}</div>
                <p className="text-white mt-2">{selectedEvent.teamA.name}</p>
              </div>

              <div
                className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${
                  selectedTeam === selectedEvent.teamB.name
                    ? "border-green-500"
                    : "border-gray-300"
                } transition-all hover:border-green-500`}
                onClick={() => handleTeamChange(selectedEvent.teamB.name)}
              >
                <div className="text-4xl">{selectedEvent.teamB.symbol}</div>
                <p className="text-white mt-2">{selectedEvent.teamB.name}</p>
              </div>
            </div>

            {/* Preview Card (Selected Team) */}
            {selectedTeam && (
              <div className="mt-4 bg-[#453982] p-4 rounded-lg flex justify-between items-center">
                <div className="text-3xl">
                  {selectedTeam === selectedEvent.teamA.name
                    ? selectedEvent.teamA.symbol
                    : selectedEvent.teamB.symbol}
                </div>
                <p className="text-white text-xl">
                  {selectedTeam} <span className="text-green-500">✔</span>
                </p>
              </div>
            )}

            {/* Show Amount Input only if a team is selected */}
            {selectedTeam && (
              <div className="mb-4">
                <p className="text-white text-xl mb-2">Enter Amount for Bid </p>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full p-2 rounded-lg border-2 border-pink-300 text-black"
                  placeholder="Amount"
                />
              </div>
            )}

            {/* Display Token Balance */}
            <div className="mb-4">
              <p className="text-white text-xl mb-2">Your Token Balance</p>
              <p className="text-white">{balance} Tokens</p>
            </div>

            <div className="flex justify-between gap-5">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-700"
              >
                Close
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const ResultsEvents = () => (
  <div className="p-4 bg-slate-800 text-white rounded-xl">Results Events Content</div>
);

const StakedEvents = () => (
  <div className="p-4 bg-slate-800 text-white rounded-xl">Staked Events Content</div>
);

const Main: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("ongoing");
  const [isTokensDropdownOpen, setTokensDropdownOpen] = useState<boolean>(false);
  const [isSportsDropdownOpen, setSportsDropdownOpen] = useState<boolean>(false);
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

  return (
    <div>
      {/* ----------versus--------- */}
      <div className="mt-[10px] ml-[100px] z-10 w-[1050px]">
        <h1 className="text-[30px] text-white lg:text-[40px] leading-[40px] mb-[10px] lg:mb-[20px] font-medium">
          Versus
        </h1>
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="items-center justify-center bg rounded-xl text-slate-500 dark:bg-slate-800 dark:text-slate-400 bg-gradient shadow p-[10px] font-medium text-[14px] lg:text-[16px] flex flex-col xl:flex-row gap-[10px]"
          data-orientation="horizontal"
        >
          <div className="flex bg-slate-950 rounded-2xl p-[5px] w-full xl:w-[60%]">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "ongoing"}
              aria-controls="radix-:R5f6la:-content-ongoing"
              id="radix-:R5f6la:-trigger-ongoing"
              className={`inline-flex items-center justify-center p-[15px] font-medium transition-all ${
                activeTab === "ongoing"
                  ? "bg-blue-600 text-white  rounded-xl"
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
              className={`inline-flex items-center justify-center whitespace-nowrap px-[20px] font-medium transition-all ${
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
              className={`inline-flex items-center justify-center whitespace-nowrap px-[20px] font-medium transition-all ${
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
                <ul className="absolute top-[70px] z-10 bg-slate-800 text-white rounded-[10px] w-[180px] p-2 shadow-md">
                  {["All Tokens", "RBN"].map((token) => (
                    <li
                      key={token}
                      className="p-2 hover:bg-slate-700 rounded cursor-pointer"
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
                <ul className="absolute top-[70px] left-[195px] z-10 bg-slate-800 text-white rounded-[10px] w-[180px] p-2 shadow-md">
                  {["All Sports", "Other", "F!", "Crypto", "Football"].map((sport) => (
                    <li
                      key={sport}
                      className="p-2 hover:bg-slate-700 rounded cursor-pointer"
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
