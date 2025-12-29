import { useAccount, useWalletInfo, DisconnectElement } from '@solana/connector';
import { WalletModal } from './WalletModal';
import { useWalletModal } from '../hooks/useWalletModal';
import { IconButton, Avatar, Flex, Text } from '@radix-ui/themes';
import { LinkBreak2Icon } from '@radix-ui/react-icons';

const WalletIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
        <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h2v-4Z" />
    </svg>
);

export function ConnectButton() {
    const { address } = useAccount();
    const { name, icon } = useWalletInfo();
    const { isOpen, setIsOpen, openModal } = useWalletModal();

    const isConnected = !!address;

    if (isConnected) {
        return (
            <Flex gap="2" align="center">
                {icon ? (
                    <Avatar src={icon} fallback={name?.[0] || 'W'} size="2" radius="full" />
                ) : (
                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.3455 8.25868 4.35 8.95 3.65 10.05C2.95 11.15 2.65 12.55 2.75 14H12.25C12.35 12.55 12.05 11.15 11.35 10.05C10.65 8.95 9.6545 8.25868 8.50627 7.98351C10.0188 7.54738 11.125 6.15288 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.875 4.5C4.875 3.05025 6.05025 1.875 7.5 1.875C8.94975 1.875 10.125 3.05025 10.125 4.5C10.125 5.94975 8.94975 7.125 7.5 7.125C6.05025 7.125 4.875 5.94975 4.875 4.5ZM3.79097 13C3.85698 12.1835 4.269 11.3335 5.09375 10.7335C5.9185 10.1335 6.8125 9.825 7.5 9.825C8.1875 9.825 9.0815 10.1335 9.90625 10.7335C10.731 11.3335 11.143 12.1835 11.209 13H3.79097Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                )}
                <Text size="2" weight="medium">
                    {name}
                </Text>

                <DisconnectElement
                    render={({ disconnect, disconnecting }) => (
                        <IconButton
                            onClick={disconnect}
                            disabled={disconnecting}
                            size="3"
                            variant="ghost"
                        >
                            <LinkBreak2Icon width="20" height="20" />
                        </IconButton>
                    )}
                />

                <WalletModal open={isOpen} onOpenChange={setIsOpen} />
            </Flex>
        );
    }

    return (
        <>
            <IconButton
                onClick={openModal}
                size="3"
            >
                {isConnected ? (
                    icon ? (
                        <Avatar src={icon} fallback={name?.[0] || 'W'} size="2" radius="full" />
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.3455 8.25868 4.35 8.95 3.65 10.05C2.95 11.15 2.65 12.55 2.75 14H12.25C12.35 12.55 12.05 11.15 11.35 10.05C10.65 8.95 9.6545 8.25868 8.50627 7.98351C10.0188 7.54738 11.125 6.15288 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.875 4.5C4.875 3.05025 6.05025 1.875 7.5 1.875C8.94975 1.875 10.125 3.05025 10.125 4.5C10.125 5.94975 8.94975 7.125 7.5 7.125C6.05025 7.125 4.875 5.94975 4.875 4.5ZM3.79097 13C3.85698 12.1835 4.269 11.3335 5.09375 10.7335C5.9185 10.1335 6.8125 9.825 7.5 9.825C8.1875 9.825 9.0815 10.1335 9.90625 10.7335C10.731 11.3335 11.143 12.1835 11.209 13H3.79097Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    )
                ) : (
                    <WalletIcon />
                )}
            </IconButton>
            <WalletModal open={isOpen} onOpenChange={setIsOpen} />
        </>
    );
}
