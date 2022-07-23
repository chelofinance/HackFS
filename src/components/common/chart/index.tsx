import React from "react";
import {
  AreaChart,
  Area,
  Line,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

export interface ChartProps {
  data: {xAxis: string; yAxis: number}[];
  chartOption?: unknown;
}

const Chart: React.FunctionComponent<ChartProps> = ({data, chartOption}) => {
  const isMobile = false;
  console.log({data});
  return (
    <div className="pt-2 ml-2 w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          barCategoryGap={1}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="transparent" />
          <XAxis
            dataKey="xAxis"
            tickLine={false}
            axisLine={false}
            interval="preserveEnd"
            tickMargin={14}
            minTickGap={80}
          />
          <YAxis
            hide
            type="number"
            tickMargin={16}
            orientation="left"
            axisLine={false}
            tickLine={false}
            interval="preserveEnd"
            minTickGap={80}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="yAxis"
            stroke="#8884d8"
            fill="blue"
            strokeWidth={2}
            dot={false}
            opacity={"0.4"}
          />
          <Tooltip
            cursor={true}
            labelStyle={{paddingTop: 4}}
            contentStyle={{
              padding: "10px 14px",
              borderRadius: 10,
              borderColor: "var(--c-zircon)",
            }}
            wrapperStyle={{top: -70, left: -10}}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
