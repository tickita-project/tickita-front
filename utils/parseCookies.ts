type CookiesType = { [key: string]: string };

const parseCookies = (cookieHeader?: string) => {
  const list: CookiesType = {};
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach((cookie) => {
    let [name, ...rest] = cookie.split("=");
    name = name?.trim();
    if (!name) return;
    const value = rest.join("=").trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
};

export default parseCookies;
