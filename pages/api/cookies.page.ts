import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin!);
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN || null;
  const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN || null;

  res.status(200).json({ ACCESS_TOKEN: ACCESS_TOKEN, REFRESH_TOKEN: REFRESH_TOKEN });
};

export default handler;
