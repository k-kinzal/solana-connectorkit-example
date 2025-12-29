import { useState } from 'react';
import { useTransferSol } from '../hooks/useTransferSol';
import { useWalletModal } from '../hooks/useWalletModal';
import { WalletModal } from './WalletModal';
import { Button, Flex, Text, Box, TextField } from '@radix-ui/themes';
import { PersonIcon, MagicWandIcon } from '@radix-ui/react-icons';

export function TransferToken() {
    const { transfer, isProcessing, error, signature, isReady } = useTransferSol();
    const { isOpen, setIsOpen, openModal } = useWalletModal();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    const handleTransfer = async () => {
        await transfer(recipient, amount);
    };

    return (
        <Box p="5" width="100%" maxWidth="450px">
            <Flex direction="column" gap="4">
                <Box>
                    <Text as="div" size="2" mb="1" weight="bold">Recipient</Text>
                    <TextField.Root
                        placeholder="Wallet Address"
                        value={recipient}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)}
                    >
                        <TextField.Slot>
                            <PersonIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                <Box>
                    <Text as="div" size="2" mb="1" weight="bold">Amount (SOL)</Text>
                    <TextField.Root
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                    >
                        <TextField.Slot>
                            <MagicWandIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                {isReady ? (
                    <Button
                        onClick={handleTransfer}
                        disabled={!recipient || !amount || isProcessing}
                        size="3"
                        mt="2"
                        className="w-full"
                    >
                        {isProcessing ? 'Processing...' : 'Send Transaction'}
                    </Button>
                ) : (
                    <>
                        <Button
                            onClick={openModal}
                            size="3"
                            mt="2"
                            className="w-full"
                        >
                            Connect to Initiate
                        </Button>
                        <WalletModal open={isOpen} onOpenChange={setIsOpen} />
                    </>
                )}

                {error && (
                    <Text color="ruby" size="2" style={{ wordBreak: 'break-all', marginTop: '8px' }}>
                        Error: {error}
                    </Text>
                )}

                {signature && (
                    <Box mt="3" p="3">
                        <Text size="2" color="jade" weight="bold">Transmission Successful</Text>
                        <Text as="p" size="1" color="jade">Sig: {signature}</Text>
                    </Box>
                )}
            </Flex>
        </Box>
    );
}
