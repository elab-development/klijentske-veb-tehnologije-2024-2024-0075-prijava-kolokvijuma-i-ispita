/**
 * Interface representing the capabilities of the Student Card Manager.
 */
export interface IStudentCardManager {
  /**
   * Parses the student's birth date from their JMBG.
   * JMBG format: DDMMYYYRRRRRR (13 digits)
   */
  parseBirthdateFromJmbg(jmbg: string): string;

  /**
   * Generates a realistic unique ISIC card number based on the student's index and JMBG.
   */
  generateCardNumber(index: string, jmbg: string): string;

  /**
   * Calculates the issuance and validity dates based on the enrollment year from the index.
   */
  calculateDates(index: string): { issued: string; validUntil: string };

  /**
   * Formats the raw card number into the ISIC spaced pattern: S XXX XXX XXX XXX
   */
  formatIsicNumber(cardNumber: string): string;
}

/**
 * Implementation of the Student Card Manager.
 */
export class StudentCardManager implements IStudentCardManager {
  public parseBirthdateFromJmbg(jmbg: string): string {
    if (!jmbg || jmbg.length < 7) {
      return "22/03/2000"; // Fallback default
    }

    const day = jmbg.substring(0, 2);
    const month = jmbg.substring(2, 4);
    const yearPart = jmbg.substring(4, 7);

    let year = parseInt(yearPart, 10);
    if (year >= 900) {
      year += 1000; // e.g. 995 -> 1995
    } else {
      year += 2000; // e.g. 003 -> 2003
    }

    // Basic validity check
    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    if (
      isNaN(d) ||
      isNaN(m) ||
      isNaN(year) ||
      d < 1 ||
      d > 31 ||
      m < 1 ||
      m > 12
    ) {
      return "22/03/2000";
    }

    return `${day}/${month}/${year}`;
  }

  public generateCardNumber(index: string, jmbg: string): string {
    // Generate a semi-stable card number using indices and JMBG
    const cleanIndex = index.replace(/[^0-9]/g, "");
    const cleanJmbg = jmbg.replace(/[^0-9]/g, "");

    const combined = (cleanIndex + cleanJmbg + "1234567890").substring(0, 11);
    return `33225${combined.substring(0, 5)}`;
  }

  public calculateDates(index: string): { issued: string; validUntil: string } {
    // Extract year of entry from index, e.g. "2023/3858" -> 2023
    const match = index.match(/^(\d{4})/);
    const entryYear = match ? parseInt(match[1], 10) : 2023;

    // Virtual cards are typically issued at start of academic year
    const issuedDate = `01/10/${entryYear}`;
    // Valid for 4 years or current academic year. Let's make it valid until next year of current active academic season or a fixed range
    const validUntilDate = `31/10/${entryYear + 1}`;

    return {
      issued: issuedDate,
      validUntil: validUntilDate,
    };
  }

  public formatIsicNumber(cardNumber: string): string {
    // Expected raw input of digits, we format it as S XXX XXX XXX XXX
    const digits = cardNumber.replace(/[^0-9]/g, "");
    const padded = digits.padEnd(12, "0");

    const part1 = padded.substring(0, 3);
    const part2 = padded.substring(3, 6);
    const part3 = padded.substring(6, 9);
    const part4 = padded.substring(9, 12);

    return `S ${part1} ${part2} ${part3} ${part4}`;
  }
}
