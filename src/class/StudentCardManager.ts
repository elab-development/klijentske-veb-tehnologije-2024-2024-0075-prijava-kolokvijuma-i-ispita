
export interface IStudentCardManager {

  parseBirthdateFromJmbg(jmbg: string): string;


  generateCardNumber(index: string, jmbg: string): string;


  calculateDates(index: string): { issued: string; validUntil: string };


  formatIsicNumber(cardNumber: string): string;
}


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
      year += 1000; 
    } else {
      year += 2000; 
    }

    
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
    
    const cleanIndex = index.replace(/[^0-9]/g, "");
    const cleanJmbg = jmbg.replace(/[^0-9]/g, "");

    const combined = (cleanIndex + cleanJmbg + "1234567890").substring(0, 11);
    return `33225${combined.substring(0, 5)}`;
  }

  public calculateDates(index: string): { issued: string; validUntil: string } {
    
    const match = index.match(/^(\d{4})/);
    const entryYear = match ? parseInt(match[1], 10) : 2023;

    
    const issuedDate = `01/10/${entryYear}`;
    
    const validUntilDate = `31/10/${entryYear + 1}`;

    return {
      issued: issuedDate,
      validUntil: validUntilDate,
    };
  }

  public formatIsicNumber(cardNumber: string): string {
    
    const digits = cardNumber.replace(/[^0-9]/g, "");
    const padded = digits.padEnd(12, "0");

    const part1 = padded.substring(0, 3);
    const part2 = padded.substring(3, 6);
    const part3 = padded.substring(6, 9);
    const part4 = padded.substring(9, 12);

    return `S ${part1} ${part2} ${part3} ${part4}`;
  }
}
