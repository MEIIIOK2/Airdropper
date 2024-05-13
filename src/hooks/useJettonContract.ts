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
    const [entryIndex, setEntryIndex] = useState<bigint>(1n)
    const [proof, setProof] = useState<Cell>(Cell.EMPTY)

    const airdrop = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        fetch('https://raw.githubusercontent.com/MEIIIOK2/Airdropper/main/droptest.json')
        .then((response=>response.json())).then((data)=>{
            console.log(data)
        })

        const dictCell = Cell.fromBase64(
            'te6cckEBAwEAWgACA8/4AgEATyAAb8WCRqh4WT43exJ4opN7a1Ad5yxCScehJ5uHV1Dv8PKFeLWLAEAATyABm/c0B0d6fUD143N5GuifQJlguJjzHBUmj1in/C4ev6KGK4XpAEDmutbe'
        );
        const dict = dictCell.beginParse().loadDictDirect(Dictionary.Keys.BigUint(256), airdropEntryValue);
    
        const entryIndex = 1n;
        
        const proof = dict.generateMerkleProof(entryIndex);
        setProof(proof)
        const helper = client.open(
            AirdropHelper.createFromConfig(
                {
                    airdrop: Address.parse('EQC_q7tT0aXB-zxmWwN4qguWs1VHNb9ZHN9ADHWjaR1tBpAj'),
                    index: entryIndex,
                    proofHash: proof.hash(),
                },
                
                Cell.fromBoc(Buffer.from('b5ee9c7241010701008a000114ff00f4a413f4bcf2c80b01020120040201bef26c2101821005f5e100bef2e2c0ed44d0d20001f2d2be88ed54fa40d3ffd3ff3003d33fd43020f9005003baf2e2c1f800820afaf08070fb02821043c7d5c9c8cb1fcb3fcc12cbffc9718010c8cb055003cf1670fa0212cb6accc98306fb00030001c002014806050011a098d7da89a1ae14010002d0289d180d', 'hex'))[0]
                

            )
        );


        

        return helper
    }, [client, wallet])



    


    return {
        airdropAddress: airdrop?.address.toString(),
        
        mint: async () => {
            // const message: Mint = {
            //     $$type: "Mint",
            //     amount: 150n
            // }
            if (!airdrop || !client) {
                return
            }
            
            console.log(airdrop.address.toString())
            console.log(await airdrop.getClaimed())
            console.log(await client?.isContractDeployed(airdrop.address))
            if (!await client.isContractDeployed(airdrop.address)) {
                await airdrop.sendDeploy(sender)
            }
            

            if (! await client.isContractDeployed(airdrop.address)) {
                await sleep(5000);
                console.log('Waiting for contract to deploy');
                
            }
            console.log('Contract deployed');
            
            

            await airdrop.sendClaim(1n, proof)
            console.log('Sent claim requrest');

            while (!airdrop.getClaimed()) {
                console.log('Waiting for claim');
                await sleep(5000)
                
            }
            console.log('Claimed!');
            
       
           
        }
    }
}