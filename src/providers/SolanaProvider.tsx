import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
    createSolanaRpc,
    createSolanaRpcSubscriptions,
    sendAndConfirmTransactionFactory
} from '@solana/kit';
import type {
    Rpc,
    RpcSubscriptions,
    SolanaRpcApi,
    SolanaRpcSubscriptionsApi
} from '@solana/kit';
import { CONFIG } from '../config';

interface SolanaContextType {
    rpc: Rpc<SolanaRpcApi>;
    rpcSubscriptions: RpcSubscriptions<SolanaRpcSubscriptionsApi>;
    sendAndConfirm: ReturnType<typeof sendAndConfirmTransactionFactory>;
}

const SolanaContext = createContext<SolanaContextType | null>(null);

export function SolanaProvider({ children }: { children: ReactNode }) {
    const rpc = useMemo(() => createSolanaRpc(CONFIG.RPC_ENDPOINT), []);
    const rpcSubscriptions = useMemo(() => createSolanaRpcSubscriptions(CONFIG.WSS_ENDPOINT), []);
    const sendAndConfirm = useMemo(() =>
        sendAndConfirmTransactionFactory({ rpc, rpcSubscriptions }),
        [rpc, rpcSubscriptions]
    );

    const value = useMemo(() => ({
        rpc,
        rpcSubscriptions,
        sendAndConfirm
    }), [rpc, rpcSubscriptions, sendAndConfirm]);

    return (
        <SolanaContext.Provider value={value}>
            {children}
        </SolanaContext.Provider>
    );
}

export function useSolana() {
    const context = useContext(SolanaContext);
    if (!context) {
        throw new Error('useSolana must be used within a SolanaProvider');
    }
    return context;
}
