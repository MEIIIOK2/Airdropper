import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient , JettonWallet} from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import TonWeb from "tonweb";

export function useTonClient() {
    const {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;
            
            // return new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', 
            // {apiKey: '3f66aec6c1686db8757246ff8040ff8d8f6a2930d0f53c62b9968c9ec6b6b3ec'}));

            return new TonClient({
                
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}