// src/components/Calendar.tsx
import React, { useState } from "react";
import { Info, X } from "lucide-react";

const monthsSerbian = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun", 
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
];

export function Calendar() {
  // Calendar states
  const [calendarMonth, setCalendarMonth] = useState<number>(5); // 5 = Jun
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [calendarSelectedDayInfo, setCalendarSelectedDayInfo] = useState<string | null>(null);

  // Generisanje matrice dana za kalendar
  const buildCalendarGrid = () => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const dayOfWeek = firstDay.getDay(); // 0 = Nedelja, 1 = Ponedeljak...
    
    const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();
    const grid: { day: number; isCurrent: boolean; isPrev?: boolean; isNext?: boolean }[] = [];
    
    // Pomeraj za dane iz prethodnog meseca (podesili smo raspored Ned-Sub)
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
    <div className="bg-white rounded-2xl shadow p-4 border border-slate-200 text-slate-800 w-full">
      {/* Navigacija kroz mesece */}
      <div className="flex items-center justify-between gap-1 mb-4 select-none pb-2 border-b border-slate-100">
        <button 
          onClick={handlePrevMonth}
          className="p-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-gray-500 hover:text-black font-bold text-sm"
        >
          &lt;
        </button>
        
        <div className="flex gap-1.5">
          <select 
            value={calendarMonth}
            onChange={(e) => { setCalendarMonth(parseInt(e.target.value)); setCalendarSelectedDayInfo(null); }}
            className="bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded px-2.5 py-1 text-xs focus:ring-[#1E4C9A]"
          >
            {monthsSerbian.map((m, idx) => (
              <option key={m} value={idx}>{m}</option>
            ))}
          </select>
          
          <select 
            value={calendarYear}
            onChange={(e) => { setCalendarYear(parseInt(e.target.value)); setCalendarSelectedDayInfo(null); }}
            className="bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded px-2 text-xs focus:ring-[#1E4C9A]"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
            <option value={2027}>2027</option>
          </select>
        </div>

        <button 
          onClick={handleNextMonth}
          className="p-1 px-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-gray-500 hover:text-black font-bold text-sm"
        >
          &gt;
        </button>
      </div>

      {/* Nazivi dana */}
      <div className="grid grid-cols-7 text-center font-semibold text-slate-400 text-[11px] mb-2 select-none">
        <span>Ned</span>
        <span>Pon</span>
        <span>Uto</span>
        <span>Sre</span>
        <span>Čet</span>
        <span>Pet</span>
        <span>Sub</span>
      </div>

      {/* Grid sa danima */}
      <div className="grid grid-cols-7 gap-1">
        {buildCalendarGrid().map((cell, idx) => {
          const isBlue = isDayBlue(cell.day, cell.isCurrent);
          const isAmber = isDayAmber(cell.day, cell.isCurrent);
          
          let styleClasses = "h-[30px] w-full flex items-center justify-center rounded-md text-[11.5px] font-bold transition-all cursor-pointer select-none ";
          if (!cell.isCurrent) {
            styleClasses += "text-slate-300 opacity-40 hover:bg-slate-100 ";
          } else if (isBlue) {
            styleClasses += "bg-[#5E97F6] text-white shadow-sm hover:scale-[1.08] shadow-[#5E97F6]/25 ";
          } else if (isAmber) {
            styleClasses += "bg-[#E29A32] text-white shadow-sm hover:scale-[1.08] shadow-[#E29A32]/25 ";
          } else {
            styleClasses += "text-slate-700 hover:bg-slate-100 ";
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

      {/* Informacije o kliknutom danu */}
      <div className="mt-4 pt-3 border-t border-slate-100 min-h-[46px]">
        {calendarSelectedDayInfo ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex gap-2 items-start text-[11px] leading-relaxed text-slate-600 animate-fade-in relative text-left">
            <Info size={14} className="text-[#1E4C9A] shrink-0 mt-0.5" />
            <span className="flex-1">{calendarSelectedDayInfo}</span>
            <button 
              onClick={() => setCalendarSelectedDayInfo(null)}
              className="absolute top-1 right-1 text-slate-400 hover:text-black hover:bg-slate-100 p-0.5 rounded cursor-pointer"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-[10px] text-slate-500 font-medium text-left">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#5E97F6] inline-block shrink-0" />
              <span>Rok za prijavu kolokvijuma / ispita</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#E29A32] inline-block shrink-0" />
              <span>Kolokvijumska / ispitna nedelja i Hakaton</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}