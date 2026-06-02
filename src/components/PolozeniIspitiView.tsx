import React, { useState, useMemo } from "react";
import { Search, Award, RefreshCw } from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";

interface PassedExam {
  id: string;
  name: string;
  espb: number;
  grade: number;
  date: string;
}

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

  const filteredExams = useMemo(() => {
    return passedExamsData.filter((exam) =>
      exam.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate totals for currently shown or all
  const totals = useMemo(() => {
    const list = filteredExams.length > 0 ? filteredExams : [];
    const totalEspb = list.reduce((sum, item) => sum + item.espb, 0);
    const sumGrades = list.reduce((sum, item) => sum + item.grade, 0);
    const averageGrade = list.length > 0 ? (sumGrades / list.length).toFixed(2) : "0.00";
    return { totalEspb, averageGrade };
  }, [filteredExams]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      
      {/* Left Column: Passed Exams Table */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {/* Header & Filter Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 select-none pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Award size={20} className="text-[#1E4C9A]" />
              Položeni ispiti
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 font-extrabold px-2.5 py-1 rounded-lg border border-emerald-100">
                Godišnji prosek: 9.91
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
                className="w-full bg-slate-50 text-slate-800 font-medium text-xs rounded-xl py-2.5 pl-9 pr-4 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1E4C9A] focus:bg-white placeholder-slate-400 transition-all"
              />
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-semibold text-xs rounded-lg transition-colors border border-slate-200 flex items-center gap-1"
              >
                <RefreshCw size={12} />
                Poništi
              </button>
            )}
          </div>
        </div>

        {/* Table layout exactly as modeled in the physical screenshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 select-none">
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider w-[55%] border-r border-slate-200">
                    Naziv predmeta
                  </th>
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider text-center w-[15%] border-r border-slate-200">
                    ESPB
                  </th>
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider text-center w-[15%] border-r border-slate-200">
                    Ocena
                  </th>
                  <th className="py-3 px-5 text-xs font-extrabold text-[#111827] uppercase tracking-wider text-center w-[15%]">
                    Datum polaganja
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name Column */}
                      <td className="py-3 px-5 text-xs sm:text-[13px] font-semibold text-slate-800 border-r border-slate-100">
                        {exam.name}
                      </td>

                      {/* ESPB Column */}
                      <td className="py-3 px-5 text-xs font-semibold text-slate-600 text-center border-r border-slate-100">
                        {exam.espb}
                      </td>

                      {/* Grade Column */}
                      <td className="py-3 px-5 text-sm font-bold text-[#1E4C9A] text-center border-r border-slate-100">
                        <span className="inline-block bg-blue-50 px-2 py-0.5 rounded-md min-w-[24px]">
                          {exam.grade}
                        </span>
                      </td>

                      {/* Date Column */}
                      <td className="py-3 px-5 text-xs text-slate-500 font-mono text-center">
                        {exam.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 font-medium text-xs">
                      Nema pronađenih položenih ispita za unetu pretragu.
                    </td>
                  </tr>
                )}
                
                {/* Total Stats Row - exact footer structure like the screenshot */}
                <tr className="bg-slate-50 border-t-2 border-slate-200 select-none font-bold text-slate-800 text-sm">
                  <td className="py-3.5 px-5 text-right uppercase tracking-wider border-r border-slate-200">
                    Ukupno:
                  </td>
                  <td className="py-3.5 px-5 text-center font-mono border-r border-slate-200 text-[#1E4C9A] text-base">
                    {totals.totalEspb}
                  </td>
                  <td className="py-3.5 px-5 text-center font-mono border-r border-slate-200 text-[#1E4C9A] text-base">
                    {totals.averageGrade}
                  </td>
                  <td className="py-3.5 px-5 bg-slate-50">
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
        
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 min-h-[140px]">
          <div className="max-w-[145px] w-full flex items-center justify-center opacity-90">
            <FonLogo />
          </div>
        </div>
      </div>

    </div>
  );
}
