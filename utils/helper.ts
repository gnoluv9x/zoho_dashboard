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
