interface TokenChartProps {
  mintAddress: string;
  amount: number;
}

export const TokenChart = ({ mintAddress, amount }: TokenChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-2">
        <p className="text-sm text-gray-500 truncate">{mintAddress}</p>
        <p className="text-sm font-medium">Amount: {amount}</p>
      </div>
      <div className="aspect-square w-full">
        <iframe
          src={`https://www.gmgn.cc/kline/sol/${mintAddress}`}
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
};
