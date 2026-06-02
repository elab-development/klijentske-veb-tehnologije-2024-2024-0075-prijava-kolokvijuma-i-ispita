import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogOut, User, Home } from "lucide-react";
import { HomeView } from "./HomeView";

interface StudentPortalProps {
  studentName?: string;
  studentIndex?: string;
  onLogout: () => void;
}

export function StudentPortal({ studentName = "Ime Prezime", studentIndex = "2023/3858", onLogout }: StudentPortalProps) {
  return (
    <div className="min-h-screen w-full bg-[#121824] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans select-none selection:bg-blue-600/30">
      {/* Blueprint/Dekorativne linije u pozadini */}
      <div className="absolute inset-x-0 h-px bg-slate-800/60 top-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute inset-y-0 w-px bg-slate-800/60 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-32 h-32 border border-slate-800 rounded-full pointer-events-none opacity-30" />
      <div className="absolute -bottom-12 -right-12 w-32 h-32 border border-slate-800 rounded-full pointer-events-none opacity-30" />
      <div className="absolute top-[10%] right-[15%] w-px h-24 bg-gradient-to-down from-blue-500/10 to-transparent pointer-events-none" />
      
      {/* 'Početna' dugme u levom uglu ekrana za povratak na Login */}
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={onLogout}
          className="px-4 py-1.5 bg-white text-gray-800 hover:bg-slate-100 font-semibold text-xs rounded shadow transition-colors cursor-pointer border border-slate-200"
        >
          Početna
        </button>
      </div>

      {/* Glavni kontejner studentskog servisa */}
      <div className="w-full max-w-6xl bg-[#1c2331]/90 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 relative flex flex-col backdrop-blur-md">
        {/* Banner sa detaljima o studentu */}
        <div 
          className="relative w-full h-[150px] bg-cover bg-center flex items-end p-6 border-b border-slate-700/75"
          style={{
            backgroundImage: "linear-gradient(to right, rgba(12, 18, 28, 0.95) 0%, rgba(18, 24, 36, 0.75) 100%), url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-[#121824]/40" />

          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="text-left">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-0 px-1 select-none">
                Studentski servis
              </h1>
              <p className="text-amber-400 font-bold text-xs uppercase tracking-widest leading-none mt-1 pl-1 select-none">
                FAKULTET ORGANIZACIONIH NAUKA
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/35 hover:bg-black/45 hover:border-slate-500/50 transition-all border border-slate-700/50 p-2.5 px-4 rounded-xl self-end align-middle">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[#1E4C9A] font-bold shadow-lg shadow-black/20 overflow-hidden shrink-0">
                <User size={22} className="stroke-[2.5]" />
              </div>
              <div className="text-right select-none">
                <h3 className="text-sm font-semibold text-white leading-normal pr-0.5">{studentName}</h3>
                <p className="text-xs font-mono text-slate-400 leading-none mt-0.5 pr-0.5">{studentIndex}</p>
              </div>
              <button 
                onClick={onLogout}
                title="Odjavi se sa portala"
                className="ml-2 p-1.5 rounded-lg bg-red-600/10 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Podela: Levi meni (Sidemenu) i Desni radni prozor (Canvas) */}
        <div className="w-full flex flex-col md:flex-row items-stretch">
          <div className="w-full md:w-[180px] bg-[#1E4C9A] flex flex-row md:flex-col gap-1.5 p-3 shrink-0">
            <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-lg font-bold text-xs bg-white text-[#1E4C9A] border border-white shadow-md shadow-black/10">
              <Home size={15} />
              <span>Početna</span>
            </div>
          </div>

          <div className="flex-1 bg-[#F1F5F9] p-5 text-slate-800 text-left min-h-[460px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key="pocetna-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <HomeView />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}