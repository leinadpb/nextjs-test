import bycrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { TextEncoder } from "util";
import { db } from "./db";
import { AppUser } from "./types";

export const hashPassword = (raw: string) => {
  return bycrypt.hash(raw, 10);
};

export const comparePassword = (raw: string, hash: string) => {
  return bycrypt.compare(raw, hash);
};

export const createJWT = (user: AppUser) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat * 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload?.payload as any;
};

export const getUserFromCookie = async (cookies: any) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  const { id } = await validateJWT(jwt);

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
