import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano } from '@ton/core';
import { AirdropEntry } from './Airdrop';
import { log } from 'console';

export type AirdropHelperConfig = {
    airdrop: Address;
    proofHash: Buffer;
    index: bigint;
};

export function airdropHelperConfigToCell(config: AirdropHelperConfig): Cell {
    return beginCell()
        .storeBit(false)
        .storeAddress(config.airdrop)
        .storeBuffer(config.proofHash, 32)
        .storeUint(config.index, 256)
        .endCell();
}

export class AirdropHelper implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new AirdropHelper(address);
    }

    static createFromConfig(config: AirdropHelperConfig, code: Cell, workchain = 0) {
        const data = airdropHelperConfigToCell(config);
        const init = { code, data };
        
        return new AirdropHelper(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender): Promise<void> {
        console.log(provider);
        log(via)
        
        console.log('sending');
        
        await provider.internal(via, {
            value: toNano('0.15'),
        })
        
    }

    async sendClaim(provider: ContractProvider, queryId: bigint, proof: Cell) {
        // await provider.external(beginCell().storeUint(queryId, 64).storeRef(proof).endCell());
        const messageBody = beginCell().storeUint(queryId,64).storeRef(proof).endCell();
        await provider.external(messageBody);
        // await provider.internal(via, {
        //     value: toNano('0.15'),
        //     body: messageBody,
        // })
    }

    async getClaimed(provider: ContractProvider): Promise<boolean> {
        if ((await provider.getState()).state.type == 'uninit') {
            return false;
        }
        const stack = (await provider.get('get_claimed', [])).stack;
        return stack.readBoolean();
    }
}
