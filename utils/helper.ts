import { CookieKey } from "@/models/type";

export const handleLogout = () => {};

export function setClientCookie(cname: CookieKey, cvalue: any, exdays: number = 1): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getClientCookie(cname: CookieKey): string {
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

export function checkClientCookie(key: CookieKey): boolean {
  return !!getClientCookie(key);
}
