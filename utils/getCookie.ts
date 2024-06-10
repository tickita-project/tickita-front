import { CookieNameType } from "@/types/type";

const getCookie = (name: CookieNameType) => {
  if (typeof document === "undefined") {
    return null;
  }

  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1")}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default getCookie;
