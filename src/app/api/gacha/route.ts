import { NextRequest, NextResponse } from "next/server";
import {
  GACHA_COOKIE_NAME,
  drawSticker,
  gachaStatus,
  readGachaCookie,
  signGachaCookie,
} from "@/lib/gachaCookie";

export const runtime = "nodejs";

function reply<T>(body: T, state: ReturnType<typeof readGachaCookie>, status = 200) {
  const response = NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  response.cookies.set(GACHA_COOKIE_NAME, signGachaCookie(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export async function GET(request: NextRequest) {
  const state = readGachaCookie(request.cookies.get(GACHA_COOKIE_NAME)?.value);
  return reply(gachaStatus(state), state);
}

export async function POST(request: NextRequest) {
  const state = readGachaCookie(request.cookies.get(GACHA_COOKIE_NAME)?.value);
  const status = gachaStatus(state);
  if (!status.unlimited && status.remaining === 0) {
    return reply({ ...status, error: "DAILY_LIMIT" }, state, 409);
  }
  const sticker = drawSticker(state, !status.unlimited);
  return reply({ ...gachaStatus(state), result: sticker }, state);
}
