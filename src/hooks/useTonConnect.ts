import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address, beginCell, storeStateInit } from "@ton/core";
import { SenderArguments } from "@ton/core";
import { Sender } from "@ton/core";

export function useTonConnect(): {
    sender: Sender;
    connected: boolean;
    wallet: string | null;
    network: CHAIN | null;
} {
    const [tonConnectUI] = useTonConnectUI()
    const wallet = useTonWallet()
    return {
        sender: {
            send: async (args: SenderArguments) => {
              console.log(args.init)
              console.log(args.to.toString())
              // if (args.init) {
              //   const stateInit = beginCell().store(storeStateInit(args.init)).endCell().toBoc().toString("base64")
              // }
              
              tonConnectUI.sendTransaction({
                messages: [
                  {
                    address: args.to.toString(),
                    amount: args.value.toString(),
                    payload: args.body?.toBoc().toString("base64"),
                    stateInit: args.init? beginCell().store(storeStateInit(args.init)).endCell().toBoc().toString("base64") : undefined,
                  },
                ],
                validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
              });
            },
            address: wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined
          }, 

        connected: !!wallet?.account.address,
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null
        
    }
}