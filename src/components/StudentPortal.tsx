import React from "react";

interface StudentPortalProps {
  studentName?: string;
  studentIndex?: string;
  onLogout: () => void;
}

export function StudentPortal({ studentName, studentIndex, onLogout }: StudentPortalProps) {
  return (
    <div className="min-h-screen w-full bg-[#121824] flex flex-col items-center justify-center text-white p-6">
      <div className="max-w-md w-full bg-[#1e293b] rounded-xl p-8 shadow-xl text-center border border-slate-700">
        <h1 className="text-2xl font-bold mb-2">Studentski Portal</h1>
        
        <div className="p-4 bg-slate-850 rounded-lg text-sm text-slate-400 mb-6 italic border border-dashed border-slate-700">
          Stranica je u izradi.
        </div>

        <button
          onClick={onLogout}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
        >
          Odjavi se
        </button>
      </div>
    </div>
  );
}