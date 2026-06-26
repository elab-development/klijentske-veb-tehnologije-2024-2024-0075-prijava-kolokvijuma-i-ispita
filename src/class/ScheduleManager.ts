import { ScheduleItem } from "../components/RasporedNastaveView";

// Define Schedule Manager Interface with methods
export interface IScheduleManager {
  filterSchedule(
    items: ScheduleItem[],
    searchQuery: string,
    selectedYear: string,
    selectedGroup: string,
    selectedSubject: string,
  ): ScheduleItem[];

  groupByDay(items: ScheduleItem[]): Record<string, ScheduleItem[]>;

  getAvailableSubjects(items: ScheduleItem[], selectedYear: string): string[];

  getAvailableGroups(items: ScheduleItem[], selectedYear: string): string[];
}

// Implement Schedule Manager Class with methods
export class ScheduleManager implements IScheduleManager {
  public filterSchedule(
    items: ScheduleItem[],
    searchQuery: string,
    selectedYear: string,
    selectedGroup: string,
    selectedSubject: string,
  ): ScheduleItem[] {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesSearch =
        !query ||
        item.subjectName.toLowerCase().includes(query) ||
        item.professor.toLowerCase().includes(query) ||
        item.classroom.toLowerCase().includes(query);

      const matchesYear =
        selectedYear === "sve" || item.year === Number(selectedYear);
      const matchesGroup =
        selectedGroup === "sve" || item.groups.includes(selectedGroup);
      const matchesSubject =
        selectedSubject === "svi" || item.subjectName === selectedSubject;

      return matchesSearch && matchesYear && matchesGroup && matchesSubject;
    });
  }

  public groupByDay(items: ScheduleItem[]): Record<string, ScheduleItem[]> {
    const grouped: Record<string, ScheduleItem[]> = {
      Ponedeljak: [],
      Utorak: [],
      Sreda: [],
      Četvrtak: [],
      Petak: [],
    };

    items.forEach((item) => {
      if (grouped[item.day]) {
        grouped[item.day].push(item);
      }
    });

    // Sort items inside each day by start time
    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => a.timeStart.localeCompare(b.timeStart));
    });

    return grouped;
  }

  public getAvailableSubjects(
    items: ScheduleItem[],
    selectedYear: string,
  ): string[] {
    const filtered = items.filter((item) => {
      if (selectedYear !== "sve" && item.year !== Number(selectedYear))
        return false;
      return true;
    });
    const names = filtered.map((item) => item.subjectName);
    return Array.from(new Set(names)).sort();
  }

  public getAvailableGroups(
    items: ScheduleItem[],
    selectedYear: string,
  ): string[] {
    const filtered = items.filter((item) => {
      if (selectedYear !== "sve" && item.year !== Number(selectedYear))
        return false;
      return true;
    });
    const groupsSet = new Set<string>();
    filtered.forEach((item) => {
      item.groups.forEach((g) => groupsSet.add(g));
    });
    return Array.from(groupsSet).sort((a, b) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
  }
}
