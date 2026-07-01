import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trash2, 
  CheckCircle, 
  Info, 
  FileText, 
  HelpCircle,
  Clock,
  MapPin,
  AlertCircle
} from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";
import { RegisteredExamRow } from "../models/RegisteredExamRow";
import { useTheme } from "../context/ThemeContext";

interface PrijavljeniIspitiViewProps {
  studentName: string;
  studentIndex: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  registeredExamsKeys: Record<string, boolean>;
  setRegisteredExamsKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  addPaymentRecord: (type: string, amount: string) => void;
  
  customRegisteredExams: RegisteredExamRow[];
  setCustomRegisteredExams: React.Dispatch<React.SetStateAction<React.SetStateAction<RegisteredExamRow[]>>>;
}

export function PrijavljeniIspitiView({
  studentName,
  studentIndex,
  accountBalance,
  setAccountBalance,
  registeredExamsKeys,
  setRegisteredExamsKeys,
  addPaymentRecord,
  customRegisteredExams,
  setCustomRegisteredExams
}: PrijavljeniIspitiViewProps) {
  const { isDarkMode } = useTheme();
  
  const [initialExams, setInitialExams] = useState<RegisteredExamRow[]>([
    { id: "init-1", name: "Cloud infrastruktura i servisi", espb: 6, time: "11.5.2026. 8h", location: "Kabinet 51", isInitial: true },
    { id: "init-2", name: "Struktura podataka i algoritmi", espb: 6, time: "12.5.2026. 15h", location: "Kabinet 51", isInitial: true },
    { id: "init-3", name: "Klijentske veb tehnologije i skriptni jezici", espb: 6, time: "14.5.2026. 11h", location: "Kabinet 62", isInitial: true },
    { id: "init-4", name: "Statistika", espb: 5, time: "20.5.2026. 14h", location: "Amfiteatar 2", isInitial: true },
    { id: "init-5", name: "Finansijski menadžment i računovodstvo", espb: 5, time: "22.5.2026. 15h", location: "Amfiteatar 2", isInitial: true },
  ]);

  const [toCancel, setToCancel] = useState<RegisteredExamRow | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleCancelClick = (row: RegisteredExamRow) => {
    setToCancel(row);
  };

  const handleConfirmCancel = () => {
    if (!toCancel) return;

    if (toCancel.isInitial) {
      
      setInitialExams(prev => prev.filter(e => e.id !== toCancel.id));
      
      addPaymentRecord(`Odjava ispita: ${toCancel.name}`, "0");
    } else {
      
      setCustomRegisteredExams(prev => prev.filter(e => e.id !== toCancel.id));
      
      
      
      setRegisteredExamsKeys(prev => {
        const copy = { ...prev };
        delete copy[toCancel.id];
        return copy;
      });

      
      if (toCancel.price && toCancel.price > 0) {
        setAccountBalance(prev => prev + (toCancel.price || 0));
        addPaymentRecord(`Refundacija (Odjava): ${toCancel.name}`, `+${toCancel.price}`);
      } else {
        addPaymentRecord(`Odjava kolokvijuma: ${toCancel.name}`, "0");
      }
    }

    setSuccessMsg(`Uspešno ste odjavili: **${toCancel.name}**.`);
    setToCancel(null);

    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  const allAvailableExams = [...initialExams, ...customRegisteredExams];

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn select-none">
      
      {}
      {successMsg && (
        <div className={`border rounded-2xl p-4 text-xs font-semibold flex items-center gap-3 animate-fadeIn text-left shadow-sm ${
          isDarkMode ? "bg-red-950/40 border-red-900/40 text-red-400" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="p-2 bg-red-550 bg-red-500 text-white rounded-xl shrink-0">
            <Trash2 size={16} />
          </div>
          <div className="flex-1">
            <p className="font-bold">Ispit uspešno odjavljen</p>
            <p className={`font-normal mt-0.5 ${isDarkMode ? "text-red-300" : "text-red-700"}`}>
              {successMsg.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className={isDarkMode ? "font-bold text-white shadow-sm":"font-bold text-red-950"}>{part}</strong> : part)}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:min-h-[calc(100vh-210px)]">
        
        {}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className={`rounded-2xl p-6 shadow border transition-all duration-300 ${
            isDarkMode ? "bg-[#1E293B]/80 text-white border-slate-750/30 shadow-black/35" : "bg-white border-slate-200"
          }`}>
            
            {}
            <div className="mb-4 text-left">
              <h2 className={`text-lg font-black border-b pb-2 mb-4 tracking-tight ${
                isDarkMode ? "text-white border-slate-800" : "text-slate-900 border-slate-100"
              }`}>
                Prva letnja kolokvijumska nedelja
              </h2>
            </div>

            {allAvailableExams.length === 0 ? (
              <div className={`py-12 px-4 text-center border-2 border-dashed rounded-2xl flex flex-col items-center gap-3 ${
                isDarkMode ? "border-slate-850 bg-slate-900/10 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-800"
              }`}>
                <AlertCircle size={32} className="text-slate-404" />
                <p className={`text-sm font-bold ${isDarkMode ? "text-slate-350" : "text-slate-800"}`}>Nemate trenutno prijavljenih ispita ni kolokvijuma.</p>
                <p className="text-slate-400 text-xs max-w-sm">Idite u sekciju "Prijava ispita" kako biste izabrali rok i prijavili predmete za polaganje.</p>
              </div>
            ) : (
              <>
                {}
                <div className="hidden md:block w-full overflow-x-auto rounded border border-black/30">
                  <table className={`w-full min-w-[580px] border-collapse text-xs ${
                    isDarkMode ? "bg-[#141c2c] text-slate-100" : "bg-white text-slate-900"
                  }`}>
                    <thead>
                      <tr className={`border-b ${
                        isDarkMode ? "bg-[#162135] border-slate-800 text-slate-200" : "bg-slate-50 border-black"
                      }`}>
                        <th className={`border font-extrabold text-left py-3 px-4 uppercase tracking-wider text-[11px] ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50/50"}`}>Naziv predmeta</th>
                        <th className={`border font-extrabold text-center py-3 px-3 uppercase tracking-wider text-[11px] w-[60px] ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50/50"}`}>ESPB</th>
                        <th className={`border font-extrabold text-center py-3 px-4 uppercase tracking-wider text-[11px] ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50/50"}`}>Termin polaganja</th>
                        <th className={`border font-extrabold text-center py-3 px-4 uppercase tracking-wider text-[11px] ${isDarkMode ? "border-slate-800 bg-[#162135]" : "border-black bg-slate-50/50"}`}>Mesto polaganja</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAvailableExams.map((exam) => (
                        <tr key={exam.id} className={`border-b transition-all ${
                          isDarkMode 
                            ? "hover:bg-[#1f2c41] bg-slate-900/15 border-slate-800" 
                            : "hover:bg-slate-50/40 border-b border-black/50"
                        }`}>
                          <td className={`border py-3.5 px-4 text-left font-bold text-[12.5px] ${isDarkMode ? "border-slate-800 text-slate-200" : "border-black text-slate-800"}`}>
                            <div className="flex flex-col">
                              <span>{exam.name}</span>
                              {!exam.isInitial && (
                                <span className={`text-[9px] uppercase tracking-wide font-extrabold mt-0.5 ${isDarkMode ? "text-[#5E97F6]":"text-[#1E4C9A]"}`}>
                                  {exam.periodLabel || "Ostali rokovi"}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className={`border py-3.5 px-3 text-center font-mono font-bold text-xs ${isDarkMode ? "border-slate-800 text-slate-350" : "border-black text-slate-705"}`}>
                            {exam.espb}
                          </td>
                          <td className={`border py-3.5 px-4 text-center font-mono text-xs ${isDarkMode ? "border-slate-800 text-slate-300" : "border-black text-slate-700"}`}>
                            {exam.time}
                          </td>
                          <td className={`border py-3.5 px-4 text-center font-semibold text-xs ${isDarkMode ? "border-slate-800 text-slate-200" : "border-black text-slate-805"}`}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-center w-full">{exam.location}</span>
                              <button
                                onClick={() => handleCancelClick(exam)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-[11px] transition-colors cursor-pointer border border-red-800 ml-2"
                              >
                                Odjavi
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {}
                <div className="block md:hidden space-y-4">
                  {allAvailableExams.map((exam) => (
                    <div 
                      key={exam.id}
                      className={`rounded-xl border p-4 transition-all duration-300 shadow-sm text-left ${
                        isDarkMode 
                          ? "bg-[#141c2c]/75 border-slate-800 text-slate-100" 
                          : "bg-slate-50/50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="text-left">
                          <h4 className="font-extrabold text-sm leading-snug">{exam.name}</h4>
                          {!exam.isInitial && (
                            <span className={`inline-block text-[9px] uppercase tracking-wide font-extrabold mt-1 px-1.5 py-0.5 rounded border ${
                              isDarkMode 
                                ? "bg-blue-950/40 text-[#5E97F6] border-blue-900/30"
                                : "bg-blue-50 text-[#1E4C9A] border-blue-100"
                            }`}>
                              {exam.periodLabel || "Ostali rokovi"}
                            </span>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`inline-block px-2.5 py-0.5 rounded-md font-mono font-bold text-xs ${
                            isDarkMode 
                              ? "bg-amber-400/10 text-amber-400" 
                              : "bg-[#1E4C9A]/5 text-[#1E4C9A]"
                          }`}>
                            {exam.espb} ESPB
                          </span>
                        </div>
                      </div>

                      <div className={`mt-3 pt-2.5 border-t flex flex-col gap-2 text-xs ${
                        isDarkMode ? "border-slate-800/70 text-slate-400" : "border-slate-200 text-slate-500"
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[11px]">Termin:</span>
                          <span className="font-bold font-mono text-slate-750 dark:text-slate-300">{exam.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-[11px]">Mesto polaganja:</span>
                          <span className="font-semibold text-slate-750 dark:text-slate-300">{exam.location}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleCancelClick(exam)}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-xs transition-all cursor-pointer border border-red-700 shadow-sm active:scale-95"
                        >
                          Odjavi ispit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className={`mt-4 flex gap-2 items-start text-left text-[11px] border rounded-xl p-3.5 ${
              isDarkMode 
                ? "bg-[#111a30] border-slate-800/85 text-slate-450" 
                : "bg-slate-50 border-slate-150 text-gray-500"
            }`}>
              <Info size={15} className={`mt-0.5 shrink-0 ${isDarkMode ? "text-amber-400" : "text-[#1E4C9A]"}`} />
              <div>
                <p className={`font-bold mb-0.5 ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>Automatsko usaglašavanje:</p>
                <p className="leading-relaxed">
                  Podaci o prijavljenim rokovima su sinhronizovani sa centralnim FON e-student servisom. Ukoliko uočite bilo kakve greške u terminima polaganja ili dodeljenim kabinetima/amfiteatrima, kontaktirajte Studentsku službu.
                </p>
              </div>
            </div>

          </div>
        </div>

        {}
        <div className="lg:col-span-4 flex flex-col gap-6 self-stretch w-full max-w-[340px] mx-auto lg:mr-0 lg:ml-auto animate-fadeIn">
          <Calendar />
          
          <div className="flex-grow" />
          
          <div className={`flex items-center justify-center rounded-2xl shadow p-6 min-h-[140px] border transition-all duration-300 w-full ${
            isDarkMode ? "bg-[#1E293B]/80 border-slate-700/60 shadow-black/20" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="max-w-[140px] w-full flex items-center justify-center opacity-90">
              <FonLogo />
            </div>
          </div>
        </div>

      </div>

      {}
      <AnimatePresence>
        {toCancel && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border text-left flex flex-col transition-all duration-300 ${
                isDarkMode 
                  ? "bg-[#1E293B] border-slate-750/60 text-white shadow-black/45" 
                  : "bg-white border-slate-200 text-slate-810"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl shrink-0">
                  <Trash2 size={22} />
                </div>
                <div>
                  <h3 className={`font-extrabold text-[15px] leading-snug ${isDarkMode ? "text-white" : "text-slate-900"}`}>Potvrda odjave ispita</h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Da li ste sigurni da želite da odjavite polaganje ovog predmeta?
                  </p>
                  <p className="text-sm font-extrabold text-red-500 mt-2 border-l-4 border-red-500 pl-3 font-semibold">
                    {toCancel.name}
                  </p>
                  {toCancel.price && toCancel.price > 0 ? (
                    <p className={`text-[11px] font-bold mt-3 leading-relaxed border p-2 rounded-lg ${
                      isDarkMode 
                        ? "bg-emerald-950/40 text-emerald-450 border-emerald-900/50" 
                        : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}>
                      * Sredstva u iznosu od {toCancel.price.toLocaleString("sr-RS")} RSD biće vraćena na Vašu studentsku karticu odmah.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setToCancel(null)}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer border text-center ${
                    isDarkMode 
                      ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white" 
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                  }`}
                >
                  Odustani
                </button>
                <button
                  onClick={handleConfirmCancel}
                  className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer text-center"
                >
                  Potvrdi odjavu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
