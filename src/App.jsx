import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react'
import { useTonConnect} from './hooks/useTonConnect'
import { useJettonContract } from './hooks/useJettonContract'
import { Address } from '@ton/core'
import AwaliableRewards from './components/AwalRewards'
import "@twa-dev/sdk"
function App() {
  const wallet = useTonConnect()
  const {airdropAddress, claimed, claimAmount, mint} = useJettonContract()
  const userAddress = useTonAddress()
  console.log(claimAmount);

  console.log(!wallet.connected && (claimAmount < 0))
  const canClaim = wallet.connected && (claimAmount > 0)
  return (
    <>
    <TonConnectButton style={{position: 'fixed', right: '10px', top: '10px'}}/>
    <div>
      <h1>$TAPE Airdrop</h1>
    </div>
    <div className="card">
      <AwaliableRewards canClaim = {canClaim} claimed = {claimed} claimAmount = {claimAmount}/>
       <br />
      <br />
      <button onClick={mint} disabled = {!wallet.connected}>
        {wallet.connected ? "Claim" : "Connect Wallet to Mint"}
      </button>
      </div>
    </>
  )
}

export default App
