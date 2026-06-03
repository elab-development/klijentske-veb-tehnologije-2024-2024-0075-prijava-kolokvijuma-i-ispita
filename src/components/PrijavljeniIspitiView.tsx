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

interface PrijavljeniIspitiViewProps {
  studentName: string;
  studentIndex: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  registeredExamsKeys: Record<string, boolean>;
  setRegisteredExamsKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  addPaymentRecord: (type: string, amount: string) => void;
  // Shared state of dynamically registered exams in PrijavaIspitaView
  customRegisteredExams: RegisteredExamRow[];
  setCustomRegisteredExams: React.Dispatch<React.SetStateAction<RegisteredExamRow[]>>;
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
  // Initial rows from user's screenshot
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
      // Remove from initial list
      setInitialExams(prev => prev.filter(e => e.id !== toCancel.id));
      // Log transaction
      addPaymentRecord(`Odjava ispita: ${toCancel.name}`, "0");
    } else {
      // Remove from dynamic list
      setCustomRegisteredExams(prev => prev.filter(e => e.id !== toCancel.id));
      
      // Extract Composite Key parts to clear state in PrijavaIspitaView
      // toCancel.id is composite: "periodType-examId"
      setRegisteredExamsKeys(prev => {
        const copy = { ...prev };
        delete copy[toCancel.id];
        return copy;
      });

      // Issue refund if applied
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
      
      {/* Toast Alert Success Display */}
      {successMsg && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn text-left shadow-sm">
          <div className="p-2 bg-red-500 text-white rounded-xl shrink-0">
            <Trash2 size={16} />
          </div>
          <div className="flex-1">
            <p className="font-bold">Ispit uspešno odjavljen</p>
            <p className="font-normal text-red-700 mt-0.5">
              {successMsg.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-red-950">{part}</strong> : part)}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Main interactive list (8 column spans) */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
            
            {/* Subject Period Badge Header */}
            <div className="mb-4 text-left">
              <h2 className="text-lg font-black text-slate-900 border-b pb-2 mb-4 tracking-tight">
                Prva letnja kolokvijumska nedelja
              </h2>
            </div>

            {allAvailableExams.length === 0 ? (
              <div className="py-12 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-3">
                <AlertCircle size={32} className="text-slate-400" />
                <p className="text-slate-800 text-sm font-bold">Nemate trenutno prijavljenih ispita ni kolokvijuma.</p>
                <p className="text-slate-400 text-xs max-w-sm">Idite u sekciju "Prijava ispita" kako biste izabrali rok i prijavili predmete za polaganje.</p>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded border border-black/80">
                <table className="w-full min-w-[580px] border-collapse border border-black text-xs text-slate-900 bg-white">
                  <thead>
                    <tr className="bg-slate-50 border-b border-black">
                      <th className="border border-black font-extrabold text-[#111827] text-left py-3 px-4 uppercase tracking-wider bg-slate-50/50 text-[11px]">Naziv predmeta</th>
                      <th className="border border-black font-extrabold text-[#111827] text-center py-3 px-3 uppercase tracking-wider bg-slate-50/50 text-[11px] w-[60px]">ESPB</th>
                      <th className="border border-black font-extrabold text-[#111827] text-center py-3 px-4 uppercase tracking-wider bg-slate-50/50 text-[11px]">Termin polaganja</th>
                      <th className="border border-black font-extrabold text-[#111827] text-center py-3 px-4 uppercase tracking-wider bg-slate-50/50 text-[11px]">Mesto polaganja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAvailableExams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50/40 border-b border-black/50 transition-all">
                        <td className="border border-black py-3.5 px-4 text-left font-bold text-slate-800 text-[12.5px]">
                          <div className="flex flex-col">
                            <span>{exam.name}</span>
                            {!exam.isInitial && (
                              <span className="text-[9px] text-[#1E4C9A] uppercase tracking-wide font-extrabold mt-0.5">
                                {exam.periodLabel || "Ostali rokovi"}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="border border-black py-3.5 px-3 text-center font-mono font-bold text-slate-705 text-xs">
                          {exam.espb}
                        </td>
                        <td className="border border-black py-3.5 px-4 text-center font-mono text-slate-700 text-xs">
                          {exam.time}
                        </td>
                        <td className="border border-black py-3.5 px-4 text-center font-semibold text-slate-800 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-center w-full">{exam.location}</span>
                            <button
                              onClick={() => handleCancelClick(exam)}
                              className="px-3 py-1 bg-red-650 hover:bg-red-700 text-white rounded font-bold text-[11px] transition-colors cursor-pointer border border-red-800 ml-2"
                              style={{ backgroundColor: "#EF4444" }}
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
            )}

            <div className="mt-4 flex gap-2 items-start text-left text-[11px] text-gray-500 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <Info size={15} className="mt-0.5 text-[#1E4C9A] shrink-0" />
              <div>
                <p className="font-bold text-slate-800 mb-0.5">Automatsko usaglašavanje:</p>
                <p className="leading-relaxed">
                  Podaci o prijavljenim rokovima su sinhronizovani sa centralnim FON e-student servisom. Ukoliko uočite bilo kakve greške u terminima polaganja ili dodeljenim kabinetima/amfiteatrima, kontaktirajte Studentsku službu.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Calendar and FON emblem side column */}
        <div className="lg:col-span-4 flex flex-col gap-6 self-stretch">
          <Calendar />
          
          <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 min-h-[140px]">
            <div className="max-w-[140px] w-full flex items-center justify-center opacity-90">
              <FonLogo />
            </div>
          </div>
        </div>

      </div>

      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {toCancel && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-200 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl shrink-0">
                  <Trash2 size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-[15px] leading-snug">Potvrda odjave ispita</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Da li ste sigurni da želite da odjavite polaganje ovog predmeta?
                  </p>
                  <p className="text-sm font-extrabold text-red-600 mt-2 border-l-4 border-red-500 pl-3">
                    {toCancel.name}
                  </p>
                  {toCancel.price && toCancel.price > 0 ? (
                    <p className="text-[11px] text-emerald-600 font-bold mt-3 leading-relaxed bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                      * Sredstva u iznosu od {toCancel.price.toLocaleString("sr-RS")} RSD biće vraćena na Vašu studentsku karticu odmah.
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setToCancel(null)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer border border-slate-200 text-center"
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
