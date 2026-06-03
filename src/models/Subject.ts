export interface Subject {
  id: string;
  name: string;
  semester: string; // "prvi", "drugi", "treći", "četvrti", "peti", "šesti", "sedmi", "osmi"
  espb: number;
  type: "obavezan" | "izborni";
  year: 1 | 2 | 3 | 4;
}