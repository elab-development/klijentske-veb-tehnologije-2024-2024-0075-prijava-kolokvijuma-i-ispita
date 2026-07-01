import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  User,
  Home,
  CreditCard,
  ClipboardCheck,
  CheckSquare,
  BookOpen,
  CalendarDays,
  Award,
  Mail,
} from "lucide-react";
import { HomeView } from "./HomeView";
import { AccountBalanceView, initialPayments } from "./AccountBalanceView";
import { PrijavaIspitaView } from "./PrijavaIspitaView";
import { PrijavljeniIspitiView } from "./PrijavljeniIspitiView";
import { PrikazPredmetaView } from "./PrikazPredmetaView";
import { RasporedNastaveView } from "./RasporedNastaveView";
import { PolozeniIspitiView } from "./PolozeniIspitiView";
import { ProfilStudentaView } from "./ProfilStudentaView";
import { KontaktView } from "./KontaktView";
import { AiAssistant } from "./AiAssistant";
import { PaymentRecord } from "../models/PaymentRecord";
import { RegisteredExamRow } from "../models/RegisteredExamRow";

const bannerPaths = [
  "/banner.png",
  "/banner.PNG",
  "/banner.jpg",
  "/banner.JPG",
  "/fon_banner.png",
  "/fon_banner.PNG",
  "/background.png",
  "/background.jpg",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
];

import { ThemeProvider, useTheme } from "../context/ThemeContext";

interface StudentPortalProps {
  studentName?: string;
  studentIndex?: string;
  onLogout: () => void;
}

export function StudentPortal({
  studentName = "Ime Prezime",
  studentIndex = "2023/3858",
  onLogout,
}: StudentPortalProps) {
  return (
    <ThemeProvider>
      <StudentPortalContent
        studentName={studentName}
        studentIndex={studentIndex}
        onLogout={onLogout}
      />
    </ThemeProvider>
  );
}

