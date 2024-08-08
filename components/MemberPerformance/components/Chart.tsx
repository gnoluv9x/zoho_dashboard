"use client";

import Empty from "@/components/common/Empty";
import { useAppContext } from "@/components/context/App";
import { getChartRenderData } from "@/components/MemberPerformance/helper";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartDataItemType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Label, LabelList, XAxis, YAxis } from "recharts";

interface MemberPerfChartProps {
  filters: Record<"monthYear", string>;
}

export const MemberPerfChart: React.FC<MemberPerfChartProps> = ({ filters }) => {
  const appContext = useAppContext();

  const [listChartData, setListChartData] = useState<ChartDataItemType[]>(() => {
    const results = getChartRenderData(appContext?.chartData!, filters.monthYear);

    return results;
  });

  const chartConfig = {
    estimateTime: {
      label: "ET",
      color: "#2563eb",
    },
    completeTime: {
      label: "AT",
      color: "#5abb41",
    },
    incompleteTime: {
      label: "In progress",
      color: "#bb2929",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    const results = getChartRenderData(appContext?.chartData!, filters.monthYear);

    setListChartData(results);
  }, [filters.monthYear, appContext?.chartData]);

  return listChartData.length > 0 ? (
    <ChartContainer config={chartConfig} className="min-h-[150px] w-10/12">
      <BarChart accessibilityLayer data={listChartData}>
        <CartesianGrid />
        <XAxis dataKey="memberPercent" />
        <YAxis>
          <Label value="Hours" angle={-90} position="insideLeft" fontSize={16} />
        </YAxis>
        <ChartLegend content={<ChartLegendContent className="pt-0" />} height={36} fontSize={24} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="estimateTime" fill="#2563eb" radius={4}>
          <LabelList position="insideTop" offset={12} className="fill-white" fontSize={12} />
        </Bar>
        <Bar dataKey="completeTime" fill="#5abb41" radius={4}>
          <LabelList position="insideTop" offset={12} className="fill-white" fontSize={12} />
        </Bar>
        <Bar dataKey="incompleteTime" fill="#bb2929" radius={4}>
          <LabelList position="insideTop" offset={12} className="fill-white" fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <div className="h-80">
      <Empty />
    </div>
  );
};
