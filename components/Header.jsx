import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import {contractAddress, abi} from "../constants.js";
import {useEthers} from '@usedapp/core'

function Header() {

  const { account, activateBrowserWallet, deactivate, chainId } = useEthers()

  console.log(account)
  return (
    <nav className="flex items-center justify-between px-20 p-4 bg-sky-100 text-center w-full shadow-md">
        <h1 className="text-4xl font-bold">Cubes</h1>
        {(!account) ? (
            <button 
            onClick={() => activateBrowserWallet()}
            className="p-2 m-2 bg-sky-200 rounded-lg shadow"
            >
                Connect Wallet
            </button>
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