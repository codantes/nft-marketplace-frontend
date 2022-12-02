import '../styles/globals.css'
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { ChainId, DAppProvider,Mainnet, MetamaskConnector, } from "@usedapp/core"

function MyApp({ Component, pageProps }) {

  return (
    <DAppProvider config={{
    readOnlyChainId: Mainnet.chainId,
    connectors: {
      metamask: new MetamaskConnector(),
    },
    }}>
      <Component {...pageProps} />
    </DAppProvider>
  )
}

export default MyApp
