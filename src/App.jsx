import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useTonConnect} from './hooks/useTonConnect'
import { useJettonContract } from './hooks/useJettonContract'
function App() {
  const wallet = useTonConnect()
  const {airdropAddress, mint} = useJettonContract()
  return (
    <>
    <TonConnectButton/>
    {wallet?.wallet}
    {wallet?.network}
    {airdropAddress}
      <div className="card">
        <button onClick={mint} >
          Mint
        </button>
        </div>
    </>
  )
}

export default App
