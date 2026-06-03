export interface PassedExam {
  id: string;
  name: string;
  espb: number;
  grade: number;
  date: string;
}

export class AcademicRegistry {
  private exams: PassedExam[];

  constructor(exams: PassedExam[] = []) {
    this.exams = exams;
  }

  /**
   * Returns copy of all passed exams
   */
  public getExams(): PassedExam[] {
    return [...this.exams];
  }

  /**
   * Filters the exams by name
   */
  public filterByName(query: string): PassedExam[] {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      return this.exams;
    }
    return this.exams.filter((exam) =>
      exam.name.toLowerCase().includes(cleanQuery)
    );
  }

  /**
   * Calculates total ESPB points
   */
  public calculateTotalEspb(filteredList?: PassedExam[]): number {
    const list = filteredList || this.exams;
    return list.reduce((sum, exam) => sum + exam.espb, 0);
  }

  /**
   * Calculates average grade (GPA / Prosek)
   */
  public calculateAverageGrade(filteredList?: PassedExam[]): string {
    const list = filteredList || this.exams;
    if (list.length === 0) {
      return "0.00";
    }
    const sum = list.reduce((acc, exam) => acc + exam.grade, 0);
    return (sum / list.length).toFixed(2);
  }

  /**
   * Returns a breakdown of grades (count representation for potential analysis)
   */
  public getGradeDistribution(): Record<number, number> {
    const distribution: Record<number, number> = { 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 };
    this.exams.forEach((exam) => {
      if (exam.grade >= 6 && exam.grade <= 10) {
        distribution[exam.grade] = (distribution[exam.grade] || 0) + 1;
      }
    });
    return distribution;
  }

  /**
   * Checks if index template is fully valid
   */
  public static isValidIndex(index: string): boolean {
    const regex = /^\d{4}\/\d{4}$/;
    return regex.test(index);
  }

  /**
   * Formats local financial currency in RSD representation
   */
  public static formatCurrency(amount: number): string {
    return amount.toLocaleString("sr-RS", {
      style: "currency",
      currency: "RSD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
