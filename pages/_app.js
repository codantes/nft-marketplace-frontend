import '../styles/globals.css'
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null)
  const [isWalletInstalled, setWalletInstalled] = useState(false)
  const [NFTcontract, setNFTContract] = useState(null)
  const [isMinting, setIsMinting] = useState(false)

  useEffect(()=> {
    if(window.ethereum){
      setWalletInstalled(true)
    }
  }, [] )

  return <Component {...pageProps} />
}

export default MyApp
