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
    // loại bỏ member unassigned (gồm những task chưa gán cho ai)
    if (
      !currentMember.memberName.toLowerCase().includes("unassigned") &&
      (currentMember.estimateTime !== 0 || currentMember.actualTime !== 0)
    ) {
      let percent = "0";
      let incompleteTimeTemp = 0;

      if (currentMember.estimateTime !== 0) {
        percent = ((currentMember.actualTime * 100) / currentMember.estimateTime).toFixed(1);

        incompleteTimeTemp = fixCalculateFloatingPointError(
          [currentMember.estimateTime, currentMember.actualTime],
          "minus",
        );
      } else if (currentMember.estimateTime === 0 && currentMember.actualTime !== 0) {
        // TH task làm nhanh và sprint hiện tại ko có ET nào
        percent = "100";
        incompleteTimeTemp = 0;
      }

      const incompleteTime = Math.max(0, incompleteTimeTemp); // bỏ số âm

      const memberPercent = currentMember.memberName + ` (${percent}%)`;

      lists.push({ ...currentMember, memberPercent, incompleteTime });
    }

    return lists;
  }, []);

  // sắp xếp lại theo tên
  results.sort((a, b) => a.memberName.localeCompare(b.memberName));

  return results;
}
