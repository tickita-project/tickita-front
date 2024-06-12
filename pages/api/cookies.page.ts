import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const ACCESS_TOKEN = req.cookies.ACCESS_TOKEN || null;
  const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN || null;

  res.status(200).json({ ACCESS_TOKEN: ACCESS_TOKEN, REFRESH_TOKEN: REFRESH_TOKEN });
};

export default handler;
