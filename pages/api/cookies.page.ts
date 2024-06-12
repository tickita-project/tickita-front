import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN || null;
  const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN || null;

  res.status(200).json({ ACCESS_TOKEN: ACCESS_TOKEN, REFRESH_TOKEN: REFRESH_TOKEN });
};

export default handler;
