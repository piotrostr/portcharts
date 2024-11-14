import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { TokenChart } from "./TokenChart";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tokens.slice(1, 3).map((token, index) => (
        <TokenChart
          key={index}
          mintAddress={token.account.data.parsed.info.mint}
          amount={token.account.data.parsed.info.tokenAmount.uiAmount}
        />
      ))}
    </div>
  );
};
