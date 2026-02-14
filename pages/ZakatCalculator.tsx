
import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../constants';

const ZakatCalculator: React.FC = () => {
  const [values, setValues] = useState({
    gold: 0,
    silver: 0,
    cash: 0,
    receivables: 0,
    shares: 0,
    liabilities: 0
  });

  const [zakatPayable, setZakatPayable] = useState(0);

  useEffect(() => {
    const totalWealth = 
      values.gold + 
      values.silver + 
      values.cash + 
      values.receivables + 
      values.shares;
    
    const netWealth = totalWealth - values.liabilities;
    const zakat = netWealth > 0 ? netWealth * 0.025 : 0;
    setZakatPayable(zakat);
  }, [values]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          <div className="md:w-3/5 p-8 lg:p-14 space-y-10">
            <div>
              <span className="text-teal-600 font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">OBLIGATORY CHARITY</span>
              <h1 className="text-3xl md:text-5xl font-black text-sky-950 tracking-tighter uppercase leading-none">Zakat Calculator</h1>
              <p className="text-slate-500 text-sm mt-4 font-medium italic">Fulfill your pillar of Islam with accuracy and transparency.</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { name: 'cash', label: 'Cash in Bank/Home' },
                  { name: 'gold', label: 'Gold (Value in PKR)' },
                  { name: 'silver', label: 'Silver (Value in PKR)' },
                  { name: 'shares', label: 'Business Investments' },
                  { name: 'receivables', label: 'Business Receivables' },
                  { name: 'liabilities', label: 'Total Liabilities' }
                ].map(field => (
                  <div key={field.name} className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{field.label}</label>
                    <div className="relative">
                      <input 
                        name={field.name} 
                        type="number" 
                        onChange={handleChange} 
                        className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none transition-all font-bold text-sky-950 pr-12" 
                        placeholder="0.00" 
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-300">PKR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-2/5 bg-sky-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Visual Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="space-y-10 relative z-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl text-teal-400 border border-white/5">
                <i className="fa-solid fa-calculator"></i>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">Your Total <br/><span className="text-teal-400 italic font-serif">Payable Zakat</span></h2>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Calculated Amount (2.5%)</p>
                <p className="text-5xl md:text-6xl font-black text-teal-400 leading-none break-all">
                  <span className="text-2xl mr-2">PKR</span>
                  {zakatPayable.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                * Based on the standard 2.5% rate. Ensure your net wealth meets the Nisab threshold.
              </p>
            </div>

            <div className="pt-16 relative z-10">
               <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-2xl shadow-sky-950">
                  DONATE YOUR ZAKAT NOW
               </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl shrink-0">
             <i className="fa-solid fa-circle-info"></i>
          </div>
          <div>
            <h3 className="font-black text-sky-950 mb-3 uppercase text-sm tracking-widest">Nisab Guidance</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Zakat is mandatory if your net wealth exceeds the value of 87.48 grams of gold or 612.36 grams of silver. Please consult with a local scholar for specific advice regarding your portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;
