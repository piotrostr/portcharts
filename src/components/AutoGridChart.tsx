interface AutoGridChartProps {
  mintAddress: string;
  amount: number;
}

export const AutoGridChart = ({ mintAddress, amount }: AutoGridChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow h-full flex flex-col">
      <div className="p-2 border-b">
        <p className="text-sm text-gray-500 truncate">{mintAddress}</p>
        <p className="text-sm font-medium">Amount: {amount}</p>
      </div>
      <div className="flex-1 min-h-0">
        <iframe
          src={`https://www.gmgn.cc/kline/sol/${mintAddress}`}
          className="w-full h-full"
          frameBorder="0"
        />
      </div>
    </div>
  );
};
