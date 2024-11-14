import { WalletButton } from "./WalletButton";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm z-50">
        <div className="px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Portfolio Charts</h1>
          <WalletButton />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
};
