import React, { useState, useMemo } from "react";
import { Search, Filter, BookOpen, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";
import { Subject } from "../models/Subject";

const subjectsData: Subject[] = [
  // Prva godina (iz screenshot-a i PDF-a)
  { id: "1", name: "Arhitektura računara i operativni sistemi", semester: "prvi", espb: 6, type: "obavezan", year: 1 },
  { id: "2", name: "Programiranje 1", semester: "prvi", espb: 6, type: "obavezan", year: 1 },
  { id: "3", name: "Upravljanje projektima", semester: "prvi", espb: 5, type: "obavezan", year: 1 },
  { id: "4", name: "Diskretne matematičke strukture", semester: "prvi", espb: 5, type: "obavezan", year: 1 },
  { id: "5", name: "Teorija verovatnoće", semester: "prvi", espb: 6, type: "obavezan", year: 1 },
  { id: "6", name: "Klijentske veb tehnologije i skriptni jezici", semester: "drugi", espb: 6, type: "obavezan", year: 1 },
  { id: "7", name: "Cloud infrastruktura i servisi", semester: "drugi", espb: 5, type: "obavezan", year: 1 },
  { id: "8", name: "Baze podataka", semester: "drugi", espb: 5, type: "obavezan", year: 1 },
  { id: "9", name: "Finansijski menadžment i računovodstvo", semester: "drugi", espb: 5, type: "obavezan", year: 1 },
  { id: "10", name: "Statistika", semester: "drugi", espb: 5, type: "obavezan", year: 1 },
  { id: "11", name: "Strukture podataka i algoritmi", semester: "drugi", espb: 6, type: "obavezan", year: 1 },
  { id: "12", name: "Osnove programiranja", semester: "prvi", espb: 6, type: "obavezan", year: 1 },
  { id: "13", name: "Matematika 2", semester: "drugi", espb: 6, type: "obavezan", year: 1 },
  { id: "14", name: "Programiranje 2", semester: "drugi", espb: 6, type: "obavezan", year: 1 },
  { id: "15", name: "Uvod u informacione sisteme", semester: "drugi", espb: 6, type: "obavezan", year: 1 },

  // Druga godina
  { id: "21", name: "Matematika 3", semester: "treći", espb: 6, type: "obavezan", year: 2 },
  { id: "22", name: "Osnove finansijskog menadžmenta", semester: "treći", espb: 5, type: "obavezan", year: 2 },
  { id: "23", name: "Osnove operacionog menadžmenta", semester: "treći", espb: 5, type: "obavezan", year: 2 },
  { id: "24", name: "Poslovno pravo", semester: "treći", espb: 5, type: "obavezan", year: 2 },
  { id: "25", name: "Pravne osnove informacionih sistema", semester: "treći", espb: 5, type: "obavezan", year: 2 },
  { id: "26", name: "Principi programiranja", semester: "treći", espb: 6, type: "obavezan", year: 2 },
  { id: "27", name: "Uvod u poslovnu analitiku", semester: "treći", espb: 5, type: "izborni", year: 2 },
  { id: "28", name: "Numerička analiza", semester: "četvrti", espb: 5, type: "obavezan", year: 2 },
  { id: "29", name: "Osnove naučnog izračunavanja", semester: "četvrti", espb: 5, type: "izborni", year: 2 },
  { id: "30", name: "Poslovni informacioni sistemi", semester: "četvrti", espb: 6, type: "obavezan", year: 2 },
  { id: "31", name: "Programski jezici", semester: "četvrti", espb: 6, type: "obavezan", year: 2 },
  { id: "32", name: "Upravljačko računovodstvo", semester: "četvrti", espb: 5, type: "obavezan", year: 2 },

  // Treća godina
  { id: "41", name: "Finansijska tržišta", semester: "peti", espb: 5, type: "obavezan", year: 3 },
  { id: "42", name: "Jezici i okruženja za razvoj IS", semester: "peti", espb: 6, type: "obavezan", year: 3 },
  { id: "43", name: "Metrologija i normativno regulisanje kvaliteta", semester: "peti", espb: 5, type: "obavezan", year: 3 },
  { id: "44", name: "Operaciona istraživanja 2", semester: "peti", espb: 6, type: "obavezan", year: 3 },
  { id: "45", name: "Preduzetništvo", semester: "peti", espb: 5, type: "obavezan", year: 3 },
  { id: "46", name: "Programski jezici za analitiku", semester: "peti", espb: 6, type: "izborni", year: 3 },
  { id: "47", name: "Simulacija u poslovnom odlučivanju", semester: "peti", espb: 6, type: "obavezan", year: 3 },
  { id: "48", name: "Upravljanje lancima snabdevanja 1", semester: "peti", espb: 5, type: "obavezan", year: 3 },
  { id: "49", name: "Ekološki menadžment", semester: "šesti", espb: 5, type: "obavezan", year: 3 },
  { id: "50", name: "Inteligentni sistemi", semester: "šesti", espb: 6, type: "obavezan", year: 3 },
  { id: "51", name: "Kontrola kvaliteta", semester: "šesti", espb: 5, type: "obavezan", year: 3 },
  { id: "52", name: "Planiranje kvaliteta", semester: "šesti", espb: 5, type: "obavezan", year: 3 },
  { id: "53", name: "Planiranje proizvodnje i usluga", semester: "šesti", espb: 5, type: "obavezan", year: 3 },
  { id: "54", name: "Programiranje repozitorijuma podataka", semester: "šesti", espb: 6, type: "obavezan", year: 3 },
  { id: "55", name: "Razvoj i održavanje softvera", semester: "šesti", espb: 6, type: "obavezan", year: 3 },
  { id: "56", name: "Serverske veb tehnologije", semester: "šesti", espb: 6, type: "obavezan", year: 3 },
  { id: "57", name: "Upravljanje dokumentacijom", semester: "šesti", espb: 5, type: "izborni", year: 3 },
  { id: "58", name: "Uvod u skladišta podataka", semester: "šesti", espb: 5, type: "izborni", year: 3 },

  // Četvrta godina
  { id: "71", name: "Akreditacija i sertifikacija", semester: "osmi", espb: 6, type: "izborni", year: 4 },
  { id: "72", name: "Analiza pouzdanosti i rizika", semester: "sedmi", espb: 5, type: "izborni", year: 4 },
  { id: "73", name: "Ekonometrijske metode", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "74", name: "ETL i skladišta podataka", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "75", name: "Izborni - Osnove teorije igara", semester: "sedmi", espb: 5, type: "izborni", year: 4 },
  { id: "76", name: "Mašinsko učenje", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "77", name: "Mikroservisna arhitektura IS", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "78", name: "Napredne .NET tehnologije", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "79", name: "Napredne Java tehnologije", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "80", name: "Poslovna analitika", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "81", name: "Strateški menadžment", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "82", name: "Teorija igara", semester: "sedmi", espb: 5, type: "izborni", year: 4 },
  { id: "83", name: "Veštačka inteligencija", semester: "sedmi", espb: 6, type: "obavezan", year: 4 },
  { id: "84", name: "Upravljanje inovacijama", semester: "sedmi", espb: 5, type: "izborni", year: 4 },
  { id: "85", name: "Upravljanje investicijama", semester: "osmi", espb: 5, type: "obavezan", year: 4 },
  { id: "86", name: "Vrednovanje preduzeća", semester: "osmi", espb: 5, type: "obavezan", year: 4 },
  { id: "87", name: "Poslovna inteligencija", semester: "osmi", espb: 6, type: "obavezan", year: 4 }
];

export function PrikazPredmetaView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string>("svi");
  const [selectedYear, setSelectedYear] = useState<string>("sve");
  const [selectedType, setSelectedType] = useState<string>("svi");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search logic
  const filteredSubjects = useMemo(() => {
    return subjectsData.filter((sub) => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSemester = selectedSemester === "svi" || sub.semester === selectedSemester;
      const matchesYear = selectedYear === "sve" || String(sub.year) === selectedYear;
      const matchesType = selectedType === "svi" || sub.type === selectedType;
      return matchesSearch && matchesSemester && matchesYear && matchesType;
    });
  }, [searchQuery, selectedSemester, selectedYear, selectedType]);

  // Reset pagination when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSemester, selectedYear, selectedType]);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubjects = filteredSubjects.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSemester("svi");
    setSelectedYear("sve");
    setSelectedType("svi");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      
      {/* Left Column: Subject Table and Filters */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {/* Card Header & Filter section */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen size={20} className="text-[#1E4C9A]" />
              Prikaz predmeta u trenutnoj godini
            </h2>
            <button 
              onClick={resetFilters}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs rounded-lg transition-colors border border-slate-200 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw size={12} />
              Resetuj filtere
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Pretraži predmete..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 font-medium text-xs rounded-xl py-2.5 pl-9 pr-4 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white placeholder-slate-400 transition-all"
              />
            </div>

            {/* Year Filter */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 font-bold text-xs rounded-xl py-2.5 px-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 10px center', backgroundSize: '14px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="sve">Sve godine studija</option>
                <option value="1">Prva godina</option>
                <option value="2">Druga godina</option>
                <option value="3">Treća godina</option>
                <option value="4">Četvrta godina</option>
              </select>
            </div>

            {/* Semester Filter */}
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 font-bold text-xs rounded-xl py-2.5 px-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 10px center', backgroundSize: '14px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="svi">Svi semestri</option>
                <option value="prvi">prvi semestar</option>
                <option value="drugi">drugi semestar</option>
                <option value="treći">treći semestar</option>
                <option value="četvrti">četvrti semestar</option>
                <option value="peti">peti semestar</option>
                <option value="šesti">šesti semestar</option>
                <option value="sedmi">sedmi semestar</option>
                <option value="osmi">osmi semestar</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-50 text-slate-800 font-bold text-xs rounded-xl py-2.5 px-3 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white transition-all cursor-pointer appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, backgroundPosition: 'right 10px center', backgroundSize: '14px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="svi">Sva predavanja</option>
                <option value="obavezan">Obavezni predmeti</option>
                <option value="izborni">Izborni predmeti</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subjects Table Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between min-h-[480px]">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 select-none">
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider w-[65%] border-r border-slate-200">
                    Naziv predmeta
                  </th>
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider text-center w-[20%] border-r border-slate-200">
                    Semestar
                  </th>
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider text-center w-[15%]">
                    ESPB
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedSubjects.length > 0 ? (
                  paginatedSubjects.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      {/* Name Column */}
                      <td className="py-3 px-5 font-semibold text-xs sm:text-[13px] text-slate-800 border-r border-slate-100">
                        <div className="flex flex-col gap-0.5">
                          <span>{sub.name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5 select-none">
                            <span className={`text-[9px] px-1.5 py-0.5 font-bold rounded uppercase ${
                              sub.type === "obavezan" 
                                ? "bg-blue-50 text-blue-600 border border-blue-100" 
                                : "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}>
                              {sub.type}
                            </span>
                            <span className="text-[9px] px-1.5 py-0.5 font-bold rounded bg-slate-100 text-slate-500 border border-slate-200 uppercase">
                              {sub.year}. godina
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Semester Column */}
                      <td className="py-3 px-5 text-xs font-semibold text-slate-600 text-center border-r border-slate-100">
                        {sub.semester}
                      </td>

                      {/* ESPB Column */}
                      <td className="py-3 px-5 font-bold text-xs sm:text-sm text-slate-700 text-center">
                        <span className="inline-block bg-[#1E4C9A]/5 text-[#1E4C9A] px-2.5 py-0.5 rounded-md min-w-[32px] font-mono">
                          {sub.espb}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-16 text-center text-slate-400 font-medium text-xs">
                      Nema pronađenih predmeta za odabrane kriterijume pretrage.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredSubjects.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
              <span className="text-xs text-slate-500 font-semibold text-center sm:text-left">
                Prikazano <strong className="text-slate-700">{Math.min(filteredSubjects.length, startIndex + 1)}</strong>-
                <strong className="text-slate-700">{Math.min(filteredSubjects.length, startIndex + itemsPerPage)}</strong> od 
                <strong className="text-slate-700"> {filteredSubjects.length}</strong> predmeta
              </span>

              <div className="flex items-center justify-center gap-1.5">
                {/* Previous Button */}
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 px-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 rounded-lg hover:bg-slate-200/50 transition-colors disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Only show surrounding pages if total is high
                  if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                    if (page === 2 || page === totalPages - 1) {
                      return <span key={page} className="text-slate-400 text-xs px-1">...</span>;
                    }
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-7 h-7 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        currentPage === page
                          ? "bg-[#1E4C9A] text-white shadow shadow-[#1E4C9A]/30"
                          : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-800"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1 px-2 text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:hover:text-slate-500 rounded-lg hover:bg-slate-200/50 transition-colors disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Calendar & Emblem */}
      <div className="lg:col-span-4 flex flex-col gap-5 self-stretch">
        <Calendar />
        
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 min-h-[140px]">
          <div className="max-w-[145px] w-full flex items-center justify-center opacity-90">
            <FonLogo />
          </div>
        </div>
      </div>

    </div>
  );
}
