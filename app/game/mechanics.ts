export type PlayerAttack = "slash" | "heavy";

export function attackDamage(attack: PlayerAttack, embers: number) {
  const boundEmbers = Math.max(0, Math.min(6, Math.floor(embers)));
  return attack === "heavy" ? 38 + boundEmbers * 2 : 20 + boundEmbers;
}

export function fieldGrade(seconds: number, embers: number) {
  if (embers >= 6 && seconds < 110) return "S";
  if (embers >= 4 && seconds < 160) return "A";
  if (embers >= 2) return "B";
  return "C";
}
