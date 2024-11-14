import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletButton = () => {
  const { publicKey } = useWallet();

  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton />
      {publicKey && (
        <p className="text-sm text-gray-600">
          Connected: {publicKey.toString()}
        </p>
      )}
    </div>
  );
};
