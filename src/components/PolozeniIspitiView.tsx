import React, { useState, useMemo } from "react";
import { Search, Award, RefreshCw } from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";
import { AcademicRegistry } from "../class/AcademicStats";
import { PassedExam } from "../models/PassedExam";
import { useTheme } from "../context/ThemeContext";

const passedExamsData: PassedExam[] = [
  { id: "1", name: "Principi programiranja", espb: 5, grade: 9, date: "05.08.2025." },
  { id: "2", name: "Matematika 2", espb: 6, grade: 10, date: "04.08.2025." },
  { id: "3", name: "Engleski jezik u informatici", espb: 4, grade: 10, date: "03.08.2025." },
  { id: "4", name: "Psihologija", espb: 5, grade: 10, date: "29.07.2025." },
  { id: "5", name: "Osnove informaciono komunikacionih tehnologija", espb: 6, grade: 10, date: "28.07.2025." },
  { id: "6", name: "Menadžment", espb: 6, grade: 10, date: "27.08.2025." },
  { id: "7", name: "Inženjering procesa", espb: 5, grade: 10, date: "27.07.2025." },
  { id: "8", name: "Uvod u informacione sisteme", espb: 6, grade: 10, date: "26.07.2025." },
  { id: "9", name: "Matematika 1", espb: 6, grade: 10, date: "24.07.2025." },
  { id: "10", name: "Elektronsko poslovanje", espb: 5, grade: 10, date: "24.07.2025." },
  { id: "11", name: "Ekonomija", espb: 6, grade: 10, date: "23.07.2025." }
];

