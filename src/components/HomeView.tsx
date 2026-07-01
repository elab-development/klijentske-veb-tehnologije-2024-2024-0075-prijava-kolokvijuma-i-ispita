import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X } from "lucide-react";
import { FonLogo } from "./FonLogo";
import { Calendar } from "./Calendar";
import { useTheme } from "../context/ThemeContext";

interface HomeViewProps {
  
}

const monthsSerbian = [
  "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", 
  "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"
];

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


const kolokvijumiPaths = [
  "/kolokvijumi.png",
  "/kolokvijumi.PNG",
  "/kolokvijumi.jpg",
  "/kolokvijumi.JPG",
  "/obavestenje1.png",
  "/obavestenje1.PNG",
  "/obavestenje1.jpg",
  "/obavestenje1.JPG"
];

const hakatonPaths = [
  "/hakaton.png",
  "/hakaton.PNG",
  "/hakaton.jpg",
  "/hakaton.JPG",
  "/obavestenje2.png",
  "/obavestenje2.PNG",
  "/obavestenje2.jpg",
  "/obavestenje2.JPG"
];

function NewsCardImage({ category, isModal = false }: { category: string; isModal?: boolean }) {

    const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const paths = category === "KOLOKVIJUMI" ? kolokvijumiPaths : hakatonPaths;

  if (currentPathIndex < paths.length) {
    return (
      <div className={`w-full ${isModal ? "h-[180px]" : "h-[150px]"} relative bg-slate-100 overflow-hidden flex items-center justify-center`}>
        <img
          src={paths[currentPathIndex]}
          alt={category}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none transition-transform duration-500 ease-out group-hover:scale-110"
          onError={() => {
            
            setCurrentPathIndex(prev => prev + 1);
          }}
        />
        {!isModal && (
          <div className="absolute top-2 left-2 text-[8px] mt-0.5 text-white font-mono select-none pointer-events-none uppercase tracking-wider bg-[#101827]/75 backdrop-blur-sm px-1.5 py-0.5 rounded shadow">
            Slika
          </div>
        )}
      </div>
    );
  }

  
  if (category === "KOLOKVIJUMI") {
     const bgClass = isModal ? "bg-gradient-to-br from-[#1b345c] via-[#1E4C9A] to-[#0f2142]" : "bg-[#f1efe6]";
    const textColor = isModal ? "text-white" : "text-[#1e293b]";
    const textNColor = isModal ? "text-amber-400" : "text-[#101827]";
    const subTitleColor = isModal ? "text-slate-200" : "text-[#101827]";
    const strokeColor = isModal ? "#ffffff" : "#101827";
    const opacityClass = isModal ? "opacity-10" : "opacity-15";
    return (
       <div className={`w-full ${isModal ? "h-[180px]" : "h-[150px]"} relative ${bgClass} overflow-hidden flex flex-col items-center justify-center select-none`}>
        {}
        <div 
           className={`absolute inset-0 bg-cover bg-center object-cover ${opacityClass} transition-transform duration-500 ease-out group-hover:scale-110`}
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600')" }}
        />
        
        {}
        <div className="relative z-10 flex flex-col items-center justify-center scale-90 sm:scale-100 transition-transform duration-500 ease-out group-hover:scale-95 sm:group-hover:scale-105">
          <div className="flex items-center justify-center h-[52px] gap-2.5">
               <span className={`text-[36px] font-bold ${textColor} leading-none tracking-tight`}>Ф</span>
            
            <div className="relative w-[40px] h-[40px] flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
               {}
                <circle cx="17" cy="17" r="14" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="64 16" transform="rotate(-30 17 17)" />
                <circle cx="17" cy="17" r="9.5" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="36 12" transform="rotate(120 17 17)" />
                <circle cx="17" cy="17" r="5" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="18 6" transform="rotate(-60 17 17)" />
                {}
                <circle cx="17" cy="17" r="14" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="64 16" transform="rotate(-30 17 17)" />
                <circle cx="17" cy="17" r="9.5" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="36 12" transform="rotate(120 17 17)" />
                <circle cx="17" cy="17" r="5" stroke="#101827" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="18 6" transform="rotate(-60 17 17)" />
              </svg>
            </div>
            
             <span className={`text-[36px] font-bold ${textNColor} leading-none tracking-tight`}>Н</span>
          </div>

            <div className={`mt-3 text-[10px] font-extrabold tracking-[0.24em] ${subTitleColor} uppercase leading-none opacity-90 text-center`}>
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

  // Else "VANNASTAVNA AKTIVNOST" - Hakaton image
  return (
    <div className={`w-full ${isModal ? "h-[180px]" : "h-[150px]"} relative bg-[#0d1c3a] overflow-hidden flex flex-col items-center justify-center select-none`}>
      {}
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
      
      {}
      <div className="absolute w-[160px] h-[160px] rounded-full bg-cyan-500/10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ease-out group-hover:scale-110" />
      
      {}
      <div className="relative z-10 flex flex-col items-center justify-center scale-90 sm:scale-100 transition-transform duration-500 ease-out group-hover:scale-95 sm:group-hover:scale-105">
        <div className="relative flex items-center justify-center select-none">
          {}
          <span className="text-[54px] font-black tracking-tight text-white/95 leading-none select-none font-sans">
            FON
          </span>

          {}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-[88px] h-[88px] text-[#38bdf8] rotate-[-15deg] opacity-90" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="50" cy="50" rx="46" ry="14" stroke="currentColor" strokeWidth="2.8" strokeDasharray="180 30" />
              <ellipse cx="50" cy="50" rx="46" ry="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="30 10" className="opacity-30" />
              <circle cx="16" cy="40" r="3.2" fill="#38bdf8" />
            </svg>
          </div>
        </div>

        {}
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
  const { isDarkMode } = useTheme();

  const openNewsDetail = (item: typeof newsItems[0]) => {
    setSelectedNews(item);
    setShowModal(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch lg:min-h-[calc(100vh-210px)]">
      
      {}
      <div className="lg:col-span-8 flex flex-col gap-4 justify-between">
        <div>
          <h2 className={`text-xl font-bold flex items-center gap-2 select-none border-b border-dashed pb-2 mb-1 transition-colors duration-300 ${
            isDarkMode ? "text-slate-100 border-slate-700/60" : "text-[#1e293b] border-slate-300"
          }`}>
            <Bell size={18} className={isDarkMode ? "text-[#5E97F6]" : "text-[#1E4C9A]"} />
            Obaveštenja
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
            
            {}
            <div className={`flex flex-col rounded-xl shadow overflow-hidden group hover:shadow-lg transition-all border ${
              isDarkMode ? "bg-[#1E293B]/80 border-slate-705/30 text-slate-100 shadow-black/30" : "bg-white border-slate-200"
            }`}>
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
                    className="px-3 py-1 bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/10 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
                  >
                    Saznaj više →
                  </button>
                </div>
              </div>
            </div>

            {" "}
            {}
            <div className={`flex flex-col rounded-xl shadow overflow-hidden group hover:shadow-lg transition-all border ${
              isDarkMode ? "bg-[#1E293B]/80 border-slate-705/30 text-slate-100 shadow-black/30" : "bg-white border-slate-200"
            }`}>
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
                    className="px-3 py-1 bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/10 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
                  >
                    Saznaj više →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {}
      <div className="lg:col-span-4 flex flex-col gap-5 self-stretch w-full max-w-[340px] mx-auto lg:mr-0 lg:ml-auto">
        <Calendar />
        
        <div className="flex-grow" />
        
        <div className={`flex items-center justify-center rounded-2xl shadow p-6 min-h-[140px] border transition-all duration-300 w-full ${
          isDarkMode ? "bg-[#1E293B]/80 border-slate-700/60 shadow-black/20" : "bg-white border-slate-200"
        }`}>
          <div className="max-w-[140px] w-full flex items-center justify-center opacity-90">
            <FonLogo />
          </div>
        </div>
      </div>

      {}
      <AnimatePresence>
        {showModal && selectedNews && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className={`rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative border flex flex-col text-left transition-colors duration-300 ${
                isDarkMode ? "bg-[#1E293B] border-slate-700/50 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}
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

              <div className="p-6 space-y-4">
                <div className={`flex justify-between items-center text-xs pb-2.5 border-b ${
                  isDarkMode ? "text-slate-400 border-slate-800" : "text-slate-400 border-slate-100"
                }`}>
                  <span className="font-semibold">Fakultet organizacionih nauka</span>
                  <span className="font-mono">{selectedNews.date}</span>
                </div>
                <p className={`text-sm leading-relaxed font-medium ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                  {selectedNews.text}
                </p>
                <p className={`text-xs leading-normal p-3 rounded-lg border border-dashed italic ${
                  isDarkMode 
                    ? "bg-[#141b2c] border-slate-700/60 text-slate-400" 
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}>
                  *Ovo obaveštenje je oglašeno direktno na zvaničnom portalu fakulteta. Za sva dodatna pitanja obratite se studentskoj službi FON-a putem emaila.
                </p>
              </div>

              <div className={`p-4 border-t flex justify-end ${
                isDarkMode ? "bg-[#141b2c]/40 border-slate-800" : "bg-slate-50 border-slate-100"
              }`}>
                <button 
                  onClick={() => setShowModal(false)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-lg cursor-pointer transition-colors ${
                    isDarkMode 
                      ? "bg-amber-400 hover:bg-amber-500 text-slate-900" 
                      : "bg-[#1E4C9A] hover:bg-[#122A5E] text-white"
                  }`}
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
