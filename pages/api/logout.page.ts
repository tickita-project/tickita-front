import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Set-Cookie", [
    `ACCESS_TOKEN=; Path=/; HttpOnly;, SameSite=Strict; Max-Age=0; Secure`,
    `REFRESH_TOKEN=; Path=/; HttpOnly;, SameSite=Strict; Max-Age=0; Secure`,
  ]);
  res.status(200).json({ message: "로그아웃이 성공적으로 처리되었습니다" });
};

export default handler;
