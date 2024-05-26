import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const manifestUrl =
  "https://raw.githubusercontent.com/MEIIIOK2/Airdropper/main/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {/* <App /> */}
      Airdrop ended!
    </TonConnectUIProvider>
  </React.StrictMode>,
)
