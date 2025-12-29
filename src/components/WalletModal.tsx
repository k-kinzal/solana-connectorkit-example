import { Dialog, Button, Flex, IconButton, Box } from '@radix-ui/themes';
import { WalletListElement, useAccount, DisconnectElement } from '@solana/connector';
import { Cross2Icon } from '@radix-ui/react-icons';

interface WalletModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WalletModal({ open, onOpenChange }: WalletModalProps) {
    const { address } = useAccount();

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content maxWidth="400px">

                <Flex justify="between" align="center" mb="4">
                    <Dialog.Title>Connect Wallet</Dialog.Title>
                    <Dialog.Close>
                        <IconButton
                            variant="ghost"
                            color="gray"
                        >
                            <Cross2Icon width="20" height="20" />
                        </IconButton>
                    </Dialog.Close>
                </Flex>

                <Box>
                    <WalletListElement />
                </Box>

                {address && (
                    <Flex mt="5" justify="center">
                        <DisconnectElement
                            render={({ disconnect, disconnecting }) => (
                                <Button
                                    color="ruby"
                                    variant="soft"
                                    onClick={() => {
                                        disconnect();
                                        onOpenChange(false);
                                    }}
                                    disabled={disconnecting}
                                    className="w-full"
                                >
                                    Disconnect Session
                                </Button>
                            )}
                        />
                    </Flex>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
}
