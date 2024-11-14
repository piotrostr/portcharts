import { useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

interface ResizableChartProps {
  mintAddress: string;
  amount: number;
}

export const ResizableChart = ({
  mintAddress,
  amount,
}: ResizableChartProps) => {
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-2">
        <p className="text-sm text-gray-500 truncate">{mintAddress}</p>
        <p className="text-sm font-medium">Amount: {amount}</p>
      </div>
      <ResizableBox
        width={dimensions.width}
        height={dimensions.height}
        minConstraints={[200, 200]}
        maxConstraints={[800, 800]}
        onResize={(_, { size }) => {
          setDimensions({ width: size.width, height: size.height });
        }}
        resizeHandles={["se"]}
        handle={
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-200 rounded-bl" />
        }
      >
        <iframe
          src={`https://www.gmgn.cc/kline/sol/${mintAddress}`}
          className="w-full h-full"
          frameBorder="0"
        />
      </ResizableBox>
    </div>
  );
};
