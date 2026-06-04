import React, { useState } from "react";

export function FonLogo() {
  const [imageError, setImageError] = useState(false);

  if (!imageError) {
    return (
      <div className="flex items-center justify-center p-3">
        <img
          src="/logofon.png"
          alt="FON Logo"
          referrerPolicy="no-referrer"
          className="h-[120px] w-auto object-contain select-none"
          onError={() => {
            setImageError(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-3 text-center">
      <div className="flex items-center justify-center h-[42px] gap-2">
        <span className="text-[28px] font-semibold text-[#163E75] tracking-tight select-none">
          Ф
        </span>

        <div className="relative w-[34px] h-[34px] flex items-center justify-center">
          <svg
            className="w-full h-full"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="midGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="60%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient id="innerGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            <circle
              cx="17"
              cy="17"
              r="14"
              stroke="url(#outerGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="72 15"
              transform="rotate(-40 17 17)"
            />
            <circle
              cx="17"
              cy="17"
              r="9.5"
              stroke="url(#midGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="45 12"
              transform="rotate(110 17 17)"
            />
            <circle
              cx="17"
              cy="17"
              r="5"
              stroke="url(#innerGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="20 5"
              transform="rotate(-80 17 17)"
            />
          </svg>
        </div>

        <span className="text-[28px] font-semibold text-[#163E75] tracking-tight select-none">
          Н
        </span>
      </div>

      <div className="mt-1.5 flex flex-col items-center justify-center">
        <span className="text-[8.5px] font-medium tracking-[0.18em] text-[#163E75]/80 uppercase leading-none select-none">
          УНИВЕРЗИТЕТ У БЕОГРАДУ
        </span>
        <span className="text-[7.5px] font-medium tracking-[0.08em] text-[#163E75]/80 uppercase leading-none mt-1 select-none">
          ФАКУЛТЕТ ОРГАНИЗАЦИОНИХ НАУКА
        </span>
      </div>
    </div>
  );
}