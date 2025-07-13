/**
 * ScoreEngine  –  calcula nota S / A / B / C
 * --------------------------------------------------
 * Pesos establecidos:
 *  questions (colores) ............. 25 %
 *  symptomsDetected ................ 20 %
 *  hypothesesQuality ............... 15 %
 *  testsEfficiency ................. 10 %
 *  treatmentQuality ................ 20 %
 *  rapportQuality .................. 10 %
 */

export type SessionStats = {
  colours: { brown: number; green: number; blue: number; purple: number };
  symptomsDetected: number;        // 0–100 %
  hypothesesQuality: number;       // 0–100 %
  testsEfficiency: number;         // 0–100 %
  treatmentQuality: number;        // 0–100 %
  rapportQuality: number;          // 0–100 %
};

const WEIGHTS = {
  colours: 0.25,
  symptomsDetected: 0.20,
  hypothesesQuality: 0.15,
  testsEfficiency: 0.10,
  treatmentQuality: 0.20,
  rapportQuality: 0.10,
};

export function colourScore(c: SessionStats['colours']): number {
  const total = c.brown + c.green + c.blue + c.purple;
  if (!total) return 0;
  const points =
    c.green * 0.6 +
    c.blue * 0.9 +
    c.purple * 1.0 +
    c.brown * 0.3;
  return Math.round((points / total) * 100);
}

export function calcRawScore(stats: SessionStats): number {
  const colourPct = colourScore(stats.colours);

  const weighted =
    colourPct * WEIGHTS.colours +
    stats.symptomsDetected * WEIGHTS.symptomsDetected +
    stats.hypothesesQuality * WEIGHTS.hypothesesQuality +
    stats.testsEfficiency * WEIGHTS.testsEfficiency +
    stats.treatmentQuality * WEIGHTS.treatmentQuality +
    stats.rapportQuality * WEIGHTS.rapportQuality;

  return Math.round(weighted);
}

export function letterGrade(score: number): 'S' | 'A' | 'B' | 'C' {
  if (score >= 90) return 'S';
  if (score >= 75) return 'A';
  if (score >= 60) return 'B';
  return 'C';
}

/**
 * Uso:
 * const score = calcRawScore(stats);
 * const grade = letterGrade(score);
 */
