import { FORMATS_OF_DATE } from "@/types/type";

export const handleLogout = async () => {};

export function formatDateToString(value: Date | null, dateFormat: FORMATS_OF_DATE): string {
  if (!value) return "";

  const day = value.getDate().toString().padStart(2, "0");
  const month = (value.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = value.getFullYear().toString();

  return dateFormat.replace("dd", day).replace("MM", month).replace("yyyy", year);
}

export const removeDuplicate = (list: any[], uniqueField: string) => {
  return [...(new Map(list.map((item) => [item[uniqueField], item])).values() as any)];
};

export const getFibonancyFromIndex = (index: number): number => {
  if (index < 2) return index;
  let prev = 0;
  let current = 1;

  for (let i = 2; i <= index + 1; i++) {
    const temp = current;
    current = prev + current;
    prev = temp;
  }

  return current;
};

export const formatDateValue = (val: number): string => {
  return ("0" + val).slice(-2);
};

export const convertIsoStringDateToFormated = (dateString: string) => {
  if (!dateString) return "-";

  const dateFormat = new Date(dateString);

  const year = dateFormat.getFullYear().toString();
  const month = formatDateValue(dateFormat.getMonth() + 1);
  const date = formatDateValue(dateFormat.getDate());
  const hours = formatDateValue(dateFormat.getHours());
  const minutes = formatDateValue(dateFormat.getMinutes());
  const seconds = dateFormat.getSeconds().toString();

  return hours + ":" + minutes + ":" + seconds + " " + date + "-" + month + "-" + year;
};

export const getDateValue = (dateString: string, formated: FORMATS_OF_DATE) => {
  const separator = dateString.includes("/") ? "/" : "-";

  const datesArray = dateString.split(separator);
  const formatDateArray = formated.split(separator);

  const dateIndex = formatDateArray.indexOf("dd");
  const monthIndex = formatDateArray.indexOf("MM");
  const yearIndex = formatDateArray.indexOf("yyyy");

  const result = new Date(
    parseInt(datesArray[yearIndex]),
    parseInt(datesArray[monthIndex]) - 1,
    parseInt(datesArray[dateIndex]),
  );

  return result;
};
