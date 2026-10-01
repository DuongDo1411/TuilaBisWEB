/** Tên sticker theo label file trong assets/VIDEO LEN WEB; ảnh xuất bản giữ ID ổn định. */
export const rarities = [
  { id: "R", color: "var(--rarity-blue)", chance: 80 },
  { id: "SR", color: "var(--rarity-purple)", chance: 17 },
  { id: "SSR", color: "var(--rarity-gold)", chance: 3 },
] as const;

export type RarityId = (typeof rarities)[number]["id"];

export type Sticker = {
  id: string;
  rarity: RarityId;
  name: string;
  image: string;
};

// ID không đổi để cookie của người đã quay vẫn trỏ đúng ảnh; nguồn không có SR6.
const stickerCatalog = {
  R: [
    { id: "R1", name: "Bis Ôm" },
    { id: "R2", name: "Bis Tym" },
    { id: "R3", name: "Bis Ngơ" },
    { id: "R4", name: "Bis Chăm" },
    { id: "R5", name: "Bis Zỗi" },
    { id: "R6", name: "Bí Ngô" },
    { id: "R7", name: "Bí Nham Hiểm" },
    { id: "R8", name: "Bis Ngáp" },
    { id: "R9", name: "Bis Chămm" },
  ],
  SR: [
    { id: "SR1", name: "Bis Ngạc Nhiên" },
    { id: "SR2", name: "Bis Thả Tym" },
    { id: "SR3", name: "Bis Like" },
    { id: "SR4", name: "Bis HeHe" },
    { id: "SR5", name: "Bis Khò" },
    { id: "SR7", name: "Bis Thắc Mắc" },
    { id: "SR8", name: "Bis Hoảng Hốt" },
  ],
  SSR: [
    { id: "SSR1", name: "Bis Hớ Hớ" },
    { id: "SSR2", name: "Bis Cọc" },
    { id: "SSR3", name: "Bis Ban" },
    { id: "SSR4", name: "Bis Bắn" },
  ],
} as const satisfies Record<RarityId, readonly { id: string; name: string }[]>;

export const stickers: Sticker[] = rarities.flatMap(({ id: rarity }) =>
  stickerCatalog[rarity].map(({ id, name }) => ({
    id,
    rarity,
    name,
    image: `/media/stickers/${id.toLowerCase()}.png`,
  })),
);

export const stickerById = new Map(stickers.map((sticker) => [sticker.id, sticker]));
export const stickersByRarity: Record<RarityId, Sticker[]> = {
  R: stickers.filter((sticker) => sticker.rarity === "R"),
  SR: stickers.filter((sticker) => sticker.rarity === "SR"),
  SSR: stickers.filter((sticker) => sticker.rarity === "SSR"),
};