export function PolozeniIspitiView() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useTheme();

  const registry = useMemo(() => new AcademicRegistry(passedExamsData), []);

  const filteredExams = useMemo(() => {
    return registry.filterByName(searchQuery);
  }, [registry, searchQuery]);

  // Calculate totals for currently shown or all using registry class methods
  const totals = useMemo(() => {
    const totalEspb = registry.calculateTotalEspb(filteredExams);
    const averageGrade = registry.calculateAverageGrade(filteredExams);
    return { totalEspb, averageGrade };
  }, [registry, filteredExams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans select-none animate-fadeIn">
      
      {/* Left Column: Passed Exams Table */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {/* Header & Filter Card */}
        <div className={`rounded-2xl p-5 border shadow-sm transition-all duration-300 ${
          isDarkMode ? "bg-[#1E293B]/85 text-white border-slate-800 shadow-black/25" : "bg-white border-slate-200 text-slate-800"
        }`}>
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b ${
            isDarkMode ? "border-slate-800" : "border-slate-100"
          }`}>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Award size={20} className={isDarkMode ? "text-amber-400 animate-pulse" : "text-[#1E4C9A]"} />
              Položeni ispiti
            </h2>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl border shadow-sm transition-all ${
                isDarkMode 
                  ? "bg-gradient-to-r from-amber-500/10 to-amber-400/5 text-amber-300 border-amber-500/30 shadow-amber-950/10" 
                  : "bg-amber-50 text-amber-850 border-amber-200"
              }`}>
                <Award size={14} className="text-amber-400 font-bold" />
                Godišnji prosek: <span className="font-mono text-sm font-black">9.91</span>
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Pretraži položene ispite..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full font-medium text-xs rounded-xl py-2.5 pl-9 pr-4 border focus:outline-none transition-all ${
                  isDarkMode 
                    ? "bg-[#121927] border-slate-800 text-white placeholder-slate-500 focus:ring-1 focus:ring-amber-500 focus:bg-[#121927]" 
                    : "bg-slate-50 border-slate-200 text-slate-808 focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white placeholder-slate-400"
                }`}
              />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className={`px-3 py-1.5 font-semibold text-xs rounded-lg transition-colors border flex items-center gap-1 cursor-pointer ${
                  isDarkMode 
                    ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700" 
                    : "bg-slate-50 hover:bg-slate-100 text-slate-505 border-slate-202"
                }`}
              >
                <RefreshCw size={12} />
                Poništi
              </button>
            )}
          </div>
        </div>

        {/* Table layout exactly as modeled in the physical screenshot */}
        <div className={`rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
          isDarkMode ? "bg-[#1E293B]/85 text-white border-slate-800 shadow-black/35" : "bg-white border-slate-200"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b select-none ${
                  isDarkMode ? "bg-[#131d30] border-slate-800 text-slate-200" : "bg-slate-50 border-slate-202"
                }`}>
                  <th className={`py-3 px-5 text-xs font-extrabold uppercase tracking-wider w-[55%] border-r ${
                    isDarkMode ? "text-slate-300 border-slate-800" : "text-[#111827] border-slate-202"
                  }`}>
                    Naziv predmeta
                  </th>
                  <th className={`py-3 px-5 text-xs font-extrabold uppercase tracking-wider text-center w-[15%] border-r ${
                    isDarkMode ? "text-slate-300 border-slate-800 text-center" : "text-[#111827] border-slate-202"
                  }`}>
                    ESPB
                  </th>
                  <th className={`py-3 px-5 text-xs font-extrabold uppercase tracking-wider text-center w-[15%] border-r ${
                    isDarkMode ? "text-slate-300 border-slate-800 text-center" : "text-[#111827] border-slate-202"
                  }`}>
                    Ocena
                  </th>
                  <th className={`py-3 px-5 text-xs font-extrabold uppercase tracking-wider text-center w-[15%] ${
                    isDarkMode ? "text-slate-200" : "text-[#111827]"
                  }`}>
                    Datum polaganja
                  </th>
                </tr>
              </thead>
              <tbody className={`font-medium ${isDarkMode ? "text-slate-200 divide-y divide-slate-800/60" : "text-slate-700 divide-y divide-slate-100"}`}>
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className={`transition-colors duration-150 ${
                      isDarkMode ? "hover:bg-[#1c273c]/50 bg-[#141d30]/20" : "hover:bg-slate-50/50"
                    }`}>
                      {/* Name Column */}
                      <td className={`py-3 px-5 text-xs sm:text-[13px] font-semibold border-r ${
                        isDarkMode ? "text-slate-200 border-slate-800/80" : "text-slate-800 border-slate-100"
                      }`}>
                        {exam.name}
                      </td>

                      {/* ESPB Column */}
                      <td className={`py-3 px-5 text-xs font-semibold text-center border-r ${
                        isDarkMode ? "text-slate-300 border-slate-800/80" : "text-slate-600 border-slate-100"
                      }`}>
                        <span className={`inline-block px-2 py-0.5 rounded font-mono ${
                          isDarkMode ? "bg-slate-800/40 text-slate-300" : "bg-transparent text-slate-500"
                        }`}>
                          {exam.espb}
                        </span>
                      </td>

                      {/* Grade Column */}
                      <td className={`py-3 px-5 text-sm font-bold text-center border-r ${
                        isDarkMode ? "border-slate-800/80" : "border-slate-100"
                      }`}>
                        {exam.grade === 10 ? (
                          <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-black font-mono shadow-sm ${
                            isDarkMode 
                              ? "bg-amber-400/15 text-amber-300 border border-amber-500/20 shadow-amber-950/20" 
                              : "bg-blue-50 text-[#1E4C9A]"
                          }`}>
                            ★ 10
                          </span>
                        ) : (
                          <span className={`inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono shadow-sm ${
                            isDarkMode 
                              ? "bg-slate-800 text-slate-200 border border-slate-700" 
                              : "bg-slate-50 text-slate-700 border border-slate-200"
                          }`}>
                            {exam.grade}
                          </span>
                        )}
                      </td>

                      {/* Date Column */}
                      <td className={`py-3 px-5 text-xs font-mono text-center ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {exam.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className={`py-12 text-center font-medium text-xs ${isDarkMode ? "text-slate-500" : "text-slate-450"}`}>
                      Nema pronađenih položenih ispita za unetu pretragu.
                    </td>
                  </tr>
                )}
                
                {/* Total Stats Row - exact footer structure like the screenshot */}
                <tr className={`border-t border-t-slate-800 select-none font-bold text-sm ${
                  isDarkMode ? "bg-[#131c30] text-slate-100" : "bg-slate-50 border-slate-202 text-slate-800"
                }`}>
                  <td className={`py-3.5 px-5 text-right uppercase tracking-wider border-r ${
                    isDarkMode ? "border-slate-800 text-slate-400 font-extrabold text-xs" : "border-slate-202"
                  }`}>
                    Ukupno:
                  </td>
                  <td className={`py-3.5 px-5 text-center font-mono border-r text-base ${
                    isDarkMode ? "text-amber-400 border-slate-800 font-extrabold" : "text-[#1E4C9A] border-slate-202"
                  }`}>
                    {totals.totalEspb}
                  </td>
                  <td className={`py-3.5 px-5 text-center font-mono border-r text-base ${
                    isDarkMode ? "text-amber-400 border-slate-800 font-extrabold" : "text-[#1E4C9A] border-slate-202"
                  }`}>
                    {totals.averageGrade}
                  </td>
                  <td className={isDarkMode ? "bg-[#131c30]" : "bg-slate-50"}>
                    {/* Empty block to fill fourth column spacing layout */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Calendar & Emblem */}
      <div className="lg:col-span-4 flex flex-col gap-5 self-stretch">
        <Calendar />
        
        <div className={`flex-1 flex items-center justify-center rounded-2xl shadow p-6 min-h-[140px] border transition-all duration-300 ${
          isDarkMode ? "bg-[#1E293B]/80 border-slate-700/60 shadow-black/25" : "bg-white border hover:border-slate-200 border-slate-202 text-slate-800 shadow"
        }`}>
          <div className="max-w-[145px] w-full flex items-center justify-center opacity-90">
            <FonLogo />
          </div>
        </div>
      </div>

    </div>
  );
}
