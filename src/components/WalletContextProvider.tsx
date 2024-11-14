import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

// Import wallet styles
import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const endpoint = import.meta.env.VITE_SOLANA_RPC_ENDPOINT as string;
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
