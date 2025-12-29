import { useActionState } from 'react';
import { useAccount, useKitTransactionSigner } from '@solana/connector';
import {
    address,
    lamports,
    createTransactionMessage,
    setTransactionMessageFeePayer,
    setTransactionMessageLifetimeUsingBlockhash,
    appendTransactionMessageInstruction,
    compileTransaction,
    getSignatureFromTransaction,
} from '@solana/kit';
import type { TransactionSigner } from '@solana/kit';
import { getTransferSolInstruction } from '@solana-program/system';
import { useSolana } from '../providers/SolanaProvider';
import { CONFIG } from '../config';

type TransferState = {
    error: string | null;
    signature: string | null;
};

type TransferPayload = {
    recipient: string;
    amount: string;
};

const initialState: TransferState = {
    error: null,
    signature: null,
};

export function useTransferSol() {
    const { address: senderAddress } = useAccount();
    const { signer } = useKitTransactionSigner();
    const { rpc, sendAndConfirm } = useSolana();

    const [state, formAction, isPending] = useActionState<TransferState, TransferPayload>(
        async (_prevState, { recipient, amount }) => {
            if (!senderAddress || !signer) {
                return { error: 'Wallet not connected or signer unavailable', signature: null };
            }

            try {
                const recipientAddress = address(recipient);
                const amountLamports = lamports(BigInt(Math.floor(parseFloat(amount) * 1e9)));

                const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

                const instruction = getTransferSolInstruction({
                    amount: amountLamports,
                    destination: recipientAddress,
                    source: signer as unknown as TransactionSigner<string>,
                });

                const transactionMessage = setTransactionMessageLifetimeUsingBlockhash(
                    latestBlockhash,
                    setTransactionMessageFeePayer(
                        address(senderAddress),
                        appendTransactionMessageInstruction(
                            instruction,
                            createTransactionMessage({ version: 0 })
                        )
                    )
                );

                const compiledTransaction = compileTransaction(transactionMessage);

                const [signedTransaction] = await signer.modifyAndSignTransactions([compiledTransaction]);

                await sendAndConfirm(signedTransaction as any, {
                    commitment: CONFIG.COMMITMENT
                });

                const sig = getSignatureFromTransaction(signedTransaction as any);
                return { error: null, signature: sig };
            } catch (e: any) {
                console.error(e);
                return { error: e.message || 'Transaction failed', signature: null };
            }
        },
        initialState
    );

    const transfer = (recipient: string, amount: string) => {
        formAction({ recipient, amount });
    };

    return {
        transfer,
        isProcessing: isPending,
        error: state.error,
        signature: state.signature,
        isReady: !!senderAddress && !!signer
    };
}
