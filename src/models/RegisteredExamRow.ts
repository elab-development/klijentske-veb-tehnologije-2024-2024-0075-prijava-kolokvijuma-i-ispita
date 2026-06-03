export interface RegisteredExamRow {
  id: string;
  name: string;
  espb: number;
  time: string;
  location: string;
  isInitial?: boolean; // True for the ones pre-populated on the screenshot
  periodLabel?: string;
  price?: number;
}
