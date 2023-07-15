export const handleLogout = async () => {};

export function setClientCookie(cname: string, cvalue: any, exdays: number = 1): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getClientCookie(cname: string): string {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkClientCookie(key: string): boolean {
  return !!getClientCookie(key);
}

export function formatVnDate(value: Date | null): string {
  if (!value) return "";

  return new Date(value).toLocaleDateString("vi-VI");
}
