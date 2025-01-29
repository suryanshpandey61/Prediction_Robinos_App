import React, { useState, useEffect, useRef } from "react";
import metamaskLogo from "../assets/metamask.png";
import coinbase from "../assets/coinbase.png";
import rainbow from "../assets/rainbow.png";
import telosLogo from "../assets/telosLogo.png"; // Example logo for Telos network
import taikoLogo from "../assets/taikoLogo.png"; // Example logo for Taiko network
import mantleLogo from "../assets/mantleLogo.png"; // Example logo for Mantle network
import dollarIcon from "../assets/usdm.png";
import RBNLogo from "../assets/token_40px.png"; // Dollar symbol icon for currency
import Image from "next/image";

function Navbar() {
  const [network, setNetwork] = useState<string>("Telos");
  const [currency, setCurrency] = useState<string>("USDM");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [currencyDropdownVisible, setCurrencyDropdownVisible] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [installedWallets, setInstalledWallets] = useState<{
    [key: string]: boolean;
  }>({
    MetaMask: false,
    Rainbow: false,
    Coinbase: false,
    WalletConnect: false,
  });
  const [account, setAccount] = useState<string | null>(null);

  const networks = [
    { name: "Telos", logo: telosLogo },
    { name: "Taiko", logo: taikoLogo },
    { name: "Mantle", logo: mantleLogo },
  ];

  const currencies = [
    { name: "USDM", logo: dollarIcon },
    { name: "RBN", logo: RBNLogo }, // Update this line to use RBNLogo
  ];

  const wallets = [
    {
      name: "MetaMask",
      logo: metamaskLogo,
      installUrl: "https://metamask.io/",
    },
    { name: "Rainbow", logo: rainbow, installUrl: "https://rainbow.me/" },
    {
      name: "Coinbase",
      logo: coinbase,
      installUrl: "https://www.coinbase.com",
    },
  ];

  // Define the refs with appropriate type
  const networkDropdownRef = useRef<HTMLDivElement | null>(null);
  const currencyDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const detectWallets = () => {
        setInstalledWallets({
          MetaMask: !!window.ethereum && !!window.ethereum.isMetaMask,
          Rainbow: !!window.ethereum && !!window.ethereum.isRainbow,
          Coinbase: !!window.ethereum && !!window.ethereum.isCoinbaseWallet,
        });
      };

      detectWallets();

      if (window.ethereum && window.ethereum.isMetaMask) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
            }
          })
          .catch((error: any) => {
            console.error("Error fetching accounts:", error);
          });
      }
    }
  }, []);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        networkDropdownRef.current &&
        !networkDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }

      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWalletSelection = (walletName: string): void => {
    const wallet = wallets.find((w) => w.name === walletName);

    if (!wallet) return;

    if (installedWallets[walletName]) {
      switch (walletName) {
        case "MetaMask":
          if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
              ?.request({ method: "eth_requestAccounts" })
              .then((accounts: string[]) => {
                setAccount(accounts[0]);
              })
              .catch((error: any) => {
                console.error("Error connecting to MetaMask:", error);
              });
          }
          break;

        case "Rainbow":
          if (window.ethereum && window.ethereum.isRainbow) {
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then((accounts: string[]) => {
                setAccount(accounts[0]);
              })
              .catch((error: any) => {
                console.error("Error connecting to Rainbow:", error);
              });
          }
          break;

        case "Coinbase":
          if (window.ethereum && window.ethereum.isCoinbaseWallet) {
            window.ethereum
              .request({ method: "eth_requestAccounts" })
              .then((accounts: string[]) => {
                setAccount(accounts[0]);
              })
              .catch((error: any) => {
                console.error("Error connecting to Coinbase Wallet:", error);
              });
          }
          break;

        default:
          console.error("Wallet connection logic not implemented.");
          break;
      }
    } else {
      window.open(wallet.installUrl, "_blank");
    }
  };

  const handleNetworkChange = (newNetwork: string): void => {
    setNetwork(newNetwork);
    setDropdownVisible(false);
  };

  const handleCurrencyChange = (newCurrency: string): void => {
    setCurrency(newCurrency);
    setCurrencyDropdownVisible(false);
  };

  const toggleDropdown = (): void => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleCurrencyDropdown = (): void => {
    setCurrencyDropdownVisible((prev) => !prev);
  };

  const toggleModal = (): void => {
    setIsModalOpen((prev) => !prev);
  };

  const handleDisconnect = () => {
    setAccount(null);
  };

  const buttonStyle = account
    ? "border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500"
    : "";

  return (
    <div className="w-[100vw]  ">
      {/* Navbar */}
      <div className="flex bg-[#061230] mt-[1%] justify-items-end ml-[37%]  border w-[35%]  border-pink-600 rounded-lg p-2 gap-x-3  ">
        {/* Network Button with Dropdown */}
        <div className="relative mt-0 " ref={networkDropdownRef}>
          <button
            type="button"
            className="flex  bg-[#192249] px-2 py-1 justify-center items-center text-white rounded-md"
            onClick={toggleDropdown}
          >
            <span className="flex gap-x-3">
              <Image
                src={networks.find((net) => net.name === network)?.logo || ""}
                alt={network}
                width={20}
                height={20}
              />
              {network}
              <span
                className={`ml-2 transform transition duration-300 ${
                  dropdownVisible ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
              <span>0.000 </span>
            </span>
          </button>

          {dropdownVisible && (
            <div className="absolute top-[45px] left-0 bg-[#192249] text-white rounded-lg shadow-lg w-[100%] z-50">
              {networks.map((net) => (
                <div
                  key={net.name}
                  className="px-6  py-2 hover:bg-blue-600 rounded-xl cursor-pointer"
                  onClick={() => handleNetworkChange(net.name)}
                >
                  <div className="flex items-center">
                    <Image src={net.logo} alt={net.name} width={20} height={20} />
                    <span className="ml-3">{net.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Currency Dropdown */}
        <div ref={currencyDropdownRef}>
          <div className="flex items-center justify-center relative">
            <button
              type="button"
              className="flex  bg-[#192249] px-2 py-1  justify-center items-center text-white rounded-md"
              onClick={toggleCurrencyDropdown}
            >
              <span className="flex  items-center gap-x-2">
                {currency === "USDM" && (
                  <Image src={dollarIcon} alt="Dollar" width={20} height={20} />
                )}
                {currency === "RBN" && (
                  <Image src={RBNLogo} alt="RBN Logo" width={20} height={20} />
                )}
                {currency} <span>0.000</span>
              </span>
              <span
                className={`ml-2 transform transition duration-300 ${
                  currencyDropdownVisible ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {currencyDropdownVisible && (
              <div className="absolute top-[45px] left-0 bg-[#192249] text-white rounded-lg shadow-lg w-[100%] z-50">
                {currencies.map((curr) => (
                  <div
                    key={curr.name}
                    className="px-6 py-2 hover:bg-blue-600 rounded-xl cursor-pointer"
                    onClick={() => handleCurrencyChange(curr.name)}
                  >
                    <div className="flex items-center">
                      {curr.name === "USDM" && (
                        <Image src={curr.logo} alt={curr.name} width={20} height={20} />
                      )}
                      {curr.name === "RBN" && (
                        <Image src={curr.logo} alt={curr.name} width={20} height={20} />
                      )}
                      <span className="ml-3">{curr.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Wallet Connect Button */}
        <div className="text-slate-400 cursor-pointer w-[30%] text-[18px]" onClick={toggleModal}>
          <div className="flex items-center justify-center ">
            <span className="flex rounded-md text-[14px] p-1 gap-x-1  items-center justify-center">
              {account
                ? `${account.slice(0, 6)}...${account.slice(-4)}`
                : "Connect wallet"}
              <Image src={RBNLogo} alt="RBNLOGO" height={25} />
            </span>
          </div>
        </div>
      </div>

      {/* Modal for wallet selection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-slate-900 text-white rounded-lg p-6 w-[350px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Connect Wallet</h2>
              <button
                className="text-gray-400 hover:text-gray-200"
                onClick={toggleModal}
              >
                ✕
              </button>
            </div>
            <div className="grid gap-4">
              {wallets.map((wallet) => (
                <div
                  key={wallet.name}
                  className="flex items-center p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 cursor-pointer"
                  onClick={() => handleWalletSelection(wallet.name)}
                >
                  <Image
                    src={wallet.logo}
                    alt={wallet.name}
                    className="w-12 h-12 mr-4 rounded-lg"
                  />
                  <div>
                    <span className="text-sm block">{wallet.name}</span>
                    {installedWallets[wallet.name] ? (
                      <span className="text-green-400 text-xs">Installed</span>
                    ) : (
                      <span className="text-blue-400 text-xs underline">
                        Install
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show Disconnect button if MetaMask is connected */}
            {account && window.ethereum && window.ethereum.isMetaMask && (
              <div
                className="mt-4 hover:text-white text-red-500 bg-slate-800 px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                onClick={handleDisconnect}
              >
                Disconnect MetaMask
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
