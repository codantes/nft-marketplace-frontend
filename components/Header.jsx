import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import {contractAddress, abi} from "../constants.js";


function Header() {
    const [account, setAccount] = useState(null)
  const [isWalletInstalled, setWalletInstalled] = useState(false)
  const [NFTcontract, setNFTContract] = useState(null)
  const [isMinting, setIsMinting] = useState(false)

  useEffect(()=> {
    if(window.ethereum){
      setWalletInstalled(true)
    }
  }, [] )

  useEffect(()=>{
    const initNFTContract = () => {
        //const provider = new ethers.providers.Web3Provider(window.ethereum); 
        const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
        setNFTContract(new Contract(contractAddress, abi ,signer))   
    }
    initNFTContract();
  }, [account])

  const connectWallet = async () => {
    window.ethereum
			.request({
				method: "eth_requestAccounts",
			})
			.then((accounts) => {
				setAccount(accounts[0]);
			})
			.catch((error) => {
				alert("Something went wrong");
			});
  }

  return (
    <nav className="p-4 bg-sky-100 text-center w-full shadow-md">
        <h1 className="text-4xl font-bold">Cubes</h1>
        {(account === null) ? (
            isWalletInstalled ? (
                <button 
                onClick={connectWallet}
                className="p-2 m-2 bg-sky-200 rounded-lg shadow"
                >
                    Connect Wallet
                </button>
              ) : (
                <button className="p-2 m-2 bg-sky-200 rounded-lg shadow">
                    Install Metamask wallet
                </button>
              )
            ):
            (
                <button className="p-2 m-2 bg-sky-200 rounded-lg shadow">
                    Connected as: {account}
                </button>
            )
        }
    </nav>
  )
}

export default Header