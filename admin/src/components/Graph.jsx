import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMantineColorScheme } from "@mantine/core";

const Graph = ({ dt }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = colorScheme === "dark";

  return (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        {dt?.length > 0 ? (
          <AreaChart data={dt} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={theme ? "#4f46e5" : "#8884d8"} stopOpacity={0.8} />
                <stop offset="95%" stopColor={theme ? "#4f46e5" : "#8884d8"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="_id" tick={{ fill: theme ? "#ffffff" : "#ffffff" }} />
            <YAxis tick={{ fill: theme ? "#ffffff" : "#ffffff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme ? "#2d2d2d" : "#ffffff",
                color: theme ? "#ffffff" : "#333",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="Total"
              stroke={theme ? "#4f46e5" : "#8884d8"}
              fill="url(#colorTotal)"
            />
          </AreaChart>
        ) : (
          <div className="text-center p-10">
            <img
              src="https://user-images.githubusercontent.com/15953522/49493502-63e21d00-f882-11e8-911c-1d7655f393e8.png"
              alt="No Data"
              className="w-1/3 mx-auto opacity-50"
            />
            <p className="text-gray-500 dark:text-gray-400 mt-4">No data available</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
