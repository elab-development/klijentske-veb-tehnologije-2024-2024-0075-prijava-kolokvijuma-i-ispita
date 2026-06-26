import React, { useState, useMemo } from "react";
import {
  Calendar,
  Search,
  Filter,
  BookOpen,
  Clock,
  User,
  MapPin,
  Users,
  RefreshCw,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Printer,
  Info,
  CalendarDays,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ScheduleManager } from "../class/ScheduleManager";

// Define Schedule Item Interface
export interface ScheduleItem {
  id: string;
  subjectName: string;
  year: number;
  groups: string[]; // e.g. ["G1", "G2", "G3"]
  type: "Predavanje" | "Vežbe";
  professor: string;
  day: "Ponedeljak" | "Utorak" | "Sreda" | "Četvrtak" | "Petak";
  timeStart: string; // "HH:MM"
  timeEnd: string; // "HH:MM"
  classroom: string;
}

// Instantiate the manager
const scheduleManager = new ScheduleManager();

// Complete realistic schedule data based on FON subjects
const scheduleData: ScheduleItem[] = [
  // ==================== PRVA GODINA (A GRUPE) ====================
  // PONEDELJAK
  {
    id: "y1-mon-1",
    subjectName: "Inženjering procesa (NA)",
    year: 1,
    groups: ["A5", "A6", "A7"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y1-mon-2",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A1", "A2", "A3", "A4", "A11", "A12", "A13", "A14"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y1-mon-3",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A6"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 14",
  },
  {
    id: "y1-mon-4",
    subjectName: "Engleski jezik u menadžmentu 1",
    year: 1,
    groups: ["A15", "A16", "A17", "A18"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-mon-5",
    subjectName: "Sociologija",
    year: 1,
    groups: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A14",
    ],
    type: "Vežbe",
    professor: "saradnik Milica Pavlović",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Čitaonica",
  },
  {
    id: "y1-mon-6",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A5"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 13",
  },
  {
    id: "y1-mon-7",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A3", "A4", "A10"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-mon-8",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A5", "A6", "A7"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y1-mon-9",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A1"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 15",
  },
  {
    id: "y1-mon-10",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A2"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 13",
  },
  {
    id: "y1-mon-11",
    subjectName: "Sociologija",
    year: 1,
    groups: ["A11", "A12", "A13", "A14"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Ponedeljak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-mon-12",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A6"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Ponedeljak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Sala 15",
  },
  {
    id: "y1-mon-13",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A7"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Ponedeljak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Sala 13",
  },
  {
    id: "y1-mon-14",
    subjectName: "Psihologija",
    year: 1,
    groups: ["A8", "A9", "A10"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Amfiteatar 1",
  },

  // UTORAK
  {
    id: "y1-tue-1",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A14"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 17",
  },
  {
    id: "y1-tue-2",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A2"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 21",
  },
  {
    id: "y1-tue-3",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A13"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 16",
  },
  {
    id: "y1-tue-4",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A1"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 20",
  },
  {
    id: "y1-tue-5",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A1", "A2", "A3", "A4"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-tue-6",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A5", "A6", "A7"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Utorak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y1-tue-7",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A11", "A12", "A13", "A14"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-tue-8",
    subjectName: "Inženjering procesa (NA)",
    year: 1,
    groups: ["A1", "A2", "A3", "A4"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "16:15",
    timeEnd: "18:00",
    classroom: "Amfiteatar 4",
  },

  // SREDA
  {
    id: "y1-wed-1",
    subjectName: "Principi programiranja",
    year: 1,
    groups: ["A5", "A6", "A7"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y1-wed-2",
    subjectName: "Sociologija",
    year: 1,
    groups: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "A15",
      "A16",
      "A17",
      "A18",
    ],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Sreda",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y1-wed-3",
    subjectName: "Principi programiranja",
    year: 1,
    groups: ["A8", "A9", "A10"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Sreda",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 2",
  },
  {
    id: "y1-wed-4",
    subjectName: "Principi programiranja",
    year: 1,
    groups: ["A7"],
    type: "Vežbe",
    professor: "saradnik Ilija Antović",
    day: "Sreda",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 50",
  },
  {
    id: "y1-wed-5",
    subjectName: "Osnove operacionog menadžmenta",
    year: 1,
    groups: [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "A10",
      "B15",
      "B16",
      "B17",
    ],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Sreda",
    timeStart: "16:15",
    timeEnd: "18:00",
    classroom: "Amfiteatar 4",
  },

  // ČETVRTAK
  {
    id: "y1-thu-1",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A8", "A9", "A10"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 2",
  },
  {
    id: "y1-thu-2",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A1", "A2", "A3", "A4"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Četvrtak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y1-thu-3",
    subjectName: "Matematika 2",
    year: 1,
    groups: ["A15", "A16", "A17", "A18"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Četvrtak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 2",
  },
  {
    id: "y1-thu-4",
    subjectName: "Principi programiranja",
    year: 1,
    groups: ["A1", "A2", "A3", "A4"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Četvrtak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y1-thu-5",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A8", "A9", "A10"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Četvrtak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y1-thu-6",
    subjectName: "Osnove operacionog menadžmenta",
    year: 1,
    groups: ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Četvrtak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Amfiteatar 5",
  },

  // PETAK
  {
    id: "y1-fri-1",
    subjectName: "Engleski jezik u menadžmentu 1",
    year: 1,
    groups: ["A15"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Petak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 15",
  },
  {
    id: "y1-fri-2",
    subjectName: "Uvod u informacione sisteme",
    year: 1,
    groups: ["A5"],
    type: "Vežbe",
    professor: "saradnik Nikola Lukić",
    day: "Petak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 13",
  },

  // ==================== DRUGA GODINA (B GRUPE) ====================
  // PONEDELJAK
  {
    id: "y2-mon-1",
    subjectName: "Statistika",
    year: 2,
    groups: ["B4", "B5"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 21",
  },
  {
    id: "y2-mon-2",
    subjectName: "Strukture podataka i algoritmi",
    year: 2,
    groups: ["B8"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 50",
  },
  {
    id: "y2-mon-3",
    subjectName: "Cloud infrastruktura i servisi",
    year: 2,
    groups: ["B4", "B5", "B6", "B9"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y2-mon-4",
    subjectName: "Baze podataka",
    year: 2,
    groups: ["B1", "B2", "B3", "B8"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y2-mon-5",
    subjectName: "Strukture podataka i algoritmi",
    year: 2,
    groups: ["B4", "B5", "B6", "B9"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Ponedeljak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Amfiteatar 5",
  },

  // UTORAK
  {
    id: "y2-tue-1",
    subjectName: "Inženjering procesa (NA)",
    year: 2,
    groups: ["B15", "B16", "B17"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y2-tue-2",
    subjectName: "Ekonomika poslovanja i planiranje",
    year: 2,
    groups: ["B11", "B12", "B13", "B14"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y2-tue-3",
    subjectName: "Menadžment tehnologije i razvoja (NA)",
    year: 2,
    groups: ["B11", "B12", "B13", "B14"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y2-tue-4",
    subjectName: "Standardizacija",
    year: 2,
    groups: ["B11", "B12", "B13", "B14"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 4",
  },

  // SREDA
  {
    id: "y2-wed-1",
    subjectName: "Finansijski menadžment i računovodstvo",
    year: 2,
    groups: ["B6"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 14",
  },
  {
    id: "y2-wed-2",
    subjectName: "Statistika",
    year: 2,
    groups: ["B1", "B2", "B3"],
    type: "Vežbe",
    professor: "saradnik Nikola Lukić",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y2-wed-3",
    subjectName: "Osnove finansijskog menadžmenta",
    year: 2,
    groups: ["B1", "B2", "B3", "B4", "B5"],
    type: "Vežbe",
    professor: "saradnik Ilija Antović",
    day: "Sreda",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y2-wed-4",
    subjectName: "Osnove finansijskog menadžmenta",
    year: 2,
    groups: ["B1", "B2", "B3", "B4", "B5"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Sreda",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y2-wed-5",
    subjectName: "Uvod u poslovnu analitiku",
    year: 2,
    groups: ["B8"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Sreda",
    timeStart: "16:15",
    timeEnd: "18:00",
    classroom: "Sala 09",
  },

  // ČETVRTAK
  {
    id: "y2-thu-1",
    subjectName: "Standardizacija",
    year: 2,
    groups: ["B15"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 18",
  },
  {
    id: "y2-thu-2",
    subjectName: "Menadžment tehnologije i razvoja (NA)",
    year: 2,
    groups: ["B15"],
    type: "Vežbe",
    professor: "saradnik Milica Pavlović",
    day: "Četvrtak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 18",
  },

  // PETAK
  {
    id: "y2-fri-1",
    subjectName: "Klijentske veb tehnologije i skriptni jezici",
    year: 2,
    groups: ["B6"],
    type: "Vežbe",
    professor: "saradnik Ilija Antović",
    day: "Petak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 60",
  },
  {
    id: "y2-fri-2",
    subjectName: "Osnove operacionog menadžmenta",
    year: 2,
    groups: ["B11", "B12", "B13", "B14"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Petak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 2",
  },
  {
    id: "y2-fri-3",
    subjectName: "Programiranje 2 (NA)",
    year: 2,
    groups: ["B5"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Petak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 19",
  },
  {
    id: "y2-fri-4",
    subjectName: "Interakcija čovek-računar",
    year: 2,
    groups: ["B2", "B3"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Petak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 4",
  },

  // ==================== TREĆA GODINA (C GRUPE) ====================
  // PONEDELJAK
  {
    id: "y3-mon-1",
    subjectName: "Operaciona istraživanja 2",
    year: 3,
    groups: ["C4", "C5"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 2",
  },
  {
    id: "y3-mon-2",
    subjectName: "Zaštita računarskih sistema",
    year: 3,
    groups: ["C2", "C3"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 62",
  },
  {
    id: "y3-mon-3",
    subjectName: "Poslovni informacioni sistemi",
    year: 3,
    groups: ["C13"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 30",
  },
  {
    id: "y3-mon-4",
    subjectName: "Trening i razvoj",
    year: 3,
    groups: ["C17", "C18"],
    type: "Vežbe",
    professor: "saradnik Nikola Lukić",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 16",
  },
  {
    id: "y3-mon-5",
    subjectName: "Serverske veb tehnologije",
    year: 3,
    groups: ["C6"],
    type: "Vežbe",
    professor: "saradnik Ilija Antović",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 40",
  },

  // UTORAK
  {
    id: "y3-tue-1",
    subjectName: "Osnove programiranja",
    year: 3,
    groups: ["C13", "C19", "C21", "C22"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 1",
  },
  {
    id: "y3-tue-2",
    subjectName: "Upravljanje troškovima",
    year: 3,
    groups: ["C11", "C17", "C18"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 15",
  },
  {
    id: "y3-tue-3",
    subjectName: "Sistem menadžmenta kvaliteta",
    year: 3,
    groups: ["C15"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Čitaonica",
  },
  {
    id: "y3-tue-4",
    subjectName: "Odnosi s javnošću",
    year: 3,
    groups: ["C1"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Čitaonica",
  },
  {
    id: "y3-tue-5",
    subjectName: "Metode optimizacije",
    year: 3,
    groups: ["C8"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Utorak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 62",
  },

  // SREDA
  {
    id: "y3-wed-1",
    subjectName: "Upravljanje dokumentacijom",
    year: 3,
    groups: ["C11", "C15", "C21", "C22"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 61",
  },
  {
    id: "y3-wed-2",
    subjectName: "Ekološki menadžment",
    year: 3,
    groups: ["C18"],
    type: "Vežbe",
    professor: "saradnik Marko Janković",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 13",
  },
  {
    id: "y3-wed-3",
    subjectName: "Planiranje kvaliteta",
    year: 3,
    groups: ["C15"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Sreda",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 30",
  },
  {
    id: "y3-wed-4",
    subjectName: "Upravljanje inovacijama",
    year: 3,
    groups: ["C19"],
    type: "Vežbe",
    professor: "saradnik Nikola Lukić",
    day: "Sreda",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 62",
  },

  // ČETVRTAK
  {
    id: "y3-thu-1",
    subjectName: "Operaciona istraživanja 2",
    year: 3,
    groups: ["C11", "C13", "C15", "C17", "C18", "C19", "C21", "C22"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y3-thu-2",
    subjectName: "Metode optimizacije",
    year: 3,
    groups: ["C9"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 08",
  },
  {
    id: "y3-thu-3",
    subjectName: "Ekonometrijske metode",
    year: 3,
    groups: ["C11", "C17", "C18", "C21", "C22"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 4",
  },
  {
    id: "y3-thu-4",
    subjectName: "Metrologija i normativno regulisanje kvaliteta",
    year: 3,
    groups: ["C15"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Četvrtak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 19",
  },
  {
    id: "y3-thu-5",
    subjectName: "Menadžment proizvodnje i pružanja usluga",
    year: 3,
    groups: ["C11", "C17", "C18"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Četvrtak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Čitaonica",
  },

  // PETAK
  {
    id: "y3-fri-1",
    subjectName: "Upravljačko računovodstvo",
    year: 3,
    groups: ["C21", "C22"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Petak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y3-fri-2",
    subjectName: "Programski jezici",
    year: 3,
    groups: ["C4", "C5", "C10"],
    type: "Vežbe",
    professor: "saradnik Ana Kovačević",
    day: "Petak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y3-fri-3",
    subjectName: "Upravljanje kvalitetom projekta",
    year: 3,
    groups: ["C21", "C22"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Petak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 3",
  },
  {
    id: "y3-fri-4",
    subjectName: "Marketing logistika",
    year: 3,
    groups: ["C17", "C18"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Petak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 16",
  },
  {
    id: "y3-fri-5",
    subjectName: "Poslovno pravo",
    year: 3,
    groups: ["C17", "C18"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Petak",
    timeStart: "14:15",
    timeEnd: "16:00",
    classroom: "Sala 06",
  },

  // ==================== ČETVRTA GODINA (D GRUPE) ====================
  // PONEDELJAK
  {
    id: "y4-mon-1",
    subjectName: "Zaštita računarskih sistema",
    year: 4,
    groups: ["D6"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 62",
  },
  {
    id: "y4-mon-2",
    subjectName: "Poslovni informacioni sistemi",
    year: 4,
    groups: ["D1", "D5", "D15"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Ponedeljak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 30",
  },
  {
    id: "y4-mon-3",
    subjectName: "Trening i razvoj",
    year: 4,
    groups: ["D21"],
    type: "Vežbe",
    professor: "saradnik Nikola Lukić",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 16",
  },
  {
    id: "y4-mon-4",
    subjectName:
      "Razvoj naprednih aplikacija elektronskog poslovanja - projekat",
    year: 4,
    groups: ["D4"],
    type: "Vežbe",
    professor: "saradnik Marko Janković",
    day: "Ponedeljak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 60",
  },
  {
    id: "y4-mon-5",
    subjectName: "Trening i razvoj",
    year: 4,
    groups: ["D21"],
    type: "Predavanje",
    professor: "prof. dr Dušan Barać",
    day: "Ponedeljak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 16",
  },

  // UTORAK
  {
    id: "y4-tue-1",
    subjectName: "Međunarodni marketing",
    year: 4,
    groups: ["D17"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 12",
  },
  {
    id: "y4-tue-2",
    subjectName: "Poslovne aplikacije u spredšit okruženju",
    year: 4,
    groups: ["D5", "D13", "D19", "D21"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Utorak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 19",
  },
  {
    id: "y4-tue-3",
    subjectName: "Ekonomika poslovanja i planiranje",
    year: 4,
    groups: ["D1", "D2", "D3", "D4", "D5", "D6"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y4-tue-4",
    subjectName: "Poslovna inteligencija",
    year: 4,
    groups: ["D1", "D2", "D3", "D4", "D5", "D6"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Utorak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Amfiteatar 1",
  },

  // SREDA
  {
    id: "y4-wed-1",
    subjectName: "Virtuelna realnost i računarska simulacija",
    year: 4,
    groups: ["D4"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 11",
  },
  {
    id: "y4-wed-2",
    subjectName: "Neuronske mreže",
    year: 4,
    groups: ["D2", "D6"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Sreda",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 21",
  },
  {
    id: "y4-wed-3",
    subjectName: "Modeli i indikatori poboljšavanja kvaliteta",
    year: 4,
    groups: ["D15"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Sreda",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 08",
  },
  {
    id: "y4-wed-4",
    subjectName: "Duboko učenje i neuronske mreže",
    year: 4,
    groups: ["D3"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Sreda",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Sala 06",
  },

  // ČETVRTAK
  {
    id: "y4-thu-1",
    subjectName: "Ekonomika poslovanja i planiranje",
    year: 4,
    groups: ["D1", "D3", "D5", "D6"],
    type: "Vežbe",
    professor: "saradnik Jelena Tomić",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 21",
  },
  {
    id: "y4-thu-2",
    subjectName: "Analiza pouzdanosti i rizika",
    year: 4,
    groups: ["D5", "D15", "D19"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Četvrtak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 11",
  },
  {
    id: "y4-thu-3",
    subjectName: "Simulacija u poslovnom odlučivanju",
    year: 4,
    groups: ["D5", "D6"],
    type: "Vežbe",
    professor: "saradnik Milica Pavlović",
    day: "Četvrtak",
    timeStart: "10:15",
    timeEnd: "12:00",
    classroom: "Sala 60",
  },
  {
    id: "y4-thu-4",
    subjectName: "Mobilno računarstvo",
    year: 4,
    groups: ["D1", "D2", "D3", "D4", "D5", "D6"],
    type: "Predavanje",
    professor: "prof. dr Siniša Vlajić",
    day: "Četvrtak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 2",
  },

  // PETAK
  {
    id: "y4-fri-1",
    subjectName: "Poslovna analitika",
    year: 4,
    groups: ["D6", "D13", "D15", "D17", "D21"],
    type: "Predavanje",
    professor: "prof. dr Marko Petrović",
    day: "Petak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 62",
  },
  {
    id: "y4-fri-2",
    subjectName: "Osnove računarske inteligencije",
    year: 4,
    groups: ["D5", "D6", "D11", "D17"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Petak",
    timeStart: "08:15",
    timeEnd: "10:00",
    classroom: "Sala 40",
  },
  {
    id: "y4-fri-3",
    subjectName: "Strateški menadžment",
    year: 4,
    groups: ["D21"],
    type: "Predavanje",
    professor: "prof. dr Milan Jovanović",
    day: "Petak",
    timeStart: "12:15",
    timeEnd: "14:00",
    classroom: "Amfiteatar 5",
  },
  {
    id: "y4-fri-4",
    subjectName: "Inteligentni sistemi",
    year: 4,
    groups: ["D1", "D2", "D3", "D4", "D5"],
    type: "Predavanje",
    professor: "prof. dr Bratislav Petrović",
    day: "Petak",
    timeStart: "16:15",
    timeEnd: "18:00",
    classroom: "Amfiteatar 4",
  },
];

const daniUNedelji = [
  "Ponedeljak",
  "Utorak",
  "Sreda",
  "Četvrtak",
  "Petak",
] as const;

export function RasporedNastaveView() {
  const { isDarkMode } = useTheme();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("sve");
  const [selectedGroup, setSelectedGroup] = useState<string>("sve");
  const [selectedSubject, setSelectedSubject] = useState<string>("svi");
  const [viewType, setViewType] = useState<"grid" | "list">("list");

  // Dynamic subjects list based on selected year
  const availableSubjects = useMemo(() => {
    return scheduleManager.getAvailableSubjects(scheduleData, selectedYear);
  }, [selectedYear]);

  // Dynamic groups list based on selected year
  const availableGroups = useMemo(() => {
    return scheduleManager.getAvailableGroups(scheduleData, selectedYear);
  }, [selectedYear]);

  // Handle year change to reset subject and group filters if necessary
  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedSubject("svi"); // reset subject
    setSelectedGroup("sve"); // reset group
  };

  // Filtered Schedule Data
  const filteredSchedule = useMemo(() => {
    return scheduleManager.filterSchedule(
      scheduleData,
      searchQuery,
      selectedYear,
      selectedGroup,
      selectedSubject,
    );
  }, [searchQuery, selectedYear, selectedGroup, selectedSubject]);

  // Group filtered schedule by day for the list view
  const scheduleByDay = useMemo(() => {
    return scheduleManager.groupByDay(filteredSchedule);
  }, [filteredSchedule]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedYear("sve");
    setSelectedGroup("sve");
    setSelectedSubject("svi");
  };

  const printPage = () => {
    window.print();
  };

  const arrowColorHex = isDarkMode ? "%2394A3B8" : "%23475569";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans select-none animate-fadeIn">
      {/* Filters and Controls Card */}
      <div className="lg:col-span-12 flex flex-col gap-4">
        <div
          className={`rounded-2xl p-5 border shadow-sm transition-all duration-300 ${
            isDarkMode
              ? "bg-[#1E293B]/80 text-white border-slate-705/30 shadow-black/25"
              : "bg-white border-slate-200"
          }`}
        >
          {/* Header row */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-3 border-b ${
              isDarkMode ? "border-slate-800" : "border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <CalendarDays
                size={22}
                className={isDarkMode ? "text-amber-400" : "text-[#1E4C9A]"}
              />
              <div>
                <h2 className="text-lg font-bold">Raspored nastave</h2>
                <p
                  className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                >
                  Pratite predavanja i vežbe za sve godine i grupe na FON-u
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* View type switcher */}
              <div
                className={`p-0.5 rounded-xl border flex items-center gap-0.5 ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-100 border-slate-200"
                }`}
              >
                <button
                  onClick={() => setViewType("list")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    viewType === "list"
                      ? isDarkMode
                        ? "bg-amber-400 text-slate-950 shadow"
                        : "bg-[#1E4C9A] text-white shadow"
                      : isDarkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-500 hover:text-slate-850"
                  }`}
                  title="Prikaz po danima"
                >
                  <List size={13} />
                  <span>Po danima</span>
                </button>
                <button
                  onClick={() => setViewType("grid")}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    viewType === "grid"
                      ? isDarkMode
                        ? "bg-amber-400 text-slate-950 shadow"
                        : "bg-[#1E4C9A] text-white shadow"
                      : isDarkMode
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-500 hover:text-slate-850"
                  }`}
                  title="Prikaz tabele"
                >
                  <Grid size={13} />
                  <span>Nedeljni raster</span>
                </button>
              </div>

              {/* Reset filters */}
              <button
                onClick={resetFilters}
                className={`px-3.5 py-2 font-bold text-xs rounded-xl transition-colors border flex items-center gap-1.5 cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                <RefreshCw size={12} />
                <span>Resetuj</span>
              </button>

              {/* Print schedule */}
              <button
                onClick={printPage}
                className={`px-3.5 py-2 font-bold text-xs rounded-xl transition-colors border flex items-center gap-1.5 cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                <Printer size={13} />
                <span>Štampaj</span>
              </button>
            </div>
          </div>

          {/* Filter row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Pretraži po predmetu, profesoru..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-medium text-xs rounded-xl py-2.5 pl-9 pr-4 border focus:outline-none transition-all ${
                  isDarkMode
                    ? "bg-[#121927] border-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-amber-400 focus:bg-[#121927]"
                    : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white"
                }`}
              />
            </div>

            {/* Year of Study Filter */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
                className={`w-full font-bold text-xs rounded-xl py-2.5 px-3 border focus:outline-none transition-all cursor-pointer appearance-none ${
                  isDarkMode
                    ? "bg-[#121927] border-slate-800 text-slate-200 focus:ring-1 focus:ring-amber-400 focus:bg-[#121927]"
                    : "bg-slate-50 border-slate-200 text-slate-805 focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${arrowColorHex}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundPosition: "right 10px center",
                  backgroundSize: "14px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="sve">Sve godine studija</option>
                <option value="1">1. godina</option>
                <option value="2">2. godina</option>
                <option value="3">3. godina</option>
                <option value="4">4. godina</option>
              </select>
            </div>

            {/* Group Filter */}
            <div className="relative">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className={`w-full font-bold text-xs rounded-xl py-2.5 px-3 border focus:outline-none transition-all cursor-pointer appearance-none ${
                  isDarkMode
                    ? "bg-[#121927] border-slate-800 text-slate-200 focus:ring-1 focus:ring-amber-400 focus:bg-[#121927]"
                    : "bg-slate-50 border-slate-200 text-slate-805 focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${arrowColorHex}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundPosition: "right 10px center",
                  backgroundSize: "14px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="sve">Sve grupe</option>
                {availableGroups.map((groupName) => (
                  <option key={groupName} value={groupName}>
                    {groupName}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Filter (dynamic) */}
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className={`w-full font-bold text-xs rounded-xl py-2.5 px-3 border focus:outline-none transition-all cursor-pointer appearance-none ${
                  isDarkMode
                    ? "bg-[#121927] border-slate-800 text-slate-200 focus:ring-1 focus:ring-amber-400 focus:bg-[#121927]"
                    : "bg-slate-50 border-slate-200 text-slate-805 focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${arrowColorHex}' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                  backgroundPosition: "right 10px center",
                  backgroundSize: "14px",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <option value="svi">Svi predmeti</option>
                {availableSubjects.map((subName) => (
                  <option key={subName} value={subName}>
                    {subName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-12">
        {viewType === "list" ? (
          /* List View Grouped by Day */
          <div className="flex flex-col gap-6">
            {daniUNedelji.map((dan) => {
              const dayClasses = scheduleByDay[dan];
              if (dayClasses.length === 0) return null; // Skip days with no matches

              return (
                <div
                  key={dan}
                  className={`rounded-2xl border shadow-sm p-5 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-[#1E293B]/80 text-white border-slate-705/30"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <h3
                    className={`text-sm font-black uppercase tracking-wider mb-4 pb-2 border-b flex items-center gap-2 ${
                      isDarkMode
                        ? "text-amber-400 border-slate-800"
                        : "text-[#1E4C9A] border-slate-100"
                    }`}
                  >
                    <Calendar size={15} />
                    {dan}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDarkMode
                          ? "bg-slate-800 text-slate-400"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {dayClasses.length}{" "}
                      {dayClasses.length === 1
                        ? "čas"
                        : dayClasses.length < 5
                          ? "časa"
                          : "časova"}
                    </span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {dayClasses.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                          isDarkMode
                            ? "bg-[#121c2c]/30 hover:bg-[#121c2c]/60 border-slate-800 hover:border-slate-700"
                            : "bg-slate-50/50 hover:bg-slate-50 border-slate-150 hover:border-slate-200"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2 select-none">
                            <span
                              className={`text-[9px] px-2 py-0.5 font-extrabold rounded-md uppercase border ${
                                item.type === "Predavanje"
                                  ? isDarkMode
                                    ? "bg-blue-950/50 text-blue-400 border-blue-900/40"
                                    : "bg-blue-50 text-blue-600 border border-blue-100"
                                  : isDarkMode
                                    ? "bg-amber-950/40 text-amber-400 border-amber-900/30"
                                    : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                            >
                              {item.type}
                            </span>
                            <span
                              className={`text-[10px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                            >
                              {item.year}. godina
                            </span>
                          </div>

                          <h4 className="text-[13px] font-extrabold tracking-tight mb-2 leading-snug">
                            {item.subjectName}
                          </h4>

                          <div className="flex flex-col gap-1.5 text-xs">
                            <div
                              className={`flex items-center gap-2 ${isDarkMode ? "text-slate-350" : "text-slate-600"}`}
                            >
                              <Clock
                                size={12}
                                className="shrink-0 text-slate-400"
                              />
                              <span className="font-mono font-bold">
                                {item.timeStart} - {item.timeEnd}
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-2 ${isDarkMode ? "text-slate-350" : "text-slate-600"}`}
                            >
                              <User
                                size={12}
                                className="shrink-0 text-slate-400"
                              />
                              <span className="font-medium truncate">
                                {item.professor}
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-2 ${isDarkMode ? "text-slate-350" : "text-slate-600"}`}
                            >
                              <MapPin
                                size={12}
                                className="shrink-0 text-slate-400"
                              />
                              <span className="font-bold">
                                {item.classroom}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`mt-3 pt-2 border-t flex items-center justify-between ${
                            isDarkMode ? "border-slate-800" : "border-slate-150"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <Users size={11} className="text-slate-400" />
                            <span
                              className={`text-[10px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                            >
                              Grupe:
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.groups.map((g) => (
                              <span
                                key={g}
                                className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                                  isDarkMode
                                    ? "bg-slate-800 text-slate-300"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Check if absolutely nothing matched */}
            {filteredSchedule.length === 0 && (
              <div
                className={`rounded-2xl border p-12 text-center transition-all duration-300 ${
                  isDarkMode
                    ? "bg-[#1E293B]/80 text-white border-slate-705/30"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={`p-4 rounded-full ${isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-50 text-slate-400"}`}
                  >
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-base font-bold">
                    Nema pronađenih predavanja
                  </h3>
                  <p
                    className={`text-xs max-w-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                  >
                    Nema nastave koja odgovara zadatim filterima. Probajte da
                    izaberete drugu grupu ili godinu studija.
                  </p>
                  <button
                    onClick={resetFilters}
                    className={`mt-2 px-4 py-2 font-bold text-xs rounded-xl text-white transition-colors cursor-pointer ${
                      isDarkMode
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950"
                        : "bg-[#1E4C9A] hover:bg-[#153B78]"
                    }`}
                  >
                    Resetuj pretragu
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Weekly Grid View */
          <div
            className={`rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${
              isDarkMode
                ? "bg-[#1E293B]/80 text-white border-slate-705/30"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr
                    className={`border-b select-none ${
                      isDarkMode
                        ? "bg-[#162135] border-slate-800 text-slate-200"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <th
                      className={`py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-center w-[10%] border-r ${
                        isDarkMode
                          ? "text-slate-200 border-slate-800"
                          : "text-[#111827] border-slate-200"
                      }`}
                    >
                      Vreme
                    </th>
                    {daniUNedelji.map((dan) => (
                      <th
                        key={dan}
                        className={`py-3 px-4 text-xs font-extrabold uppercase tracking-wider text-center w-[18%] border-r last:border-r-0 ${
                          isDarkMode
                            ? "text-slate-200 border-slate-800"
                            : "text-[#111827] border-slate-200"
                        }`}
                      >
                        {dan}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className={`divide-y font-medium text-xs ${
                    isDarkMode ? "divide-slate-800/80" : "divide-slate-100"
                  }`}
                >
                  {/* We map typical time slots */}
                  {[
                    "08:15 - 10:00",
                    "10:15 - 12:00",
                    "12:15 - 14:00",
                    "14:15 - 16:00",
                    "16:15 - 18:00",
                    "18:15 - 20:00",
                  ].map((slotRange, slotIdx) => {
                    const startHour = slotRange.split(" - ")[0];

                    return (
                      <tr
                        key={slotRange}
                        className={
                          isDarkMode ? "bg-[#121c2c]/5" : "bg-transparent"
                        }
                      >
                        {/* Time label */}
                        <td
                          className={`py-6 px-3 text-center font-mono font-bold border-r ${
                            isDarkMode
                              ? "text-slate-400 border-slate-800"
                              : "text-slate-500 border-slate-150"
                          }`}
                        >
                          {slotRange}
                        </td>

                        {/* Days slots */}
                        {daniUNedelji.map((dan) => {
                          // Find items on this day starting within this time interval
                          const slotItems = filteredSchedule.filter((item) => {
                            if (item.day !== dan) return false;

                            // Simple match: does it start at the exact startHour or overlap?
                            return item.timeStart === startHour;
                          });

                          return (
                            <td
                              key={dan}
                              className={`p-2 border-r last:border-r-0 vertical-top h-full ${
                                isDarkMode
                                  ? "border-slate-800"
                                  : "border-slate-150"
                              }`}
                            >
                              <div className="flex flex-col gap-2 h-full justify-center">
                                {slotItems.map((item) => (
                                  <div
                                    key={item.id}
                                    className={`rounded-lg border p-2.5 transition-all flex flex-col justify-between ${
                                      item.type === "Predavanje"
                                        ? isDarkMode
                                          ? "bg-blue-950/25 border-blue-900/35 hover:bg-blue-950/40"
                                          : "bg-blue-50/70 border-blue-100 hover:bg-blue-50"
                                        : isDarkMode
                                          ? "bg-amber-950/20 border-amber-900/30 hover:bg-amber-950/35"
                                          : "bg-amber-50/60 border-amber-100 hover:bg-amber-50"
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between gap-1 mb-1.5">
                                        <span
                                          className={`text-[8px] px-1 py-0.5 font-black uppercase rounded ${
                                            item.type === "Predavanje"
                                              ? isDarkMode
                                                ? "text-blue-400 bg-blue-900/10"
                                                : "text-blue-600 bg-blue-100/50"
                                              : isDarkMode
                                                ? "text-amber-400 bg-amber-900/10"
                                                : "text-amber-600 bg-amber-100/50"
                                          }`}
                                        >
                                          {item.type}
                                        </span>
                                        <span
                                          className={`text-[8px] font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                                        >
                                          G:{item.groups[0]}
                                          {item.groups.length > 1
                                            ? `+${item.groups.length - 1}`
                                            : ""}
                                        </span>
                                      </div>
                                      <h5
                                        className="text-[11px] font-black leading-tight tracking-tight mb-1 truncate"
                                        title={item.subjectName}
                                      >
                                        {item.subjectName}
                                      </h5>
                                      <div
                                        className={`text-[10px] font-bold mb-1 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                                      >
                                        {item.classroom}
                                      </div>
                                    </div>
                                    <div
                                      className="text-[9px] text-slate-400 truncate"
                                      title={item.professor}
                                    >
                                      {item.professor.split(". ").pop()}
                                    </div>
                                  </div>
                                ))}
                                {slotItems.length === 0 && (
                                  <div className="text-center py-2 text-[10px] text-slate-400 font-medium italic select-none">
                                    -
                                  </div>
                                )}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
