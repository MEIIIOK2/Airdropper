import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import { useTonConnect} from './hooks/useTonConnect'
import { useJettonContract } from './hooks/useJettonContract'
import { Address } from '@ton/core'
import "@twa-dev/sdk"
function App() {
  const wallet = useTonConnect()
  const {airdropAddress, claimAmount, mint} = useJettonContract()
  const userAddress = useTonAddress()
  return (
    <>
    <TonConnectButton style={{position: 'absolute', right: '10px', top: '10px'}}/>
    <div className='card'>
      <h1>$TAPE Airdrop</h1>
    </div>
    <div className="card">
      You can claim {claimAmount} $TAPE <br />
      <br />
      <button onClick={mint} disabled = {!wallet.connected}>
        {wallet.connected ? "Mint" : "Connect Wallet to Mint"}
      </button>
      </div>
    </>
  )
}

export default App
