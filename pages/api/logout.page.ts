import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // 로그아웃 처리
    res.setHeader("Set-Cookie", [
      `ACCESS_TOKEN=; Path=/; HttpOnly;, SameSite=Strict; Max-Age=0; Secure`,
      `REFRESH_TOKEN=; Path=/; HttpOnly;, SameSite=Strict; Max-Age=0; Secure`,
    ]);
    res.status(200).json({ message: "로그아웃이 성공적으로 처리되었습니다" });
  } catch (error) {
    res.status(500).json({ message: "서버 에러가 발생했습니다. 다시 시도해 주세요." });
  }
};

export default handler;
