import { ChartDataItemType } from "@/types/type";
import { fixPlusFloatingPointError } from "@/utils/helper";

export function getChartRenderData(
  chartData: Record<string, ChartDataItemType[]>,
  monthYear: string,
): ChartDataItemType[] {
  const listChart = chartData || {};
  const currentMonthList = listChart[monthYear];
  if (!currentMonthList) return [];

  const results = currentMonthList.reduce<ChartDataItemType[]>((lists, currentMember) => {
    if (!currentMember.memberName.toLowerCase().includes("unassigned")) {
      // loại bỏ member unassigned (gồm những task chưa gán)
      const totalET = fixPlusFloatingPointError([currentMember.incompleteTime, currentMember.completeTime]); // ET = tổng duration trong tháng

      const percent = ((currentMember.completeTime * 100) / totalET).toFixed(1);
      const memberPercent = currentMember.memberName + ` (${percent}%)`;

      lists.push({ ...currentMember, estimateTime: totalET, memberPercent });
    }

    return lists;
  }, []);

  return results;
}
