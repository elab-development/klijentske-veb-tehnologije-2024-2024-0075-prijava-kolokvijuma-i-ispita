import React, { useState } from "react";
import { CreditCard, Printer, CheckCircle, RefreshCw, FileText, Info } from "lucide-react";

export interface PaymentRecord {
  id: string;
  type: string;
  amount: string;
  installments: string;
  date: string;
  yearOfStudy: string;
  status: string;
  paymentCode: string;
}

export const initialPayments: PaymentRecord[] = [
  { id: "1", type: "Školarina", amount: "31.000", installments: "4", date: "05.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "2", type: "Školarina", amount: "31.000", installments: "4", date: "04.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "3", type: "Prijava ispita", amount: "2.000", installments: "1", date: "03.08.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "4", type: "Školarina", amount: "31.000", installments: "5", date: "29.07.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" },
  { id: "5", type: "Školarina", amount: "50.000", installments: "6", date: "28.07.2025.", yearOfStudy: "prva", status: "samofinansiranje", paymentCode: "189" }
];

interface AccountBalanceViewProps {
  studentName?: string;
  studentIndex?: string;
  payments: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
  accountBalance: number;
  setAccountBalance: React.Dispatch<React.SetStateAction<number>>;
}

export function AccountBalanceView({ 
  studentName = "Ime Prezime", 
  studentIndex = "2025/0001",
  payments,
  setPayments,
  accountBalance,
  setAccountBalance
}: AccountBalanceViewProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formatSerbianCurrency = (val: number) => {
    return val.toLocaleString("sr-RS", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " RSD";
  };

  const handleSprovediUplatu = () => {
    // Clean to get real numerical value
    const cleanedAmount = amountValue
      .replace(/[^\d,.]/g, "")
      .replace(/\./g, "")
      .replace(/,/g, ".");
    
    const parsedNum = parseFloat(cleanedAmount) || 0;
    if (parsedNum <= 0) {
      alert("Molimo unesite ispravan iznos.");
      return;
    }

    // Determine clean presentation for amount (truncate decimal if it is simple ,00)
    let displayAmount = amountValue;
    if (displayAmount.includes(",")) {
      displayAmount = displayAmount.split(",")[0];
    } else if (displayAmount.includes(".")) {
      displayAmount = displayAmount.split(".")[0];
    }

    const newRecord: PaymentRecord = {
      id: String(Date.now()),
      type: purposeOfPayment || "Uplata na račun",
      amount: displayAmount,
      installments: "1",
      date: new Date().toLocaleDateString("sr-RS"),
      yearOfStudy: "prva",
      status: "proknjiženo",
      paymentCode: paymentCode || "189"
    };

    setPayments(prev => [newRecord, ...prev]);
    setAccountBalance(prev => prev + parsedNum);
    setSuccessMessage(`Uplata od ${amountValue} RSD je proknjižena! Sredstva su odmah legla na Vaš račun.`);

    // Auto clear alert
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  
  // Custom states for interactive slip
  const [payerName, setPayerName] = useState(studentName);
  const [payerAddress, setPayerAddress] = useState("Jove Ilića 154, Beograd");
  const [purposeOfPayment, setPurposeOfPayment] = useState("Školarina");
  const [recipient, setRecipient] = useState("Fakultet organizacionih nauka - Univerzitet u Beogradu");
  const [paymentCode, setPaymentCode] = useState("189");
  const [amountValue, setAmountValue] = useState("31.000,00");
  const [recipientAccount, setRecipientAccount] = useState("840-0000032902845-54");
  const [modelValue, setModelValue] = useState("97");

  // Dynamic Poziv na broj calculation based on student info
  const cleanedIndex = studentIndex ? studentIndex.replace(/[^0-9]/g, "") : "20250001";
  const defaultReference = `7311${cleanedIndex}`;
  const [referenceValue, setReferenceValue] = useState(defaultReference);

  const handleRowSelect = (payment: PaymentRecord) => {
    setPayerName(studentName);
    setPurposeOfPayment(payment.type);
    
    // Convert e.g., "31.000" to "31.000,00"
    const parsedAmount = payment.amount.includes(",") ? payment.amount : `${payment.amount},00`;
    setAmountValue(parsedAmount);
    
    setPaymentCode(payment.paymentCode || "189");
    
    // Keep reference updated
    if (payment.type === "Prijava ispita") {
      setPurposeOfPayment("Prijava ispita za ispitni rok");
      setReferenceValue(`7311${cleanedIndex}`);
    } else {
      setPurposeOfPayment("Školarina - Rata za osnovne studije");
      setReferenceValue(`7311${cleanedIndex}`);
    }
  };

  const handlePrint = () => {
    // Standard window print
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fadeIn select-none">

         {/* Dynamic Success Alert */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn text-left print:hidden shadow-sm">
          <div className="p-2 bg-emerald-500 text-white rounded-xl shrink-0">
            <CheckCircle size={16} />
          </div>
          <div className="flex-1">
            <p className="font-bold">Uplata proknjižena!</p>
            <p className="font-normal text-emerald-700/95 mt-0.5">{successMessage}</p>
          </div>
        </div>
      )}
      
      {/* Informative Header card */}
      <div className="bg-white rounded-2xl shadow border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#1E4C9A] rounded-xl shrink-0">
            <CreditCard size={24} />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-slate-900 leading-normal">Stanje na finansijskoj kartici</h2>
            <p className="text-xs text-slate-500">Pregled svih ostvarenih uplata, školarina i trenutnog stanja na ličnom računu akademca.</p>
          </div>
        </div>

        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#1E4C9A] hover:bg-[#153a77] text-white rounded-xl text-xs font-semibold shadow-sm transition-all focus:outline-none cursor-pointer"
        >
          <Printer size={15} />
          Odštampaj nalog
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: Balance table mirroring user screenshot exactly */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white rounded-2xl p-6 shadow border border-slate-200 print:shadow-none print:border-none print:p-0">
          <div className="flex items-center justify-between mb-4 print:hidden">
            <span className="font-bold text-sm text-slate-800 tracking-tight flex items-center gap-2">
              <FileText size={16} className="text-[#1E4C9A]" />
              Istorija uplata i zaduženja
            </span>
            <span className="text-[10px] text-slate-400 bg-slate-100 p-1 px-2.5 rounded-full font-medium">
              Klikni na bilo koji red da popuniš uplatnicu ispod
            </span>
          </div>

          {/* Core Table styled identically to the design file */}
          <div className="w-full overflow-x-auto select-none">
            <table className="w-full min-w-[650px] border-collapse border border-black/85 text-xs text-slate-900 bg-white">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-black">
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50">Tip uplate</th>
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50">Iznos (RSD)</th>
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50 text-center">Broj rata</th>
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50">Datum uplate</th>
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50">Godina studija</th>
                  <th className="border border-black font-extrabold text-[#111827] text-center py-2.5 px-3 uppercase tracking-wider bg-slate-50">Status upisa</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr 
                    key={payment.id}
                    title="Klikni da popuniš nalog za uplatu"
                    onClick={() => handleRowSelect(payment)}
                    className="hover:bg-blue-50/60 active:bg-blue-100 cursor-pointer transition-colors duration-150 border-b border-black/50"
                  >
                    <td className="border border-black py-2.5 px-3 text-left font-medium text-slate-800 flex items-center gap-1.5 border-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 inline-block md:hidden"></span>
                      {payment.type}
                    </td>
                    <td className="border border-black py-2.5 px-3 text-right font-semibold font-mono">{payment.amount}</td>
                    <td className="border border-black py-2.5 px-3 text-center font-mono">{payment.installments}</td>
                    <td className="border border-black py-2.5 px-3 text-center font-mono">{payment.date}</td>
                    <td className="border border-black py-2.5 px-3 text-center">{payment.yearOfStudy}</td>
                    <td className="border border-black py-2.5 px-3 text-center text-slate-700">{payment.status}</td>
                  </tr>
                ))}
                
                {/* Stanje na racunu exact match background card footer */}
                <tr className="bg-[#e2e8f0]/85 border-t-2 border-black/90 font-extrabold text-slate-900 text-sm">
                  <td colSpan={6} className="border border-black py-3 px-4 text-center tracking-wide text-[13px] md:text-sm">
                      Stanje na računu: <span className="text-[#1E4C9A]">{formatSerbianCurrency(accountBalance)}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex gap-2 items-start text-left text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 print:hidden select-none">
            <Info size={15} className="mt-0.5 text-blue-500 shrink-0" />
            <p>
              Uplatnice se evidentiraju u roku od 24 sata od momenta uplate u pošti ili banci. Finansijski saldo automatski kontroliše studentska služba i omogućava upis ispita u redovnim i vanrednim rokovima.
            </p>
          </div>
        </div>

        {/* Right column: Slip generator and visual Nalog za uplatu */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-5">
          
          {/* Controls to manually change values for the student */}
          <div className="bg-white rounded-2xl p-5 shadow border border-slate-200 text-left print:hidden">
            <h3 className="text-sm font-bold text-slate-950 mb-3 flex items-center gap-2">
              <RefreshCw size={14} className="text-blue-500" />
              Kontrola uplatnice
            </h3>
            
            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="col-span-2">
                <label className="block text-slate-500 font-medium mb-1">Uplatilac (Ime, prezime, adresa)</label>
                <input 
                  type="text" 
                  value={payerName} 
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-500 font-medium mb-1">Svrha uplate</label>
                <input 
                  type="text" 
                  value={purposeOfPayment} 
                  onChange={(e) => setPurposeOfPayment(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Iznos (RSD)</label>
                <input 
                  type="text" 
                  value={amountValue} 
                  onChange={(e) => setAmountValue(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Poziv na broj</label>
                <input 
                  type="text" 
                  value={referenceValue} 
                  onChange={(e) => setReferenceValue(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex gap-1.5">
              <button 
                onClick={() => {
                  setPurposeOfPayment("Upis ispita i overa semestra");
                  setAmountValue("2.000,00");
                  setPaymentCode("189");
                }}
                className="flex-1 py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer"
              >
                + Prijava ispita
              </button>
              <button 
                onClick={() => {
                  setPurposeOfPayment("Školarina - Rata akademija");
                  setAmountValue("31.000,00");
                  setPaymentCode("189");
                }}
                className="flex-1 py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer"
              >
                + Rata školarine
              </button>
              <button 
                onClick={() => {
                  setPurposeOfPayment("Školarina - Uplata semestra");
                  setAmountValue("50.000,00");
                  setPaymentCode("189");
                }}
                className="flex-1 py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] rounded-lg font-bold transition-transform active:scale-95 cursor-pointer"
              >
                + Cela školarina
              </button>
            </div>
            <button
              onClick={handleSprovediUplatu}
              className="mt-4 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckCircle size={15} />
              Izvrši uplatu (Proknjiži na račun)
            </button>
          </div>

          {/* Genuine Authentic Serbian "Nalog za Uplatu" paper visual representation */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow border border-slate-200 select-none overflow-x-auto print:shadow-none print:border-none print:p-0">
            <div className="min-w-[480px] max-w-full text-left font-serif text-[#0b0c10] bg-white border-2 border-black/80 rounded p-4 relative overflow-hidden leading-snug">
              
              {/* Slip Header watermark */}
              <div className="flex justify-between items-center pb-2.5 border-b-2 border-black/80">
                <span className="text-[10px] tracking-widest font-bold font-sans opacity-95 text-black">UPLATILAC</span>
                <span className="text-sm font-black font-sans tracking-wider select-none text-black">NALOG ZA UPLATU</span>
              </div>

              {/* Main divided canvas slip representation */}
              <div className="grid grid-cols-12 gap-x-4 mt-2.5 text-[9px] font-sans">
                
                {/* Left Columns: Textboxes for text info (uplatilac, svrha, primalac) */}
                <div className="col-span-7 flex flex-col gap-3">
                  <div>
                    <label className="block text-[8px] font-bold text-gray-700 tracking-tight uppercase leading-none mb-1">Uplatilac</label>
                    <div className="w-full h-[52px] bg-slate-50/20 border-2 border-black/80 rounded p-1 text-[10px] font-semibold text-black overflow-hidden whitespace-normal font-sans border-r-2" style={{ textWrap: 'wrap' }}>
                      <p className="font-bold tracking-wide uppercase">{payerName}</p>
                      <p className="opacity-90 mt-0.5 text-[9px]">{payerAddress}</p>
                      <p className="opacity-80 text-[8px] font-mono">Indeks: {studentIndex}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold text-gray-700 tracking-tight uppercase leading-none mb-1">Svrha uplate</label>
                    <div className="w-full h-[40px] bg-slate-50/20 border-2 border-black/80 rounded p-1 text-[10px] font-semibold text-black overflow-hidden leading-tight font-sans">
                      {purposeOfPayment}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] font-bold text-gray-700 tracking-tight uppercase leading-none mb-1">Primalac</label>
                    <div className="w-full h-[48px] bg-slate-50/20 border-2 border-black/80 rounded p-1 text-[9px] font-semibold text-black overflow-hidden leading-tight font-sans">
                      <p className="font-bold">{recipient}</p>
                      <p className="opacity-85 text-[8px]">Jove Ilića 154, 11000 Voždovac, Beograd</p>
                    </div>
                  </div>
                </div>

                {/* Right Columns: Numerical and System-Critical Codes */}
                <div className="col-span-5 flex flex-col gap-3 pl-1 border-l border-black/20">
                  
                  {/* Row Code/Valuta/Iznos block */}
                  <div className="grid grid-cols-12 gap-1 bg-white">
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-gray-700 tracking-tighter leading-none text-center mb-1">šifra pl.</label>
                      <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center justify-center font-bold text-xs text-black font-mono">
                        {paymentCode}
                      </div>
                    </div>
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-gray-700 tracking-tighter leading-none text-center mb-1">valuta</label>
                      <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center justify-center font-bold text-[10px] text-black font-mono">
                        RSD
                      </div>
                    </div>
                    <div className="col-span-6">
                      <label className="block text-[7px] font-bold text-gray-700 tracking-tighter leading-none mb-1 text-center">iznos</label>
                      <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center justify-end pr-2.5 font-extrabold text-xs text-black font-mono">
                        {amountValue}
                      </div>
                    </div>
                  </div>

                  {/* Recipient Bank Account line */}
                  <div>
                    <label className="block text-[8px] font-bold text-gray-700 tracking-tight leading-none mb-1">račun primaoca</label>
                    <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center justify-center font-black tracking-widest text-[11px] text-black font-mono">
                      {recipientAccount}
                    </div>
                  </div>

                  {/* Model and Poziv na broj */}
                  <div className="grid grid-cols-12 gap-1 text-left">
                    <div className="col-span-3">
                      <label className="block text-[7px] font-bold text-gray-700 tracking-tighter leading-none text-center mb-1">model</label>
                      <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center justify-center font-bold text-xs text-black font-mono">
                        {modelValue}
                      </div>
                    </div>
                    
                    <div className="col-span-9">
                      <label className="block text-[7px] font-bold text-gray-700 tracking-tighter leading-none mb-1 pl-1">poziv na broj (odobrenje)</label>
                      <div className="w-full h-[26px] bg-slate-50/20 border-2 border-black/80 rounded flex items-center pl-2 font-bold text-[11px] text-black font-mono tracking-wider overflow-hidden">
                        {referenceValue}
                      </div>
                    </div>
                  </div>

                  {/* Small stamp background representation */}
                  <div className="mt-2.5 flex justify-end items-end relative opacity-70">
                    <div className="absolute right-0 bottom-1 w-[42px] h-[42px] border border-blue-600/30 rounded-full flex flex-col justify-center items-center font-bold font-sans text-[5px] text-blue-600/40 pointer-events-none tracking-normal">
                      <span>IPS PLAĆANJE</span>
                      <span className="font-mono text-[4px]">FON BEOGRAD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Footer signature / timestamp sections */}
              <div className="mt-4 border-t border-black/25 pt-2.5 grid grid-cols-12 gap-2 text-[7px] text-gray-600 font-sans">
                <div className="col-span-4 border-r border-black/10 pr-2">
                  <p className="font-bold text-[6px] text-gray-500 uppercase leading-none">Pečat i potpis uplatioca</p>
                  <div className="h-[22px]" />
                  <div className="border-t border-black/30 w-full" />
                </div>
                <div className="col-span-4 border-r border-black/10 px-1 text-center">
                  <p className="font-bold text-[6px] text-gray-500 uppercase leading-none">Mesto i datum prijema</p>
                  <p className="mt-1 font-semibold text-black/80 text-[7px] font-mono">Beograd, {new Date().toLocaleDateString("sr-RS")}</p>
                </div>
                <div className="col-span-4 pl-2 text-right">
                  <p className="font-bold text-[6px] text-gray-500 uppercase leading-none">Datum valute</p>
                  <p className="mt-1 font-semibold text-black/80 text-[7px] font-mono">{(new Date()).toLocaleDateString("sr-RS")}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex gap-1 items-center justify-center text-[10px] text-emerald-600 font-semibold bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-100 select-none print:hidden">
              <CheckCircle size={13} strokeWidth={2.5} className="text-emerald-500 mr-1" />
              Generator naložen pozivom na broj modela 97
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}