function StudentPortalContent({
  studentName = "Ime Prezime",
  studentIndex = "2023/3858",
  onLogout,
}: StudentPortalProps) {
  const { tab } = useParams<{ tab: string }>();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const activeTab =
    tab &&
    [
      "home",
      "stanje",
      "prijava",
      "prijavljeni",
      "predmeti",
      "raspored",
      "polozeni",
      "profil",
      "kontakt",
    ].includes(tab)
      ? (tab as
          | "home"
          | "stanje"
          | "prijava"
          | "prijavljeni"
          | "predmeti"
          | "raspored"
          | "polozeni"
          | "profil"
          | "kontakt")
      : "home";

  const setActiveTab = (
    newTab:
      | "home"
      | "stanje"
      | "prijava"
      | "prijavljeni"
      | "predmeti"
      | "raspored"
      | "polozeni"
      | "profil"
      | "kontakt",
  ) => {
    navigate(`/portal/${newTab}`);
  };
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [accountBalance, setAccountBalance] = useState<number>(4200.0); 
  const [registeredExamsKeys, setRegisteredExamsKeys] = useState<
    Record<string, boolean>
  >({});
  const [customRegisteredExams, setCustomRegisteredExams] = useState<
    RegisteredExamRow[]
  >([]);

  const handleRegisterExam = (examRow: RegisteredExamRow) => {
    setCustomRegisteredExams((prev) => [...prev, examRow]);
  };

  const addPaymentRecord = (type: string, amountStr: string) => {
    const amountVal = Math.abs(parseInt(amountStr) || 0);
    const displayAmount =
      amountVal === 0 ? "0" : amountVal.toLocaleString("sr-RS");
    const newRecord: PaymentRecord = {
      id: String(Date.now()),
      type: type,
      amount: displayAmount,
      installments: "1",
      date: new Date().toLocaleDateString("sr-RS"),
      yearOfStudy: "prva",
      status: "proknjiženo",
      paymentCode: "189",
    };
    setPayments((prev) => [newRecord, ...prev]);
  };

  return (
    <div
      className={`min-h-screen md:h-screen w-full flex flex-col relative overflow-x-hidden md:overflow-hidden font-sans select-none selection:bg-blue-600/30 transition-colors duration-300 ${
        isDarkMode ? "bg-[#0b0f19]" : "bg-[#f1f5f9]"
      }`}
    >
      {}
      <div
        className={`relative w-full md:h-[130px] h-auto flex md:items-end items-center p-4 md:p-6 overflow-hidden border-b shrink-0 transition-colors duration-300 ${
          isDarkMode ? "border-slate-800/90 bg-[#111622]/95" : "border-slate-200 bg-white"
        }`}
      >
        {}
        <img
          src={bannerPaths[currentBannerIndex]}
          alt="Banner background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          onError={() => {
            if (currentBannerIndex < bannerPaths.length - 1) {
              setCurrentBannerIndex((prev) => prev + 1);
            }
          }}
        />

        {}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c121c]/95 via-[#121824]/85 to-[#121824]/75 z-[2] mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/45 z-[1]" />

        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {}
          <div className="text-left flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start gap-3 md:gap-2.5">
            {}
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 border border-slate-700/50 p-2 py-2.5 px-3 rounded-xl cursor-pointer select-none active:scale-95 transition-all text-left self-start sm:self-auto md:self-start"
              title="Promeni temu (Svetla / Tamna)"
            >
              <div
                className={`relative inline-flex h-4 w-7.5 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out ${
                  isDarkMode ? "bg-amber-400" : "bg-slate-500"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isDarkMode ? "translate-x-3.5" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">
                {isDarkMode ? "TAMNA" : "SVETLA"}
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-0 px-1 select-none">
                Studentski servis
              </h1>
              <p className="text-amber-400 font-bold text-xs uppercase tracking-widest leading-none mt-1 pl-1 select-none">
                FAKULTET ORGANIZACIONIH NAUKA
              </p>
            </div>
          </div>

          {}
          <div
            onClick={() => setActiveTab("profil")}
            className={`flex items-center gap-3 bg-black/35 hover:bg-black/50 transition-all border p-2.5 px-4 rounded-xl self-stretch md:self-end align-middle cursor-pointer active:scale-95 group ${
              activeTab === "profil"
                ? "border-amber-400/85 ring-2 ring-amber-400/20 bg-amber-400/10"
                : "border-slate-700/50 hover:border-slate-400/50"
            }`}
            title="Pregled profila studenta"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-white flex items-center justify-center text-[#1E4C9A] font-bold shadow-lg shadow-black/20 overflow-hidden shrink-0 transition-colors">
              <User size={22} className="stroke-[2.5]" />
            </div>
            <div className="text-right select-none flex flex-col justify-center flex-grow md:flex-grow-0">
              <h3 className="text-sm font-semibold text-white leading-normal pr-0.5 group-hover:text-amber-200 transition-colors">
                {studentName}
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-none mt-0.5 pr-0.5 group-hover:text-slate-300 transition-colors">
                {studentIndex}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLogout();
              }}
              title="Odjavi se sa portala"
              className="ml-2 p-1.5 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="w-full flex-1 flex flex-col md:flex-row items-stretch min-h-0 overflow-hidden">
        {}
        <div className="w-full md:w-[225px] bg-[#1E4C9A] flex flex-row md:flex-col gap-1.5 p-4 shrink-0 overflow-x-auto md:overflow-x-visible md:overflow-y-auto">
          {}
          <button
              onClick={() => setActiveTab("home")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "home"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <Home size={15} />
              <span>Početna</span>
            </button>

            <button
              id="tab-stanje-na-racunu"
              onClick={() => setActiveTab("stanje")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "stanje"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <CreditCard size={15} />
              <span>Stanje na računu</span>
            </button>

            <button
              id="tab-prijava-ispita"
              onClick={() => setActiveTab("prijava")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "prijava"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <ClipboardCheck size={15} />
              <span>Prijava ispita</span>
            </button>

            <button
              id="tab-prijavljeni-ispiti"
              onClick={() => setActiveTab("prijavljeni")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "prijavljeni"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <CheckSquare size={15} />
              <span>Prijavljeni ispiti</span>
            </button>

            <button
              id="tab-prikaz-predmeta"
              onClick={() => setActiveTab("predmeti")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "predmeti"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <BookOpen size={15} />
              <span>Prikaz predmeta</span>
            </button>

            <button
              id="tab-raspored-nastave"
              onClick={() => setActiveTab("raspored")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "raspored"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <CalendarDays size={15} />
              <span>Raspored nastave</span>
            </button>

            <button
              id="tab-polozeni-ispiti"
              onClick={() => setActiveTab("polozeni")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "polozeni"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <Award size={15} />
              <span>Položeni ispiti</span>
            </button>

            {}
            <div className="hidden md:block md:flex-1" />

            {}
            <AiAssistant
              studentName={studentName}
              studentIndex={studentIndex}
              activeTab={activeTab}
              isDarkMode={isDarkMode}
            />

            <button
              id="tab-kontakt"
              onClick={() => setActiveTab("kontakt")}
              className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs transition-all whitespace-nowrap ${
                activeTab === "kontakt"
                  ? "bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10"
                  : "bg-transparent text-white/90 border border-transparent hover:bg-white/10 hover:text-white"
              } cursor-pointer focus:outline-none`}
            >
              <Mail size={15} />
              <span>Kontakt</span>
            </button>

            {}
          </div>

          {}
          <div
            className={`flex-1 p-6 md:p-8 text-left relative overflow-y-auto transition-all duration-300 min-h-[460px] md:min-h-0 ${
              isDarkMode
                ? "bg-[#131f36] text-slate-100 md:border-l border-slate-800/60"
                : "bg-[#F1F5F9] text-slate-800 md:border-l border-slate-200"
            }`}
          >
            <AnimatePresence mode="wait">
              {activeTab === "home" ? (
                <motion.div
                  key="pocetna-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <HomeView />
                </motion.div>
              ) : activeTab === "stanje" ? (
                <motion.div
                  key="stanje-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <AccountBalanceView
                    studentName={studentName}
                    studentIndex={studentIndex}
                    payments={payments}
                    setPayments={setPayments}
                    accountBalance={accountBalance}
                    setAccountBalance={setAccountBalance}
                  />
                </motion.div>
              ) : activeTab === "prijava" ? (
                <motion.div
                  key="prijava-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PrijavaIspitaView
                    studentName={studentName}
                    studentIndex={studentIndex}
                    accountBalance={accountBalance}
                    setAccountBalance={setAccountBalance}
                    registeredExamsKeys={registeredExamsKeys}
                    setRegisteredExamsKeys={setRegisteredExamsKeys}
                    addPaymentRecord={addPaymentRecord}
                    onRegisterExam={handleRegisterExam}
                  />
                </motion.div>
              ) : activeTab === "prijavljeni" ? (
                <motion.div
                  key="prijavljeni-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PrijavljeniIspitiView
                    studentName={studentName}
                    studentIndex={studentIndex}
                    accountBalance={accountBalance}
                    setAccountBalance={setAccountBalance}
                    registeredExamsKeys={registeredExamsKeys}
                    setRegisteredExamsKeys={setRegisteredExamsKeys}
                    addPaymentRecord={addPaymentRecord}
                    customRegisteredExams={customRegisteredExams}
                    setCustomRegisteredExams={setCustomRegisteredExams}
                  />
                </motion.div>
              ) : activeTab === "predmeti" ? (
                <motion.div
                  key="predmeti-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PrikazPredmetaView />
                </motion.div>
              ) : activeTab === "raspored" ? (
                <motion.div
                  key="raspored-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <RasporedNastaveView />
                </motion.div>
              ) : activeTab === "polozeni" ? (
                <motion.div
                  key="polozeni-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <PolozeniIspitiView />
                </motion.div>
              ) : activeTab === "kontakt" ? (
                <motion.div
                  key="kontakt-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <KontaktView
                    studentName={studentName}
                    studentIndex={studentIndex}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="profil-tab"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <ProfilStudentaView
                    studentName={studentName}
                    studentIndex={studentIndex}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
    </div>
  );
}
