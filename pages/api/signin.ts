import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @todo sanatize payload

  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email?.trim()?.toLowerCase(),
      },
    });

    if (!user || !user.password) {
      res.status(404).json({ msg: "Invalid user." });
      res.end();
      return;
    }

    const isUser = await comparePassword(
      req.body.password?.trim(),
      user.password
    );

    if (isUser) {
      const jwt = await createJWT({ id: user.id, email: user.email });
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME ?? "", jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201).json({ data: { id: user.id, email: user.email } });
      res.end();
    } else {
      res.status(402).json({ msg: "Invalid user." });
      res.end();
    }
  }
}
