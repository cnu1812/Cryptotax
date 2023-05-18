import React, { useState, useEffect } from 'react'
import { formatEther } from "ethers"
import Navbar from '../components/Navbar'
import Breadcrumb from '../components/Breadcrumb'

function Connect(){
    const [errorMessage, setErrorMessage] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [chain, setChain] = useState(null);
    const [network, setNetwork] = useState(null);
    const [currency, setCurrency] = useState(null);
  
    useEffect(() => {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", accountsChanged);
        window.ethereum.on("chainChanged", chainChanged);
      }
    }, []);
  
    const connectHandler = async () => {
      if (window.ethereum) {
        try {
          const res = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await accountsChanged(res[0]);
        } catch (err) {
          console.error(err);
          setErrorMessage("There was a problem connecting to MetaMask");
        }
      } else {
        setErrorMessage("Install MetaMask");
      }
    };
  
    const accountsChanged = async (newAccount) => {
      setAccount(newAccount);
      try {
        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [newAccount.toString(), "latest"],
        });
        setBalance(formatEther(balance));
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });
        setChain(chainId)
        switch (chainId) {
            case '0xaa36a7':
                setNetwork('Sepolia test network');
                setCurrency('SepoliaETH');
                break;
            case '0x5':
                setNetwork('Goerli test network');
                setCurrency('GoerliETH');
                break;
            default:
                setNetwork(null);
                setCurrency(null);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("There was a problem connecting to MetaMask");
      }
    };
  
    const chainChanged = () => {
      setErrorMessage(null);
      setAccount(null);
      setBalance(null);
      setChain(null);
      setNetwork(null);
      setCurrency(null);
    };


    return(
        <>
            <Navbar />
            <main className="text-neutral-800 mt-11 max-h-screen font-paragraph">
                <section className="container mx-auto grid grid-cols-2">
                    <section className="space-y-8">
                        <Breadcrumb />
                        <h1 className="text-4xl font-bold">Visualize and export your <br />crypto tax reports quickly</h1>
                        <form className="w-1/2 flex flex-col gap-3">
                            <label htmlFor="location-select" className="after:content-['*'] after:text-red-500">Location </label>
                            <div>
                                <select id="location-select" className="w-full px-2 py-3 bg-neutral-200 rounded-md after:">
                                    <option value="">Select your country</option>
                                    <option value="india">India</option>
                                    <option value="brazil">Brazil</option>
                                </select>
                            </div>
                            <button
                                    type='button'
                                    onClick={connectHandler} 
                                    className="block bg-teal-500 text-center text-neutral-50 text-sm font-medium font-title uppercase p-3 rounded-md">
                                        Connect your wallet
                            </button>
                        </form>
                    </section>
                    <section className="bg-neutral-200 grid place-items-center">
                        <div className="text-center text-neutral-400 font-semibold">img here</div>
                    </section>
                </section>
                <p>Account: {account}</p>
                <p>Balance: {balance} {currency}</p>
                <p>Chain ID: {chain}</p>
                <p>Network: {network}</p>
                {errorMessage ? (
                    <p>Error: {errorMessage}</p>
                ) : null}
            </main>
        </>
        
    );
}

export default Connect;