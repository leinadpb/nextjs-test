import { App } from "@prisma/client";
import { AuthPayload } from "./types";

interface FetcherOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  json?: boolean;
}

const fetcher = async ({ url, method, body, json = true }: FetcherOptions) => {
  const res = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  console.log("res", res);
  if (!res.ok) {
    throw new Error("API error");
  }
  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const signin = (body: AuthPayload) => {
  return fetcher({ url: "/api/signin", method: "POST", body });
};

export const signout = () => {
  return fetcher({ url: "/api/signout", method: "POST" });
};

export const getApps = (): Promise<App[]> => {
  return fetcher({ url: "/api/apps", method: "GET" });
};
