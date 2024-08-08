import { MemberPerfChart } from "@/components/MemberPerformance/components/Chart";
import { MemberPerfFilter } from "@/components/MemberPerformance/components/MemberPerfFilter";
import dayjs from "dayjs";
import React, { useState } from "react";

interface MemberPerformanceProps {}

export const MemberPerformance: React.FC<MemberPerformanceProps> = () => {
  const [filters, setFilters] = useState<Record<"monthYear", string>>({ monthYear: dayjs().format("MM/YYYY") });

  return (
    <>
      <MemberPerfFilter filters={filters} onChangeFilters={setFilters} />
      <div className="mt-3">
        <MemberPerfChart filters={filters} />
      </div>
    </>
  );
};
