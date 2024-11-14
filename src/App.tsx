import { WalletContextProvider } from "./components/WalletContextProvider";
import { WalletButton } from "./components/WalletButton";
import { TokenList } from "./components/TokenList";

function App() {
  return (
    <WalletContextProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Solana Wallet Connection
            </h1>
            <WalletButton />
            <TokenList />
          </div>
        </div>
      </div>
    </WalletContextProvider>
  );
}

export default App;
