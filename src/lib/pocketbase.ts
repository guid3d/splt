import PocketBase from "pocketbase";

export const spltPocketHost =
  process.env.NEXT_PUBLIC_POCKETHOST_DB || "http://127.0.0.1:8090";

export const pb = new PocketBase(spltPocketHost);
