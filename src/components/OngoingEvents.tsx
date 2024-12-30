import React, { useEffect, useState } from 'react';
import eventData from "../../events.json";
import { ethers } from 'ethers';

interface Team {
  name: string;
  img: string;
  symbol: string;
}

interface Event {
  eventCode: string;
  league: string;
  teamA: Team;
  teamB: Team;
  tokenAddress?: string;
  saleEnds: string;
}

const OngoingEvents: React.FC = () => {
  const [data, setData] = useState<Event[]>([]); // List of ongoing events
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // For team selection (A or B)
  const [amount, setAmount] = useState<string>(''); // Amount to bid
  const [tokenContract, setTokenContract] = useState<any | null>(null);  // State for token contract
  const [balance, setBalance] = useState<string>('0');  // User token balance
  const [signer, setSigner] = useState<any | null>(null);  // State for the signer

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
            alert('No signer found. Make sure your wallet is connected.');
            return;
          }

          setSigner(userSigner); // Store signer in state

          // Initialize contract only if tokenAddress is available
          const contract = new ethers.Contract(selectedEvent.tokenAddress, [
            'function transfer(address to, uint amount) public returns (bool)',
            'function balanceOf(address owner) public view returns (uint256)',
          ], userSigner);

          setTokenContract(contract);
          
          // Fetch the user's token balance
          const userAddress = await userSigner.getAddress();
          const userBalance = await contract.balanceOf(userAddress);
          setBalance(ethers.formatUnits(userBalance, 18));  // Assuming 18 decimals

        } catch (error) {
          console.error("Error initializing contract:", error);
          alert("Failed to initialize the contract. Please check if MetaMask is connected.");
        }
      } else {
        alert('Token address is missing or MetaMask is not available.');
      }
    };

    if (selectedEvent) {
      initializeContract();
    }
  }, [selectedEvent]); // Dependency on selectedEvent to initialize contract and fetch balance

  const handleSubmit = async () => {
    if (selectedTeam && amount && tokenContract && signer) {
      try {
        const amountInWei = ethers.parseUnits(amount, 18);  // Convert amount to BigNumber in Wei
        const userAddress = await signer.getAddress();  // Get the user's address from the signer

        // Fetch the user's current token balance
        const userBalance = await tokenContract.balanceOf(userAddress);
        const userBalanceInWei = ethers.formatUnits(userBalance, 18);  // Convert balance to decimal format

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
        setBalance(ethers.formatUnits(updatedBalance, 18));  // Update the balance in the UI

        // Show success message
        alert(`Bid of ${amount} tokens placed on ${selectedTeam}!`);
        
        // Close the modal after success
        closeModal();
      } catch (error) {
        console.error('Error making transaction:', error);
        alert('Failed to place bid.');
      }
    } else {
      alert('Please select a team and enter a valid amount.');
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
    setSelectedEvent(null);  // Reset selected event when closing the modal
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
    <div className="text-white ml-[105px] flex gap-x-5 mt-8">
      {data.map((items, index) => (
        <div key={index} className="bg-[#2D2F6F] w-[500px] border border-pink-400 rounded-lg">
          <p className="text-slate-400 font-bold pl-4">{items.league}</p>
          <div className="flex gap-x-2 text-[20px] pl-4 font-serif mt-5">
            <p>{items.teamA.name}</p> v.
            <p>{items.teamB.name}</p>
          </div>
          <div className="flex gap-x-4 pl-4 mt-4">
            <div className="bg-[#453982] w-[180px] flex justify-center text-[50px] border border-pink-200 rounded-lg">
              {items.teamA.symbol}
            </div>
            <div className="bg-[#453982] w-[180px] text-[50px] flex justify-center border border-pink-200 rounded-lg">
              {items.teamB.symbol}
            </div>
          </div>
          
          <p className="text-[20px] font-sans pl-4 mt-4">League End at {items.saleEnds}</p>
          <button
            className="border border-green-300 mb-4 rounded-lg bg-[#825779] transition-all duration-500 hover:bg-green-500 px-6 text-[20px] flex justify-center mx-auto mt-4"
            onClick={() => openModal(items)}
          >
            Prize Pool
          </button>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#2D2F6F] p-8 w-[600px] rounded-lg">
            <h2 className="text-white text-2xl font-bold mb-4">Bid on a Team</h2>
            <h1 className='text-white font-semibold text-xl mb-3'>Select Team</h1> 
            
            {/* Team Cards for Bid Selection */}
            <div className="flex justify-between mb-4">
              <div
                className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${selectedTeam === selectedEvent.teamA.name ? 'border-green-500' : 'border-gray-300'} transition-all hover:border-green-500`}
                onClick={() => handleTeamChange(selectedEvent.teamA.name)}
              >
                <div className="text-4xl">{selectedEvent.teamA.symbol}</div>
                <p className="text-white mt-2">{selectedEvent.teamA.name}</p>
              </div>

              <div
                className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${selectedTeam === selectedEvent.teamB.name ? 'border-green-500' : 'border-gray-300'} transition-all hover:border-green-500`}
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
                  {selectedTeam === selectedEvent.teamA.name ? selectedEvent.teamA.symbol : selectedEvent.teamB.symbol}
                </div>
                <p className="text-white text-xl">
                  {selectedTeam} <span className="text-green-500">✔</span>
                </p>
              </div>
            )}

            {/* Show Amount Input only if a team is selected */}
            {selectedTeam && (
              <div className="mb-4">
                <p className="text-white text-xl mb-2">Enter your  Amount</p>
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

export default OngoingEvents;
