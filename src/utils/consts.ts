export const abLetters = ["a", "b"] as const;
export const vidTypes = ["color", "depth"] as const;
export type VidType = typeof vidTypes[number];
