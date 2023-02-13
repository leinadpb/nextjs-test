import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @todo validate JWT token
  if (req.method === "GET") {
    const query = req.query;
    const appName = (query.appName as string)?.trim()?.toUpperCase();

    if (!appName) {
      res.status(409).json({ msg: "Invalid request." });
      return;
    }

    const apps = await db.kpi.findMany({
      where: {
        appName,
      },
    });

    try {
      res.status(200).json({ data: apps });
      res.end();
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ msg: "API error." });
      res.end();
    }
  }
}
