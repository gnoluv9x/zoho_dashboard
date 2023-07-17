export const handleLogout = async () => {};

export function formatVnDate(value: Date | null): string {
  if (!value) return "";

  return new Date(value).toLocaleDateString("vi-VI");
}
