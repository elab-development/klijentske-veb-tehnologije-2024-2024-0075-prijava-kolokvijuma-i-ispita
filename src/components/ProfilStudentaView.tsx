import React from "react";
import { User, ShieldCheck } from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";

interface ProfilStudentaViewProps {
  studentName: string;
  studentIndex: string;
}

export function ProfilStudentaView({ studentName, studentIndex }: ProfilStudentaViewProps) {
  // Derive details based on the index or use standard placeholders
  const isDemoUser = studentIndex === "2025/0001" || studentIndex === "2023/3858";
  
  const studentDetails = {
    fullName: studentName,
    parentName: isDemoUser ? "Goran" : "Zoran",
    index: studentIndex,
    jmbg: isDemoUser ? "0206004710034" : "1509003710129",
    email: `${studentName.toLowerCase().replace(/\s+/g, ".")}@is.fon.bg.ac.rs`,
    phone: "+381 64 123 4567",
    studyProgram: "Informacioni sistemi i tehnologije",
    module: "Softversko inženjerstvo",
    financialStatus: "Budžet"
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
      
      {/* Left Column: Administrative Details Card */}
      <div className="lg:col-span-8 flex flex-col gap-4">
        
        {/* Profile Card Container matching screenshot style */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-150 select-none">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2.5">
              Administrativni podaci o studentu
            </h2>
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
              <User size={20} />
            </div>
          </div>

          {/* Table representing exactly the screenshot */}
          <div className="border-2 border-black rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <tbody>
                {/* 1. Ime i prezime */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Ime i prezime
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.fullName}
                  </td>
                </tr>

                {/* 2. Ime jednog roditelja */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Ime jednog roditelja
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.parentName}
                  </td>
                </tr>

                {/* 3. Broj indeksa */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Broj indeksa
                  </td>
                  <td className="w-1/2 py-3 px-4 text-[#1E4C9A] font-bold text-xs sm:text-sm text-center font-mono">
                    {studentDetails.index}
                  </td>
                </tr>

                {/* 4. JMBG */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    JMBG
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center font-mono tracking-wider">
                    {studentDetails.jmbg}
                  </td>
                </tr>

                {/* 5. Email */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Email
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-[11px] sm:text-xs text-center break-all select-all">
                    {studentDetails.email}
                  </td>
                </tr>

                {/* 6. Broj telefona */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Broj telefona
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.phone}
                  </td>
                </tr>

                {/* 7. Studijski program */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Studijski program
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-bold text-xs sm:text-sm text-center">
                    {studentDetails.studyProgram}
                  </td>
                </tr>

                {/* 8. Modul */}
                <tr className="border-b-2 border-black">
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Modul
                  </td>
                  <td className="w-1/2 py-3 px-4 text-slate-800 font-semibold text-xs sm:text-sm text-center">
                    {studentDetails.module}
                  </td>
                </tr>

                {/* 9. Status finansiranja */}
                <tr>
                  <td className="w-1/2 py-3 px-4 font-bold text-slate-900 border-r-2 border-black bg-slate-50/50 text-center text-xs sm:text-sm uppercase tracking-wide select-none">
                    Status finansiranja
                  </td>
                  <td className="w-1/2 py-3 px-4 text-emerald-700 font-extrabold text-xs sm:text-sm text-center">
                    <span className="inline-block bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
                      {studentDetails.financialStatus}
                    </span>
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
