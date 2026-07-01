import { PassedExam } from "../models/PassedExam";

export class AcademicRegistry {
  private exams: PassedExam[];

  constructor(exams: PassedExam[] = []) {
    this.exams = exams;
  }

 
  public getExams(): PassedExam[] {
    return [...this.exams];
  }

 
  public filterByName(query: string): PassedExam[] {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      return this.exams;
    }
    return this.exams.filter((exam) =>
      exam.name.toLowerCase().includes(cleanQuery)
    );
  }

 
  public calculateTotalEspb(filteredList?: PassedExam[]): number {
    const list = filteredList || this.exams;
    return list.reduce((sum, exam) => sum + exam.espb, 0);
  }

 
  public calculateAverageGrade(filteredList?: PassedExam[]): string {
    const list = filteredList || this.exams;
    if (list.length === 0) {
      return "0.00";
    }
    const sum = list.reduce((acc, exam) => acc + exam.grade, 0);
    return (sum / list.length).toFixed(2);
  }

 
  public getGradeDistribution(): Record<number, number> {
    const distribution: Record<number, number> = { 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
    this.exams.forEach((exam) => {
      if (exam.grade >= 6 && exam.grade <= 10) {
        distribution[exam.grade] = (distribution[exam.grade] || 0) + 1;
      }
    });
    return distribution;
  }


  public static isValidIndex(index: string): boolean {
    const regex = /^\d{4}\/\d{4}$/;
    return regex.test(index);
  }

  
  public static formatCurrency(amount: number): string {
    return amount.toLocaleString("sr-RS", {
      style: "currency",
      currency: "RSD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
