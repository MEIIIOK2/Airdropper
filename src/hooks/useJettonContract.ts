import { useEffect, useState } from "react";
import { Address, Cell, Dictionary, fromNano, OpenedContract, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { Airdrop, airdropEntryValue } from "../wrappers/Airdrop";
import { AirdropHelper } from "../wrappers/AirdropHelper";
import { Buffer } from "buffer";
const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export function useJettonContract() {
    const {client} = useTonClient()
    
    const {wallet, sender} = useTonConnect()
    const [balance, setBalance] = useState<string | null>()

    const airdrop = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const dictCell = Cell.fromBase64(
            'te6cckEBBQEAhgACA8/oAgEATUgA8OYDSxw0XZi4OdCD0hNOBW2Fd/rkR/Wmvmc3OwLdEYiLLQXgEAIBIAQDAE0gAkQn3LTRp9vn/K0TXJrWPCeEmrX7VdoMP2KoakM4TmSaO5rKAEAATSABm/c0B0d6fUD143N5GuifQJlguJjzHBUmj1in/C4ev6IdzWUAQHf9wAg='
        );
        const dict = dictCell.beginParse().loadDictDirect(Dictionary.Keys.BigUint(256), airdropEntryValue);
    
        const entryIndex = 0n;
        
        const proof = dict.generateMerkleProof(entryIndex);
    
        const helper = client.open(
            AirdropHelper.createFromConfig(
                {
                    airdrop: Address.parse('EQBPA1Bkbe3EOkPQCX2y2y0jZIdCFcK7rzAucWNnwq6I2ZvC'),
                    index: entryIndex,
                    proofHash: proof.hash(),
                },
                
                Cell.fromBoc(Buffer.from('b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d', 'hex'))[0]
                

            )
        );
        client.provider


        

        return helper
    }, [client, wallet])



    


    return {
        airdropAddress: airdrop?.address.toString(),
        
        mint: async () => {
            // const message: Mint = {
            //     $$type: "Mint",
            //     amount: 150n
            // }
            if (!airdrop) {
                return
            }
            console.log(await airdrop.sendDeploy(airdrop, sender))

           
        }
    }
}