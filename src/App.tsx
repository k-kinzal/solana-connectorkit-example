import { AppProvider } from '@solana/connector';
import { ConnectButton } from './components/ConnectButton';
import { TransferToken } from './components/TransferToken';
import { Flex } from '@radix-ui/themes';

function App() {
  return (
    <AppProvider>
      <Flex direction="column" align="center" minHeight="100vh" width="100%">

        {/* Header Bar */}
        <Flex
          justify="end"
          align="center"
          width="100%"
          p="5"
        >
          <ConnectButton />
        </Flex>

        {/* Main Content Centered */}
        <Flex justify="center" align="center" style={{ flex: 1, width: '100%' }}>
          <TransferToken />
        </Flex>

      </Flex>
    </AppProvider>
  );
}

export default App;
