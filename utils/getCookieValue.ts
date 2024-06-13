const getCookieValue = (cookieString: string, cookieName: string): string => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(cookieString);
  const cookieParts = decodedCookie.split(";");

  for (let i = 0; i < cookieParts.length; i++) {
    let cookiePart = cookieParts[i].trim();
    if (cookiePart.indexOf(name) === 0) {
      return cookiePart.substring(name.length, cookiePart.length);
    }
  }

  return "";
};

export default getCookieValue;
