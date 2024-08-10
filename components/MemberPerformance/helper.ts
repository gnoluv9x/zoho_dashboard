import { ChartDataItemType } from "@/types/type";
import { fixCalculateFloatingPointError } from "@/utils/helper";

export function getChartRenderData(
  chartData: Record<string, ChartDataItemType[]>,
  monthYear: string,
): ChartDataItemType[] {
  const listChart = chartData || {};
  const currentMonthList = listChart[monthYear];
  if (!currentMonthList) return [];

  const results = currentMonthList.reduce<ChartDataItemType[]>((lists, currentMember) => {
    if (!currentMember.memberName.toLowerCase().includes("unassigned") && currentMember.estimateTime !== 0) {
      // loại bỏ member unassigned (gồm những task chưa gán cho ai)
      let percent = ((currentMember.actualTime * 100) / currentMember.estimateTime).toFixed(1);
      const memberPercent = currentMember.memberName + ` (${percent}%)`;
      const incompleteTimeTemp = fixCalculateFloatingPointError(
        [currentMember.estimateTime, currentMember.actualTime],
        "minus",
      );
      const incompleteTime = Math.max(0, incompleteTimeTemp); // bỏ số âm

      lists.push({ ...currentMember, memberPercent, incompleteTime });
    }

    return lists;
  }, []);

  return results;
}
