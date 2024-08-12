"use client";

import Empty from "@/components/common/Empty";
import { useAppContext } from "@/components/context/App";
import { ChartLabelTooltip } from "@/components/MemberPerformance/components/ChartLabelTooltip";
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
      label: (
        <ChartLabelTooltip label="ET" content="Estimate time: Tổng thời gian (h) các task được giao trong tháng" />
      ),
      color: "#2563eb",
    },
    actualTime: {
      label: <ChartLabelTooltip label="AT" content="Actual time: Tổng thời gian (h) các task hoàn thiện trong tháng" />,
      color: "#5abb41",
    },
    incompleteTime: {
      label: (
        <ChartLabelTooltip
          label="In progress"
          content="Inprogress: Tổng thời gian (h) các task chưa hoàn thiện trong tháng"
        />
      ),
      color: "#be4141",
    },
  } satisfies ChartConfig;

  const labelFormatter = (value: number) => {
    return value || "";
  };

  useEffect(() => {
    const results = getChartRenderData(appContext?.chartData!, filters.monthYear);

    setListChartData(results);
  }, [filters.monthYear, appContext?.chartData]);

  return listChartData.length > 0 ? (
    <ChartContainer config={chartConfig} className="mx-auto max-h-[calc(100vh-140px)] min-h-[250px] w-full 2xl:w-10/12">
      <BarChart accessibilityLayer data={listChartData}>
        <CartesianGrid />
        <XAxis dataKey="memberPercent" dy={3} />
        <YAxis className="chart-y-axis">
          <Label value="Hours" angle={-90} position="insideLeft" fontSize={16} />
        </YAxis>
        <ChartLegend content={<ChartLegendContent className="pt-0" />} height={36} fontSize={24} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="estimateTime" fill="#2563eb" radius={3}>
          <LabelList
            position="insideTop"
            offset={12}
            className="hidden fill-white lg:inline-block"
            fontSize={12}
            formatter={labelFormatter}
          />
        </Bar>
        <Bar dataKey="actualTime" fill="#5abb41" radius={3}>
          <LabelList
            position="insideTop"
            offset={12}
            className="hidden fill-white lg:inline-block"
            fontSize={12}
            formatter={labelFormatter}
          />
        </Bar>
        <Bar dataKey="incompleteTime" fill="#be4141" radius={3}>
          <LabelList
            position="insideTop"
            offset={12}
            className="hidden fill-white lg:inline-block"
            fontSize={12}
            formatter={labelFormatter}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  ) : (
    <div className="relative h-80">
      <Empty />
    </div>
  );
};
