export const handleLogout = async () => {};

export function formatVnDate(value: Date | null): string {
  if (!value) return "";

  return new Date(value).toLocaleDateString("vi-VI");
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
