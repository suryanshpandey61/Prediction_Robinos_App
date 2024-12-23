import React, { useEffect, useState } from 'react';
import eventData from "../../events.json";

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
  saleStart: string;
  saleEnds: string;
}

const OngoingEvents: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    setData(eventData);
  }, []);

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    setSelectedWinner(null); // Reset winner selection when opening modal
    setAmount(''); // Reset amount input
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedWinner(null);
    setAmount('');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the input value is a valid positive number
    if (parseFloat(value) >= 0 || value === "") {
      setAmount(value); // Set the amount if it's valid (positive or empty)
    }
  };

  const handleWinnerChange = (winner: string) => {
    setSelectedWinner(winner);
  };

  const handleSubmit = () => {
    if (selectedWinner && amount) {
      alert(`You selected ${selectedWinner} as the winner with a wager of ${amount}`);
      // You can add further logic to handle the submission of this data
    } else {
      alert('Please select a winner and enter a valid amount.');
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet.");
      }
    } else {
      alert("Please install MetaMask or an Ethereum-compatible browser wallet.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsWalletConnected(false);
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
          <p className="text-[20px] font-sans pl-4 mt-4">League Starts at {items.saleStart}</p>
          <p className="text-[20px] font-sans pl-4 mt-4">League Ends at {items.saleEnds}</p>
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
            <h2 className="text-white text-2xl font-bold mb-4">Prize Pool Information</h2>
            <p className="text-white text-xl mb-4">Event Code: {selectedEvent.eventCode}</p>
            <p className="text-white text-xl mb-4">League: {selectedEvent.league}</p>
            <p className="text-white text-xl mb-4">Teams: {selectedEvent.teamA.name} vs {selectedEvent.teamB.name}</p>
            <p className="text-white text-xl mb-4">Sale Start: {selectedEvent.saleStart}</p>
            <p className="text-white text-xl mb-4">Sale End: {selectedEvent.saleEnds}</p>

            {/* Team Cards for Winner Selection */}
            {selectedWinner && (
              <div className="flex justify-between mb-4">
                {/* Team A Card */}
                <div
                  className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${selectedWinner === selectedEvent.teamA.name ? 'border-green-500' : 'border-gray-300'} transition-all hover:border-green-500`}
                  onClick={() => handleWinnerChange(selectedEvent.teamA.name)}
                >
                  <div className="text-4xl">{selectedEvent.teamA.symbol}</div>
                  <p className="text-white mt-2">{selectedEvent.teamA.name}</p>
                </div>

                {/* Team B Card */}
                <div
                  className={`w-[250px] p-4 text-center rounded-lg cursor-pointer border-2 ${selectedWinner === selectedEvent.teamB.name ? 'border-green-500' : 'border-gray-300'} transition-all hover:border-green-500`}
                  onClick={() => handleWinnerChange(selectedEvent.teamB.name)}
                >
                  <div className="text-4xl">{selectedEvent.teamB.symbol}</div>
                  <p className="text-white mt-2">{selectedEvent.teamB.name}</p>
                </div>
              </div>
            )}

            {/* Preview Card (Selected Team) */}
            {selectedWinner && (
              <div className="mt-4 bg-[#453982] p-4 rounded-lg flex justify-between items-center">
                <div className="text-3xl">{selectedWinner === selectedEvent.teamA.name ? selectedEvent.teamA.symbol : selectedEvent.teamB.symbol}</div>
                <p className="text-white text-xl">{selectedWinner} <span className="text-green-500">✔</span></p>
              </div>
            )}

            {/* Show Amount Input only if a winner is selected */}
            {selectedWinner && (
              <div className="mb-4">
                <p className="text-white text-xl mb-2">Enter Amount</p>
                <input
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="bg-[#453982] border border-pink-200 text-white px-4 py-2 rounded-lg w-full"
                />
              </div>
            )}

            {/* Show Connect Wallet Button only after Amount has been entered */}
            {amount && !isWalletConnected && (
              <div className="flex justify-center mb-4">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            )}

            {/* Submit Button after Wallet is Connected */}
            {amount && isWalletConnected && (
              <div className="mt-4 flex justify-center gap-x-4">
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Disable Submit Button if No Wallet or No Amount */}
            {amount && !isWalletConnected && (
              <div className="mt-4 text-center text-white">
                <p className="text-red-500">Please connect wallet before submitting.</p>
              </div>
            )}

            <div className="mt-4 flex justify-center gap-x-4">
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OngoingEvents;
