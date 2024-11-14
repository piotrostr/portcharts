import { WalletContextProvider } from "./components/WalletContextProvider";
import { TokenList } from "./components/TokenList";
import { Layout } from "./components/Layout";

function App() {
  return (
    <WalletContextProvider>
      <Layout>
        <TokenList />
      </Layout>
    </WalletContextProvider>
  );
}

export default App;
