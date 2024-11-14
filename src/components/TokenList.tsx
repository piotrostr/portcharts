import { useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";
import { AutoGridChart } from "./AutoGridChart";

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
    <div className="h-full grid grid-cols-auto-fit gap-4 p-4 overflow-auto">
      {tokens.map((token, index) => (
        <AutoGridChart
          key={index}
          mintAddress={token.account.data.parsed.info.mint}
          amount={token.account.data.parsed.info.tokenAmount.uiAmount}
        />
      ))}
    </div>
  );
};
