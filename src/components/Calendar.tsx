
import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const monthsSerbian = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun", 
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
];

export function Calendar() {
  const { isDarkMode } = useTheme();
  
  const [calendarMonth, setCalendarMonth] = useState<number>(5); // 5 = Jun
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarSelectedDayInfo, setCalendarSelectedDayInfo] = useState<string | null>(null);

  
  const buildCalendarGrid = () => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const dayOfWeek = firstDay.getDay(); // 0 = Nedelja, 1 = Ponedeljak...
    
    const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();
    const grid: { day: number; isCurrent: boolean; isPrev?: boolean; isNext?: boolean }[] = [];
    
    
    for (let i = dayOfWeek - 1; i >= 0; i--) {
      grid.push({
        day: prevMonthDays - i,
        isCurrent: false,
        isPrev: true
      });
    }
    
    const currentMonthDaysCount = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    for (let i = 1; i <= currentMonthDaysCount; i++) {
      grid.push({
        day: i,
        isCurrent: true
      });
    }
    
    const totalCells = grid.length > 35 ? 42 : 35;
    const nextDaysCount = totalCells - grid.length;
    for (let i = 1; i <= nextDaysCount; i++) {
      grid.push({
        day: i,
        isCurrent: false,
        isNext: true
      });
    }
    
    return grid;
  };

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(prev => prev - 1);
    } else {
      setCalendarMonth(prev => prev - 1);
    }
    setCalendarSelectedDayInfo(null);
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(prev => prev + 1);
    } else {
      setCalendarMonth(prev => prev + 1);
    }
    setCalendarSelectedDayInfo(null);
  };

  const isDayBlue = (day: number, isCurrent: boolean) => {
    return isCurrent && calendarYear === 2026 && calendarMonth === 5 && [5, 6, 8, 9].includes(day);
  };

  const isDayAmber = (day: number, isCurrent: boolean) => {
    return isCurrent && calendarYear === 2026 && calendarMonth === 5 && day >= 15 && day <= 30;
  };

  const handleDayClick = (day: number, isCurrent: boolean) => {
    if (!isCurrent) return;
    if (calendarYear === 2026 && calendarMonth === 5) {
      if ([5, 6, 8, 9].includes(day)) {
        setCalendarSelectedDayInfo(`Dan ${day}. jun: Otvoreni rokovi za prijavu kolokvijuma bez zakašnjenja.`);
      } else if (day >= 15 && day <= 30) {
        setCalendarSelectedDayInfo(`Dan ${day}. jun: Ispitna i kolokvijumska nedelja na FON-u. Želimo vam puno sreće!`);
      } else {
        setCalendarSelectedDayInfo(`Dan ${day}. jun: Redovne konsultacije i priprema nastave.`);
      }
    } else {
      setCalendarSelectedDayInfo(`Dan ${day}. ${monthsSerbian[calendarMonth]} ${calendarYear}.: Standardan akademski kalendar.`);
    }
  };

  return (
    <div className={`rounded-2xl shadow p-4 border transition-all duration-300 w-full max-w-[340px] mx-auto lg:mx-0 relative overflow-hidden ${
      isDarkMode 
        ? "bg-[#1E293B]/80 text-white border-slate-800 shadow-xl shadow-black/30" 
        : "bg-white border-slate-200 text-slate-800"
    }`}>
      {isDarkMode && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1E4C9A] via-[#5E97F6] to-amber-400" />
      )}
      {}
      <div className={`flex items-center justify-between gap-1 mb-4 select-none pb-2 border-b ${
        isDarkMode ? "border-slate-800/80" : "border-slate-100"
      }`}>
        <button 
          onClick={handlePrevMonth}
          className={`p-1 px-2 rounded-lg transition-colors cursor-pointer font-bold text-sm ${
            isDarkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-gray-500 hover:text-black"
          }`}
        >
          &lt;
        </button>
        
        <div className="flex gap-1.5">
          <select 
            value={calendarMonth}
            onChange={(e) => { setCalendarMonth(parseInt(e.target.value)); setCalendarSelectedDayInfo(null); }}
            className={`font-bold border rounded px-2.5 py-1 text-xs focus:ring-[#1E4C9A] transition-colors leading-none outline-none ${
              isDarkMode 
                ? "bg-[#141b2c] text-white border-slate-700/60" 
                : "bg-slate-50 text-slate-800 border-slate-200"
            }`}
          >
            {monthsSerbian.map((m, idx) => (
              <option key={m} value={idx} className={isDarkMode ? "bg-[#141b2c] text-white" : "bg-white text-slate-850"}>{m}</option>
            ))}
          </select>
          
          <select 
            value={calendarYear}
            onChange={(e) => { setCalendarYear(parseInt(e.target.value)); setCalendarSelectedDayInfo(null); }}
            className={`font-bold border rounded px-2 text-xs focus:ring-[#1E4C9A] transition-colors outline-none ${
              isDarkMode 
                ? "bg-[#141b2c] text-white border-slate-700/60" 
                : "bg-slate-50 text-slate-800 border-slate-200"
            }`}
          >
            <option value={2025} className={isDarkMode ? "bg-[#141b2c] text-white" : "bg-white"}>2025</option>
            <option value={2026} className={isDarkMode ? "bg-[#141b2c] text-white" : "bg-white"}>2026</option>
            <option value={2027} className={isDarkMode ? "bg-[#141b2c] text-white" : "bg-white"}>2027</option>
          </select>
        </div>

        <button 
          onClick={handleNextMonth}
          className={`p-1 px-2 rounded-lg transition-colors cursor-pointer font-bold text-sm ${
            isDarkMode ? "hover:bg-slate-800 text-slate-400 hover:text-white" : "hover:bg-slate-100 text-gray-500 hover:text-black"
          }`}
        >
          &gt;
        </button>
      </div>

      {}
      <div className={`grid grid-cols-7 text-center font-bold text-[10px] uppercase tracking-wider mb-2 select-none ${
        isDarkMode ? "text-slate-400" : "text-slate-450"
      }`}>
        <span>Ned</span>
        <span>Pon</span>
        <span>Uto</span>
        <span>Sre</span>
        <span>Čet</span>
        <span>Pet</span>
        <span>Sub</span>
      </div>

      {}
      <div className={`grid grid-cols-7 gap-1 p-1 rounded-xl ${
        isDarkMode ? "bg-[#131d30]/50 border border-[#1E4C9A]/15 shadow-inner" : ""
      }`}>
        {buildCalendarGrid().map((cell, idx) => {
          const isBlue = isDayBlue(cell.day, cell.isCurrent);
          const isAmber = isDayAmber(cell.day, cell.isCurrent);
          
          let styleClasses = "h-[32px] w-full flex items-center justify-center rounded-lg text-[11.5px] font-bold transition-all duration-200 cursor-pointer select-none ";
          if (!cell.isCurrent) {
            styleClasses += isDarkMode 
              ? "text-slate-600 opacity-20 hover:bg-slate-800/30 border border-transparent " 
              : "text-slate-300 opacity-40 hover:bg-slate-100 ";
          } else if (isBlue) {
            styleClasses += isDarkMode
              ? "bg-[#1E4C9A] text-white shadow-md border border-[#5E97F6]/60 hover:scale-[1.08] shadow-[#1E4C9A]/40 "
              : "bg-[#5E97F6] text-white shadow-sm hover:scale-[1.08] shadow-[#5E97F6]/25 ";
          } else if (isAmber) {
            styleClasses += isDarkMode
              ? "bg-[#E29A32] text-white shadow-md border border-amber-400/60 hover:scale-[1.08] shadow-[#E29A32]/40 "
              : "bg-[#E29A32] text-white shadow-sm hover:scale-[1.08] shadow-[#E29A32]/25 ";
          } else {
            styleClasses += isDarkMode
              ? "text-slate-300 bg-[#1e293b]/50 border border-slate-800 hover:border-[#1E4C9A]/50 hover:bg-[#1E4C9A]/10 hover:text-white hover:scale-[1.05] "
              : "text-slate-700 hover:bg-slate-100 ";
          }

          return (
            <div 
              key={`${idx}-${cell.day}`}
              className={styleClasses}
              onClick={() => handleDayClick(cell.day, cell.isCurrent)}
            >
              <span>{cell.day}</span>
            </div>
          );
        })}
      </div>

      {}
      <div className={`mt-4 pt-3 border-t min-h-[46px] ${
        isDarkMode ? "border-slate-800" : "border-slate-100"
      }`}>
        {calendarSelectedDayInfo ? (
          <div className={`border rounded-lg p-2 flex gap-2 items-start text-[11px] leading-relaxed animate-fade-in relative text-left ${
            isDarkMode 
              ? "bg-[#141b2a] border-slate-700/60 text-slate-300" 
              : "bg-slate-50 border-slate-200 text-slate-600"
          }`}>
            <Info size={14} className="text-[#5E97F6] shrink-0 mt-0.5" />
            <span className="flex-1">{calendarSelectedDayInfo}</span>
            <button 
              onClick={() => setCalendarSelectedDayInfo(null)}
              className={`absolute top-1 right-1 p-0.5 rounded cursor-pointer ${
                isDarkMode ? "text-slate-500 hover:text-white hover:bg-slate-700" : "text-slate-400 hover:text-black hover:bg-slate-100"
              }`}
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-[10px] font-medium text-left">
            <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              <span className="w-2.5 h-2.5 rounded bg-[#5E97F6] inline-block shrink-0" />
              <span>Rok za prijavu kolokvijuma / ispita</span>
            </div>
            <div className={`flex items-center gap-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
              <span className="w-2.5 h-2.5 rounded bg-[#E29A32] inline-block shrink-0" />
              <span>Kolokvijumska / ispitna nedelja i Hakaton</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}