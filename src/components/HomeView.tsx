import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X } from "lucide-react";
import { FonLogo } from "./FonLogo";

interface HomeViewProps {}

const newsItems = [
  {
    category: "KOLOKVIJUMI",
    title: "Otvorena prijava za kolokvijumsku nedelju",
    date: "01.05.2026.",
    text: "Od 1.5. do 4.5. biće otvorena prijava za kolokvijumsku nedelju. Mole se studenti da do 1.5. u 14h izmire sva svoja dugovanja. Kolokvijum se može prijaviti do 2 dana pre njegovog početka uz dodatnu naknadu.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
  },
  {
    category: "VANNASTAVNA AKTIVNOST",
    title: "Informacije o održavanju Hakatona",
    date: "10.04.2026.",
    text: "Zbog uskršnjih praznika Hakaton će biti održan u subotu 18.4, umesto prvobitno planirane subote 11.4. Hvala na razumevanju i nadamo se se da ćemo se videti u velikom broju.",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop"
  }
];

function NewsCardImage({ category, isModal = false }: { category: string; isModal?: boolean }) {
  if (category === "KOLOKVIJUMI") {
    return (
      <div className={`w-full ${isModal ? "h-[180px]" : "h-[150px]"} relative bg-[#f1efe6] overflow-hidden flex flex-col items-center justify-center select-none`}>
        <div 
          className="absolute inset-0 bg-cover bg-center object-cover opacity-15 transition-transform duration-500 ease-out group-hover:scale-110"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600')" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center scale-90 sm:scale-100 transition-transform duration-500 ease-out group-hover:scale-95 sm:group-hover:scale-105">
          <div className="flex items-center justify-center h-[52px] gap-2.5">
            <span className="text-[36px] font-bold text-[#1e293b] leading-none tracking-tight">Ф</span>
            <div className="relative w-[40px] h-[40px] flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="17" r="14" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="64 16" transform="rotate(-30 17 17)" />
                <circle cx="17" cy="17" r="9.5" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="36 12" transform="rotate(120 17 17)" />
                <circle cx="17" cy="17" r="5" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="18 6" transform="rotate(-60 17 17)" />
              </svg>
            </div>
            <span className="text-[36px] font-bold text-[#101827] leading-none tracking-tight">Н</span>
          </div>
          <div className="mt-3 text-[10px] font-extrabold tracking-[0.24em] text-[#101827] uppercase leading-none opacity-90 text-center">
            OSNOVNE AKADEMSKE STUDIJE
          </div>
        </div>
        {!isModal && (
          <div className="absolute top-2 left-2 text-[8px] text-slate-400 font-mono select-none pointer-events-none uppercase tracking-wider">
            Frame
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${isModal ? "h-[180px]" : "h-[150px]"} relative bg-[#0d1c3a] overflow-hidden flex flex-col items-center justify-center select-none`}>
      <div 
        className="absolute inset-0 opacity-20 transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `
            radial-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 0),
            linear-gradient(to right, rgba(14, 165, 233, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(14, 165, 233, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 12px 12px, 12px 12px'
        }}
      />
      <div className="absolute w-[160px] h-[160px] rounded-full bg-cyan-500/10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out group-hover:scale-110" />
      <div className="relative z-10 flex flex-col items-center justify-center scale-90 sm:scale-100 transition-transform duration-500 ease-out group-hover:scale-95 sm:group-hover:scale-105">
        <div className="relative flex items-center justify-center select-none">
          <span className="text-[54px] font-black tracking-tight text-white/95 leading-none select-none font-sans">
            FON
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-[88px] h-[88px] text-[#38bdf8] rotate-[-15deg] opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="46" ry="14" stroke="currentColor" strokeWidth="2.8" strokeDasharray="180 30" />
              <ellipse cx="50" cy="50" rx="46" ry="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="30 10" className="opacity-30" />
              <circle cx="16" cy="40" r="3.2" fill="#38bdf8" />
            </svg>
          </div>
        </div>
        <div className="text-[22px] font-black tracking-[0.16em] text-[#38bdf8] font-sans leading-none uppercase -mt-2.5 select-none relative filter drop-shadow-[0_2px_8px_rgba(34,211,238,0.4)]">
          <span>hakaton</span>
          <div className="absolute left-0 right-0 h-[1.5px] bg-[#38bdf8]/50 top-1/2 -translate-y-1/2" />
        </div>
      </div>
      {!isModal && (
        <div className="absolute top-2 left-2 text-[8px] text-slate-500 font-mono select-none pointer-events-none uppercase tracking-wider">
          Frame 3856
        </div>
      )}
    </div>
  );
}

export function HomeView({}: HomeViewProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNews, setSelectedNews] = useState<typeof newsItems[0] | null>(null);

  const openNewsDetail = (item: typeof newsItems[0]) => {
    setSelectedNews(item);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div className="lg:col-span-9 flex flex-col gap-4 justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#1e293b] flex items-center gap-2 select-none border-b border-dashed border-slate-300 pb-2 mb-1">
            <Bell size={18} className="text-[#1E4C9A]" />
            Obaveštenja
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col bg-white rounded-xl shadow border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
              <NewsCardImage category="KOLOKVIJUMI" />
              <div className="bg-gradient-to-b from-[#406499] via-[#21437a] to-[#12366b] p-4 text-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    className="font-bold text-[15px] leading-snug tracking-tight mb-2 hover:underline cursor-pointer"
                    onClick={() => openNewsDetail(newsItems[0])}
                  >
                    {newsItems[0].title}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-4 leading-relaxed font-normal">
                    {newsItems[0].text}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-white/60 font-mono">{newsItems[0].date}</span>
                  <button 
                    onClick={() => openNewsDetail(newsItems[0])}
                    className="text-xs font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Saznaj više →
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl shadow border border-slate-200 overflow-hidden group hover:shadow-lg transition-shadow">
              <NewsCardImage category="VANNASTAVNA AKTIVNOST" />
              <div className="bg-gradient-to-b from-[#7d5c18] via-[#bf801d] to-[#e69b12] p-4 text-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 
                    className="font-bold text-[15px] leading-snug tracking-tight mb-2 hover:underline cursor-pointer" 
                    onClick={() => openNewsDetail(newsItems[1])}
                  >
                    {newsItems[1].title}
                  </h3>
                  <p className="text-xs text-white/90 line-clamp-4 leading-relaxed font-normal">
                    {newsItems[1].text}
                  </p>
                </div>
                <div className="mt-4 pt-2.5 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px] text-white/80 font-mono">{newsItems[1].date}</span>
                  <button 
                    onClick={() => openNewsDetail(newsItems[1])}
                    className="text-xs font-bold text-white hover:text-amber-100 transition-colors cursor-pointer"
                  >
                    Saznaj više →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 flex flex-col items-center justify-center bg-white rounded-2xl shadow border border-slate-200 p-6 self-stretch min-h-[300px]">
        <div className="flex-1 flex items-center justify-center">
          <FonLogo />
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedNews && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-200 flex flex-col text-left"
            >
              <div className="w-full relative">
                <NewsCardImage category={selectedNews.category} isModal={true} />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 pt-16">
                  <span className="px-2 py-0.5 bg-amber-400 text-black text-[9px] font-extrabold tracking-wider rounded uppercase">
                    {selectedNews.category}
                  </span>
                  <h3 className="text-white font-bold text-base sm:text-lg mt-1.5 leading-snug tracking-tight drop-shadow-md">
                    {selectedNews.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 p-1.5 rounded-full cursor-pointer transition-colors z-30"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 text-slate-700 space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-100 pb-2.5">
                  <span className="font-semibold">Fakultet organizacionih nauka</span>
                  <span className="font-mono">{selectedNews.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {selectedNews.text}
                </p>
                <p className="text-xs text-slate-400 leading-normal bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200 italic">
                  *Ovo obaveštenje je oglašeno direktno na zvaničnom portalu fakulteta. Za sva dodatna pitanja obratite se studentskoj službi FON-a putem emaila.
                </p>
              </div>

              <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 bg-[#1E4C9A] hover:bg-[#122A5E] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
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