import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Contract, ethers } from "ethers";
import {contractAddress, abi} from "../constants.js";
import dynamic from 'next/dynamic'

const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)
export default function Home(){
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

  const data = [
    {
        url: "/assets/images/orange-cube.jpg",
        param: "handleMint('https://gateway.pinata.cloud/ipfs/QmdEnRT7LtW2NQmjoNvwbojxKeekbgpmJrc7mEegoAaojy')",
    },
    {
      url: "/assets/images/happy-cube.jpg",
        param: "handleMint('https://gateway.pinata.cloud/ipfs/QmdEnRT7LtW2NQmjoNvwbojxKeekbgpmJrc7mEegoAaojy')",
    },
    {
      url: "/assets/images/glass-cube.jpg",
        param: "handleMint('https://gateway.pinata.cloud/ipfs/QmXPBYNrB41pkQ1Z1PfU7i9p95fep7r1VhZNZtYdDvGt4r')",
    },
  ];  

  const handleMint = async (tokenURI) => {
    setIsMinting(true)
    try {
      const options = {value: ethers.utils.parseEther("0.01")}
      const Response = await NFTcontract.mintNFT(tokenURI, options)
      console.log("Received: ", response)
    } catch (error) {
      console.log(error)
    }
    finally{
      setIsMinting(false)
    }
  }

  return (
    <div className="">
      <Head>
        <title>Cubes</title>
        <meta name="cubes nft" description="cubes nft project"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <h1 className='text-center text-2xl'>Buy cubes nft</h1>
      <h4 className='text-center text-sm'>**contract deployed on rinkeby network</h4>
      <section className='flex flex-col md:flex-row w-9/12 md:w-11/12 mx-auto justify-evenly'>
        {
          data.map((nft, index) => { 
            return(
              <article  key={index} className='p-4 flex flex-col items-center m-4 bg-sky-200 rounded-md shadow-md'>
                <img
                src={nft.url}
                className='h-36 w-58 rounded-md shadow-md'
                />
                <button
                className="p-2 m-2 w-full bg-sky-300 rounded-lg shadow"
                onClick={() => {
                    eval(nft.param);
                }}
                >
                  Mint
                </button>
              </article>
            )
          })
        }
      </section>
    </div>
  )
}

