import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface ChartLabelTooltipProps {
  label: string;
  content: string;
}

export const ChartLabelTooltip: React.FC<ChartLabelTooltipProps> = ({ label, content }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>{label}</TooltipTrigger>
        <TooltipContent>
          <div className="w-80 rounded-md border border-gray-200 bg-gray-200 p-2 shadow-md">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
