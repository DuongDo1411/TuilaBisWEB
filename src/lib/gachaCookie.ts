import { createHmac, randomInt, timingSafeEqual } from "node:crypto";
import { rarities, stickerById, stickersByRarity, type Sticker } from "@/content/gacha";

export const GACHA_COOKIE_NAME = "tuilabis_gacha";

type GachaCookie = {
  v: 1;
  day: string;
  used: number;
  bonus: number; // dành cho +2 lượt từ đánh giá sau này; hiện luôn bằng 0
  owned: Record<string, number>; // dữ liệu bộ sưu tập, UI sẽ xây dựng sau
  lastStickerId: string | null;
};

export type GachaStatus = {
  remaining: number;
  unlimited: boolean;
  resetAt: string;
  lastSticker: Sticker | null;
};

function secret() {
  const value = process.env.GACHA_COOKIE_SECRET;
  if (!value || value.length < 32) throw new Error("GACHA_COOKIE_SECRET must be at least 32 characters");
  return value;
}

export function vietnamDay(now = new Date()): string {
  return new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

export function nextVietnamMidnight(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, date + 1) - 7 * 60 * 60 * 1000).toISOString();
}

function emptyState(day: string): GachaCookie {
  return { v: 1, day, used: 0, bonus: 0, owned: {}, lastStickerId: null };
}

function validState(value: unknown): value is GachaCookie {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<GachaCookie>;
  return (
    state.v === 1 &&
    typeof state.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(state.day) &&
    Number.isInteger(state.used) && state.used! >= 0 && state.used! <= 3 &&
    (state.bonus === 0 || state.bonus === 2) &&
    (state.lastStickerId === null ||
      (typeof state.lastStickerId === "string" && stickerById.has(state.lastStickerId))) &&
    !!state.owned && typeof state.owned === "object" && !Array.isArray(state.owned) &&
    Object.entries(state.owned).every(([id, count]) =>
      stickerById.has(id) && Number.isSafeInteger(count) && count > 0,
    )
  );
}

export function readGachaCookie(raw: string | undefined, today = vietnamDay()): GachaCookie {
  if (!raw) return emptyState(today);
  try {
    const [payload, signature, extra] = raw.split(".");
    if (!payload || !signature || extra) return emptyState(today);
    const expected = createHmac("sha256", secret()).update(payload).digest();
    const supplied = Buffer.from(signature, "base64url");
    if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return emptyState(today);
    const state: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!validState(state)) return emptyState(today);
    if (state.day !== today) return { ...state, day: today, used: 0, bonus: 0 };
    return state;
  } catch {
    return emptyState(today);
  }
}

export function signGachaCookie(state: GachaCookie): string {
  const payload = Buffer.from(JSON.stringify(state)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function gachaStatus(state: GachaCookie): GachaStatus {
  return {
    remaining: Math.max(0, 1 + state.bonus - state.used),
    unlimited: process.env.GACHA_UNLIMITED_SPINS === "true",
    resetAt: nextVietnamMidnight(state.day),
    lastSticker: state.lastStickerId ? stickerById.get(state.lastStickerId) ?? null : null,
  };
}

export function drawSticker(state: GachaCookie, consumeTurn = true): Sticker {
  const roll = randomInt(100);
  let threshold = 0;
  for (const rarity of rarities) {
    threshold += rarity.chance;
    if (roll < threshold) {
      const pool = stickersByRarity[rarity.id];
      const sticker = pool[randomInt(pool.length)];
      if (consumeTurn) state.used += 1;
      state.lastStickerId = sticker.id;
      state.owned[sticker.id] = (state.owned[sticker.id] ?? 0) + 1;
      return sticker;
    }
  }
  throw new Error("Gacha odds must total 100");
}
