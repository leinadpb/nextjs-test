import { db } from "@/lib/db";
import { Kpi, KpiType, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const getDescBasedOnName = (name: string) => {
  // name = TOTAL_USERS
  // return = Total Users
  return name
    ?.toLowerCase()
    .split("_")
    .map((str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(" ");
};

const validType = (type: string) => {
  const keys = Object.keys(KpiType);
  return keys.includes(type);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // @todo validate JWT token
    // @todo Get App Url and apiKey (get appName from params)
    // @todo Call App Url with ApiKey
    // @todo get KPIs and validate them
    // @todo override KPIs with latests
    // @todo Update "lastRefresh" date in current APP

    const query = req.query;
    const appName = (query.appName as string)?.trim()?.toUpperCase();

    if (!appName) {
      res.end();
      throw new Error("Please, specify appName url param.");
    }

    const app = await db.app.findUnique({
      where: {
        name: appName,
      },
    });

    if (!app) {
      res.status(404).json({ msg: "App not found." });
      return;
    }

    const url = app.mainUrl;
    const apiKey = app.apiKey;

    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
      res.status(502).json({ msg: "App Main Url is not configured." });
      return;
    }

    if (!apiKey) {
      res.status(502).json({ msg: "App Api Key is not configured." });
      return;
    }

    const resp = await fetch(url, {
      method: "GET",
      headers: { "Api-Key": apiKey },
    });
    if (!resp.ok) {
      res.status(500).json({
        msg: "App is not working, please review.",
        url,
        method: "GET",
      });
      return;
    }

    const kpis = (await resp.json())?.data ?? [];

    if (!kpis) {
      res
        .status(404)
        .json({ msg: "App is working!, but no KPIs were returned." });
      return;
    }

    const validatedKpis: Kpi[] = kpis
      .map((kpi: any) => {
        if (!kpi || !kpi.name || !kpi.value || !validType(kpi.type)) {
          return undefined;
        }

        return kpi;
      })
      .filter((kpi: any) => !!kpi);

    const mappedKpis = validatedKpis.map((kpi: any) => {
      const newKpi: Prisma.KpiCreateManyInput = {
        appName,
        name: kpi.name,
        type: kpi.type,
        desc: kpi.desc ?? getDescBasedOnName(kpi.name),
        value: kpi.value,
      };
      return newKpi;
    });

    await db.$transaction([
      db.kpi.deleteMany({ where: { appName } }),
      db.kpi.createMany({ data: mappedKpis }),
      db.app.update({
        where: { name: appName },
        data: { lastRefresh: new Date() },
      }),
    ]);

    res.status(200).json({ kpis });
  }
}
