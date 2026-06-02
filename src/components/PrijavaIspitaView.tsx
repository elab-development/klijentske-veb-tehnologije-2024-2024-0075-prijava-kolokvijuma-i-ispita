import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  CheckCircle, 
  Info, 
  ClipboardCheck, 
  Layers, 
  BookOpen, 
  Award, 
  AlertTriangle,
  HelpCircle
} from "lucide-react";
import { Calendar } from "./Calendar";
import { FonLogo } from "./FonLogo";

export interface Exam {
  id: string;
  name: string;
  code: string;
  espb: number;
  date: string;
  baseRegistrations: number;
  price: number;
}

export type PeriodType = "druga-kolokvijumska" | "junski-rok" | "julski-rok";

interface PrijavaIspitaViewProps {
  studentName: string;
  studentIndex: string;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
  registeredExamsKeys: Record<string, boolean>;
  setRegisteredExamsKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  addPaymentRecord: (type: string, amount: string) => void;
}

// Fixed rosters for each period
const ROSTERS: Record<PeriodType, Exam[]> = {
  "druga-kolokvijumska": [
    { id: "mat1", name: "Matematika 1", code: "322001", espb: 6, date: "12.06.2026.", baseRegistrations: 1, price: 0 },
    { id: "prog1", name: "Programiranje 1", code: "220031", espb: 6, date: "15.06.2026.", baseRegistrations: 1, price: 0 },
    { id: "mat2", name: "Matematika 2", code: "322011", espb: 6, date: "14.06.2026.", baseRegistrations: 0, price: 0 },
    { id: "eko", name: "Ekonomija", code: "322002", espb: 6, date: "18.06.2026.", baseRegistrations: 2, price: 0 },
    { id: "stat", name: "Statistika", code: "220013", espb: 6, date: "17.06.2026.", baseRegistrations: 1, price: 0 },
  ],
  "junski-rok": [
    { id: "mat1", name: "Matematika 1", code: "322001", espb: 6, date: "20.06.2026.", baseRegistrations: 1, price: 1000 },
    { id: "prog1", name: "Programiranje 1", code: "220031", espb: 6, date: "22.06.2026.", baseRegistrations: 0, price: 1000 },
    { id: "mat2", name: "Matematika 2", code: "322011", espb: 6, date: "24.06.2026.", baseRegistrations: 2, price: 1000 },
    { id: "eko", name: "Ekonomija", code: "322002", espb: 6, date: "26.06.2026.", baseRegistrations: 1, price: 1000 },
    { id: "stat", name: "Statistika", code: "220013", espb: 6, date: "28.06.2026.", baseRegistrations: 1, price: 1000 },
  ],
  "julski-rok": [
    { id: "mat1", name: "Matematika 1", code: "322001", espb: 6, date: "05.08.2025.", baseRegistrations: 1, price: 1000 },
    { id: "prog1", name: "Programiranje 1", code: "220031", espb: 6, date: "04.08.2025.", baseRegistrations: 1, price: 1000 },
    { id: "mat2", name: "Matematika 2", code: "322011", espb: 6, date: "03.08.2025.", baseRegistrations: 0, price: 1000 },
    { id: "eko", name: "Ekonomija", code: "322002", espb: 6, date: "29.07.2025.", baseRegistrations: 2, price: 1000 },
    { id: "stat", name: "Statistika", code: "220013", espb: 6, date: "28.07.2025.", baseRegistrations: 1, price: 1000 },
  ]
};

