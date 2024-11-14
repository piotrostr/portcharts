import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";

const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";

export type Accounts = Array<{
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}>;

export const TokenList = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [tokens, setTokens] = useState<Accounts>([]);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKey) return;

      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: new PublicKey(TOKEN_PROGRAM_ID),
          },
        );

        setTokens(
          tokenAccounts.value.filter(
            ({ account }) => account.data.parsed.info.tokenAmount.uiAmount > 0,
          ),
        );
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, [publicKey, connection]);

  if (!publicKey) return null;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
      <div className="space-y-2">
        {tokens.map((token, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">
              Mint: {token.account.data.parsed.info.mint}
            </p>
            <p className="text-sm">
              Amount: {token.account.data.parsed.info.tokenAmount.uiAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
