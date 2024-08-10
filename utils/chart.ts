import { CommonInfo, IdAndNameType, SprintDataType, SprintsInProjectType } from "@/types";
import { ChartDataItemType, TaskDetail } from "@/types/type";
import {
  fixCalculateFloatingPointError,
  getCurrentSprintFromName,
  getListProjectWithMonth,
  getSprintNameInTaskName,
} from "@/utils/helper";

// hàm lấy thông tin chart
export function getChartDataFromItems(
  listItems: TaskDetail[],
  listSprints: SprintDataType[],
  listStatus: CommonInfo[],
  listMembers: IdAndNameType[],
): Record<string, ChartDataItemType[]> {
  if (listItems.length === 0) return {};

  const listSprintsAndMonthsInProject = getListProjectWithMonth(listSprints); // Danh sách các sprint nằm trong 1 tháng và tháng trong projectid

  if (Object.keys(listSprintsAndMonthsInProject).length === 0) return {};

  const listDoneTaskStatus: string[] = []; // Danh sách các trạng thái task đã done

  listStatus.forEach((status) => {
    // task đã done là task có status nằm trong cột mà cột đó có tiêu đề chứa done. Ví dụ: Done, Done dev...
    if (status.name.toLowerCase().includes("done")) {
      listDoneTaskStatus.push(status.id);
    }
  });

  const results: Record<string, ChartDataItemType[]> = {};

  listItems.forEach((task) => {
    const currentSprintInTitleTask = getSprintNameInTaskName(task.name); // sprint được được gán trong tên của task
    const sprintOfCreatedTask = listSprints.find((spr) => spr.id === task.sprintId);
    const sprintNumberOfCreatedTask = getCurrentSprintFromName(sprintOfCreatedTask?.name!); // Task được tạo ở sprint bnh
    const isDoneTask = listDoneTaskStatus.includes(task.statusTask);
    const monthsWithSprintData = listSprintsAndMonthsInProject[task.idProject]; // {"08/2024": [], "09/2024": []}

    if (
      monthsWithSprintData &&
      Object.keys(monthsWithSprintData).length > 0 &&
      currentSprintInTitleTask &&
      task.durationPoint > 0 &&
      !task.itemTypeTitle.toLowerCase().includes("bug")
    ) {
      /**
       * Chỉ được tính duration là các task có:
        + Trong project chứa task phải có sprint đúng format task (xem file README.md)
        + task có durationPoint lớn hơn 0,
        + không phải bug
       */

      const isMissedDeadline = sprintNumberOfCreatedTask < currentSprintInTitleTask; // task bị trễ dead line dẫn đến nhảy sang sprint khác hay ko?
      const isEarlyCompletion = sprintNumberOfCreatedTask > currentSprintInTitleTask; // task làm nhanh hơn dự kiến (sprint 2 làm task sprint 3)

      let monthOfSprintThatCreatedTask = ""; // tháng mà task đc tạo
      let monthOfSprintInTitleTask = ""; // tháng chứa sprint mà task được sửa prefix.

      /**
       * Loop qua list sprints trong project hiện tại để kiểm tra xem task có bị nhảy tháng sau khi đổi prefix tên không?
       * Ví dụ ban đầu tên task: 
       * [3] Task của sprint 3 
       * => Sửa tên thành [1] Task của sprint 3. 
       * Khi này cần tìm tháng chứa sprint 1 và 3 để xem chúng có = nhau không.
        Nếu = nhau chứng tỏ sau khi sửa prefix trong task thì task ko bị nhảy sang tháng khác
        Nêu != nhau thì ngược lại.
       */
      Object.keys(monthsWithSprintData).forEach((currentMonth) => {
        const listSprints = monthsWithSprintData[currentMonth];

        listSprints.forEach((spr) => {
          if (spr.sprintNumber === currentSprintInTitleTask) {
            monthOfSprintInTitleTask = spr.month;
          }
          if (spr.sprintNumber === sprintNumberOfCreatedTask) {
            monthOfSprintThatCreatedTask = spr.month;
          }
        });
      });

      const isChangeMonthWhenChangePrefixNameInTask = monthOfSprintThatCreatedTask === monthOfSprintInTitleTask;

      task.userWork.forEach((userId) => {
        let sprintNeedCheck: SprintsInProjectType = [];
        if (isChangeMonthWhenChangePrefixNameInTask || sprintNumberOfCreatedTask !== currentSprintInTitleTask) {
          // nếu thay đổi prefix làm thay đổi tháng hoặc thay đổi sprint
          const monthSprintThatCreatedTask = monthsWithSprintData[monthOfSprintThatCreatedTask];
          const monthSprintInTitleTask = monthsWithSprintData[monthOfSprintInTitleTask];
          const sprintThatTaskCreatedTask = monthSprintThatCreatedTask.find(
            (spr) => spr.sprintNumber === sprintNumberOfCreatedTask,
          );
          const sprintInTitleTask = monthSprintInTitleTask.find((spr) => spr.sprintNumber === currentSprintInTitleTask);
          sprintNeedCheck = [sprintThatTaskCreatedTask!, sprintInTitleTask!];
        } else {
          // nếu thay đổi prefix ko làm thay đổi sprint
          const monthSprintsData = monthsWithSprintData[monthOfSprintInTitleTask];
          const currentSprint = monthSprintsData.find((spr) => spr.month === monthOfSprintInTitleTask);
          sprintNeedCheck = [currentSprint!];
        }

        if (sprintNeedCheck.length > 0) {
          sprintNeedCheck.forEach((sprint) => {
            const currentMonth = sprint.month;

            /**
             * Tăng ET trong TH:
              - task được tạo ở sprint hiện tại và ko phải task làm nhanh
              - hoặc tạo ở sprint khác và là task làm chậm (miss deadline)
            */
            const isIncreateET =
              (task.sprintId === sprint.id && !isEarlyCompletion) || (task.sprintId !== sprint.id && isMissedDeadline);

            /**
             * Tăng AT trong TH:
              - Tên prefix của task = sprint hiện tại + done
              - Tạo ở sprint hiện tại + done + ko phải task làm nhanh
            */
            const isIncreaseAT =
              (currentSprintInTitleTask === sprint.sprintNumber && isDoneTask) ||
              (task.sprintId === sprint.id && isDoneTask && !isEarlyCompletion);

            const listChartData: ChartDataItemType[] = results?.[currentMonth] || [];

            const currentMemberIdx = listChartData.findIndex((chartData) => chartData.memberId === userId);

            if (currentMemberIdx !== -1) {
              /*
               * nếu đã có member trong list chartData của tháng hiện tại
               */
              const chartDataForMember = listChartData[currentMemberIdx];

              if (isIncreateET) {
                chartDataForMember.estimateTime = fixCalculateFloatingPointError([
                  chartDataForMember.estimateTime,
                  task.durationPoint,
                ]);
              }

              if (isIncreaseAT) {
                chartDataForMember.actualTime = fixCalculateFloatingPointError([
                  chartDataForMember.actualTime,
                  task.durationPoint,
                ]);
              }

              listChartData.splice(currentMemberIdx, 1, chartDataForMember);
            } else {
              /**
               * nếu chưa có user trong list data của tháng hiện tại
               ** Tạo mới user
               ** Và tăng ET hoặc AT
               */
              const member = listMembers.find((memb) => memb.id === userId)!;

              const newMember: ChartDataItemType = {
                estimateTime: 0,
                actualTime: 0,
                memberId: member.id,
                memberName: member.name,
              };

              if (isIncreateET) {
                newMember.estimateTime = fixCalculateFloatingPointError([newMember.estimateTime, task.durationPoint]);
              }

              if (isIncreaseAT) {
                newMember.actualTime = fixCalculateFloatingPointError([newMember.actualTime, task.durationPoint]);
              }

              listChartData.push(newMember);
            }

            results[currentMonth] = listChartData;
          });
        }
      });
    }
  });

  return results;
}