export function PrijavaIspitaView({
  studentName,
  studentIndex,
  accountBalance,
  setAccountBalance,
  registeredExamsKeys,
  setRegisteredExamsKeys,
  addPaymentRecord
}: PrijavaIspitaViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType | null>(null);
  
  // Dialog / Modal alerts
  const [confirmExam, setConfirmExam] = useState<Exam | null>(null);
  const [balanceErrorExam, setBalanceErrorExam] = useState<Exam | null>(null);
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  const getPeriodLabel = (type: PeriodType) => {
    switch (type) {
      case "druga-kolokvijumska": return "Druga kolokvijumska nedelja";
      case "junski-rok": return "Junski ispitni rok";
      case "julski-rok": return "Julski ispitni rok";
    }
  };

  const getCompositeKey = (period: PeriodType, examId: string) => {
    return `${period}-${examId}`;
  };

  const handlePrijaviClick = (exam: Exam) => {
    if (!selectedPeriod) return;
    const isRegistered = registeredExamsKeys[getCompositeKey(selectedPeriod, exam.id)];
    if (isRegistered) return;

    // Validation: check finance
    if (exam.price > 0 && accountBalance < exam.price) {
      setBalanceErrorExam(exam);
    } else {
      setConfirmExam(exam);
    }
  };

  const handleConfirmRegistration = () => {
    if (!selectedPeriod || !confirmExam) return;

    const key = getCompositeKey(selectedPeriod, confirmExam.id);
    const price = confirmExam.price;

    setRegisteredExamsKeys(prev => ({
      ...prev,
      [key]: true
    }));

    if (price > 0) {
      setAccountBalance(prev => Math.max(0, prev - price));
      // Log payment transaction under Stanje na računu history
      addPaymentRecord(`Prijava ispita: ${confirmExam.name} (${getPeriodLabel(selectedPeriod)})`, `-${price}`);
    } else {
      // Free colloquium has zero balance subtraction but we can log the registration row
      addPaymentRecord(`Prijava kolokvijuma: ${confirmExam.name} (Slobodan unos)`, "0");
    }

    setSuccessInfo(`Uspešno ste prijavili predmet: **${confirmExam.name}** za **${getPeriodLabel(selectedPeriod)}**!`);
    setConfirmExam(null);

    setTimeout(() => {
      setSuccessInfo(null);
    }, 5000);
  };

  const formatBalance = (val: number) => {
    return val.toLocaleString("sr-RS", { minimumFractionDigits: 2 }) + " RSD";
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn select-none">
      
      {/* Visual Success Announcement */}
      {successInfo && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn text-left shadow-sm">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shrink-0">
            <CheckCircle size={16} />
          </div>
          <div className="flex-1">
            <p className="font-bold">Prijava potvrđena</p>
            <p className="font-normal text-emerald-700/95 mt-0.5">
              {successInfo.split("**").map((part, i) => i % 2 === 1 ? <strong key={i} className="font-bold text-emerald-950">{part}</strong> : part)}
            </p>
          </div>
        </div>
      )}

      {/* Screen A: Select Period (Preporučeni izbor pre prikaza liste) */}
      <AnimatePresence mode="wait">
        {!selectedPeriod ? (
          <motion.div
            key="selection-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 w-full text-center"
          >
            {/* Header info selection card */}
            <div className="bg-white rounded-2xl shadow border border-slate-200 p-6 flex flex-col items-center gap-2 text-center">
              <div className="p-3 bg-blue-50 text-[#1E4C9A] rounded-2xl mb-1">
                <ClipboardCheck size={32} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Prijava ispitnih rokova i kolokvijuma</h2>
              <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                Dobrodošli u modul za prijavu ispita. Pre pristupa listi predmeta, molimo odaberite aktivan rok u kom želite da polažete predispitne obaveze ili ispite:
              </p>
              
              <div className="mt-2 bg-slate-50 px-4 py-2 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-bold text-slate-700">
                <span>Tekuće stanje na Vašem računu:</span>
                <span className="text-[#1E4C9A] text-sm">{formatBalance(accountBalance)}</span>
              </div>
            </div>

            {/* Grid of the three options requested by the user */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              
              {/* Option 1: Druga kolokvijumska nedelja */}
              <div 
                onClick={() => setSelectedPeriod("druga-kolokvijumska")}
                className="bg-white border-2 border-transparent hover:border-blue-500/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Layers size={22} />
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">OTVORENO</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#1E4C9A] transition-colors">Druga kolokvijumska nedelja</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Prijava predispitnih obaveza i drugih kolokvijuma. Položite predmete preko kolokvijuma pre zvaničnih rokova.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Cena prijave:</span>
                  <span className="text-emerald-600">0 RSD (Besplatno)</span>
                </div>
              </div>

              {/* Option 2: Junski ispitni rok */}
              <div 
                onClick={() => setSelectedPeriod("junski-rok")}
                className="bg-white border-2 border-transparent hover:border-blue-500/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <BookOpen size={22} />
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">OTVORENO</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#1E4C9A] transition-colors">Junski ispitni rok</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Prvi redovni letnji ispitni rok. Obavezna prijava svih ispita za junsku seriju polaganja.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Cena prijave:</span>
                  <span className="text-slate-900">1.000 RSD / ispit</span>
                </div>
              </div>

              {/* Option 3: Julski ispitni rok */}
              <div 
                onClick={() => setSelectedPeriod("julski-rok")}
                className="bg-white border-2 border-transparent hover:border-blue-500/50 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <Award size={22} />
                    </div>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">OTVORENO</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-[#1E4C9A] transition-colors">Julski ispitni rok</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Drugi redovni letnji ispitni rok. Idealna šansa za polaganje pre polaska na letnji raspust.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Cena prijave:</span>
                  <span className="text-slate-900">1.000 RSD / ispit</span>
                </div>
              </div>

            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-200/50 p-4 font-medium text-xs text-left text-slate-600 flex gap-2.5 items-start">
              <Info size={16} className="text-[#1E4C9A] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 mb-0.5">Savet za finansije:</p>
                Za ispite koji imaju naknadu (Junski i Julski), sredstva će automatski biti skinuta sa Vašeg unetog stanja na finansijskoj kartici. Ukoliko nemate dovoljno novca, nalog možete doplatiti u svakom momentu na kartici <strong className="text-[#1E4C9A]">Stanje na računu</strong>.
              </div>
            </div>

          </motion.div>
        ) : (
          /* Screen B: Exam Table and Calendar as layout requested */
          <motion.div
            key="list-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Top Back Action Bar */}
            <div className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow border border-slate-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPeriod(null)}
                  className="p-2 hover:bg-slate-100 text-slate-500 hover:text-black rounded-xl transition-colors cursor-pointer border border-slate-200"
                  title="Izaberi drugi rok"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="text-left">
                  <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">ODABRANI ISPITNI ROK</span>
                  <h2 className="text-md font-extrabold text-slate-900 leading-none mt-1">{getPeriodLabel(selectedPeriod)}</h2>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="text-right text-xs">
                  <span className="text-slate-400 font-normal">Stanje računa: </span>
                  <span className="font-bold text-slate-800 font-mono text-xs">{formatBalance(accountBalance)}</span>
                </div>
                <button
                  onClick={() => setSelectedPeriod(null)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Promeni rok
                </button>
              </div>
            </div>

            {/* Table Area (8 spans) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 tracking-tight flex items-center gap-2 mb-4">
                  <ClipboardCheck size={16} className="text-[#1E4C9A]" />
                  Lista raspoloživih predmeta za prijavu
                </h3>

                {/* Main Table Styled exactly as the requested image layout */}
                <div className="w-full overflow-x-auto select-none rounded border border-black/80">
                  <table className="w-full min-w-[580px] border-collapse border border-black/85 text-xs text-slate-900 bg-white">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-black">
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-4 uppercase tracking-wider bg-slate-50 text-xs">Predmet</th>
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-3 uppercase tracking-wider bg-slate-50 text-xs">Šifra</th>
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-3 uppercase tracking-wider bg-slate-50 text-xs text-center">ESPB</th>
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-4 uppercase tracking-wider bg-slate-50 text-xs">Datum polaganja</th>
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-3 uppercase tracking-wider bg-slate-50 text-xs">Broj prijava</th>
                        <th className="border border-black font-extrabold text-[#111827] text-center py-3.5 px-4 uppercase tracking-wider bg-slate-50 text-xs">Prijavite ispit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ROSTERS[selectedPeriod].map((exam) => {
                        const isRegistered = registeredExamsKeys[getCompositeKey(selectedPeriod, exam.id)];
                        return (
                          <tr 
                            key={exam.id}
                            className={`hover:bg-slate-50/60 transition-colors duration-150 border-b border-black/50 ${isRegistered ? "bg-emerald-50/35" : ""}`}
                          >
                            <td className="border border-black py-4 px-4 text-left font-bold text-slate-800 text-[12.5px]">
                              {exam.name}
                            </td>
                            <td className="border border-black py-4 px-3 text-center font-mono font-medium text-slate-600 text-xs">
                              {exam.code}
                            </td>
                            <td className="border border-black py-4 px-3 text-center font-mono text-slate-700 text-xs font-semibold">
                              {exam.espb}
                            </td>
                            <td className="border border-black py-4 px-4 text-center font-mono text-slate-700 text-xs">
                              {exam.date}
                            </td>
                            <td className="border border-black py-4 px-3 text-center font-mono text-slate-800 text-xs font-semibold">
                              {exam.baseRegistrations + (isRegistered ? 1 : 0)}
                            </td>
                            <td className="border border-black py-4 px-4 text-center">
                              {isRegistered ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-lg border border-emerald-300">
                                  <CheckCircle size={11} className="stroke-[2.5]" />
                                  Prijavljen
                                </span>
                              ) : (
                                <button
                                  onClick={() => handlePrijaviClick(exam)}
                                  className="px-4 py-1.5 bg-slate-100 border border-slate-400 hover:bg-[#1E4C9A] hover:text-white hover:border-[#1E4C9A] active:scale-95 text-slate-800 rounded text-xs font-bold font-sans tracking-wide transition-all cursor-pointer shadow-sm"
                                >
                                  Prijavi
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex gap-2 items-start text-left text-[11px] text-gray-500 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <Info size={15} className="mt-0.5 text-[#1E4C9A] shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 mb-0.5">Napomene o proceduri prijave:</p>
                    <p className="leading-relaxed">
                      Sve prijave se odmah evidentiraju u bazi Fakulteta Organizacionih Nauka. Ispiti se u roku mogu odjaviti najkasnije 2 radna dana pre polaganja, nakon čega se sredstva vraćaju na studentovu karticu.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right block: Calendar and FON emblem (4 spans) */}
            <div className="lg:col-span-4 flex flex-col gap-6 self-stretch">
              <Calendar />
              
              <div className="flex-1 flex flex-col gap-1 items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 min-h-[140px]">
                <div className="max-w-[140px] w-full flex items-center justify-center opacity-90">
                  <FonLogo />
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog Modal */}
      <AnimatePresence>
        {confirmExam && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-200 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-[#1E4C9A] rounded-2xl shrink-0">
                  <HelpCircle size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-[15px] leading-snug">Potvrda prijave ispita</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Da li ste sigurni da želite da prijavite polaganje predmeta:
                  </p>
                  <p className="text-sm font-extrabold text-[#1E4C9A] mt-2 border-l-4 border-[#1E4C9A] pl-3">
                    {confirmExam.name} ({confirmExam.code})
                  </p>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                    Za rok: <strong className="text-slate-800 font-bold">{selectedPeriod && getPeriodLabel(selectedPeriod)}</strong>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Cena prijave ispita:</span>
                <span className="text-[#1E4C9A] font-mono text-sm">{confirmExam.price === 0 ? "Bez naknade (0 RSD)" : `${confirmExam.price.toLocaleString("sr-RS")} RSD`}</span>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmExam(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-250 hover:text-black hover:border-slate-350 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer border border-slate-200"
                >
                  Odustani
                </button>
                <button
                  onClick={handleConfirmRegistration}
                  className="flex-1 py-2 bg-[#1E4C9A] hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Potvrdi prijavu
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Account Balance Error Dialog Modal */}
      <AnimatePresence>
        {balanceErrorExam && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-200 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl shrink-0">
                  <AlertTriangle size={22} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-[15px] leading-snug">Nedovoljno sredstava na računu</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Nažalost, nemate dovoljno raspoloživog salda za prijavu ispita <strong className="text-slate-800">{balanceErrorExam.name}</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Cena prijave ispita:</span>
                  <span className="font-bold text-slate-800 font-mono">{balanceErrorExam.price.toLocaleString("sr-RS")} RSD</span>
                </div>
                <div className="flex justify-between text-[#1E4C9A] font-bold">
                  <span>Vaš trenutni saldo:</span>
                  <span className="font-mono">{formatBalance(accountBalance)}</span>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                *Izvršite uplatu ili proknjižite sredstva popunjavanjem virmana u sekciji "Stanje na računu" kako biste dopunili Vašu finansijsku karticu.
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => setBalanceErrorExam(null)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
                >
                  U redu, zatvori
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
