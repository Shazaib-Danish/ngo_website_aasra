
import React from 'react';
import { BANK_DETAILS, CONTACT_INFO } from '../constants';
import BankLogo from "../bank_logo.png";

const Donate: React.FC = () => {
  const handleCopyBankDetails = () => {
    const text = `
🌟 AASRA WELFARE SOCIETY (Bank Details) 🌟
-----------------------------------------
Bank Name: ${BANK_DETAILS.bankName}
Title: ${BANK_DETAILS.accountTitle}
Acc No: ${BANK_DETAILS.accountNumber}
IBAN No: ${BANK_DETAILS.iban}

"The believer’s shade on the Day of Resurrection will be their charity." (Tirmidhi)
-----------------------------------------
    `.trim();
    navigator.clipboard.writeText(text);
    alert('✅ Bank details copied to clipboard!\nYou can now share them on WhatsApp or paste them in your banking app.');
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Impact Header */}
      <section className="bg-sky-950 py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center scale-150">
          <i className="fa-solid fa-kaaba text-white text-[25rem]"></i>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 reveal">
          <span className="text-teal-400 font-black uppercase tracking-[0.5em] text-[8px] mb-4 block">INVEST IN AKHIRAH</span>
          <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4">Invest in Your <br/><span className="text-teal-400 italic font-serif">Eternal Future.</span></h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-lg font-medium leading-relaxed font-serif italic border-x border-white/10 px-6">
            "Those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears." (Surah Al-Baqarah 2:261)
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Priority: Local Bank Transfer */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-slate-100 flex flex-col reveal-zoom">
              <div className="bg-white p-6 md:p-14 text-sky-900 relative">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-sky-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                      <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-1 uppercase text-sky-900">Direct Bank Transfer</h2>
                      <div className="flex items-center gap-2">
                        <span className="bg-teal-500 w-8 h-1 rounded-full"></span>
                        <p className="text-teal-600 font-black text-[9px] uppercase tracking-[0.3em]">SECURE LOCAL DONATION PORTAL</p>
                      </div>
                    </div>
                  
                  </div>
                  <img src={BankLogo}  alt="bank logo" className="w-100 h-100 md:w-160 md:h-160 object-contain transition-all group-hover:scale-110 mb-4" />
                  {/* ACCOUNT INFORMATION: REDUCED FONT SIZE FOR MOBILE COMPATIBILITY */}
                  <div className="space-y-8 md:space-y-12 mb-10">
                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Bank Name</p>
                      <p className="text-xl md:text-5xl font-normal tracking-tight text-sky-900 leading-none whitespace-nowrap">
                        Bank Makramah Ltd.
                      </p>
                    </div>

                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Title</p>
                      <p className="text-xl md:text-5xl font-normal tracking-tight text-sky-900 leading-none whitespace-nowrap">
                        Aasra Welfare Society
                      </p>
                    </div>

                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Acc No</p>
                      <p className="text-xl md:text-5xl font-normal tracking-tight text-sky-900 leading-none break-all select-all whitespace-nowrap">
                        01994426001714134112
                      </p>
                    </div>

                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all bg-sky-50/40 py-6 md:py-8 rounded-r-[2.5rem] md:rounded-r-[3rem] pr-6">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">IBAN No</p>
                      <p className="text-xl md:text-5xl font-normal tracking-tight text-sky-900 leading-none break-all select-all whitespace-nowrap">
                        PK56SUMB9944207140134112
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-14 bg-white border-t border-slate-50">
                <div className="flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={handleCopyBankDetails}
                    className="flex-1 bg-[#07847F] text-white hover:opacity-90 py-6 rounded-2xl font-black tracking-[0.15em] uppercase text-[10px] flex items-center justify-center gap-4 transition-all shadow-xl group"
                  >
                    <i className="fa-solid fa-copy group-hover:rotate-12 transition-transform text-lg"></i>
                    <span>Copy Account Details</span>
                  </button>
                  <button 
                    onClick={handleCopyBankDetails}
                    className="flex-1 bg-teal-50 text-[#07847F] hover:bg-teal-100 py-6 rounded-2xl font-black tracking-[0.15em] uppercase text-[10px] flex items-center justify-center gap-4 transition-all border border-teal-100 group"
                  >
                    <i className="fa-solid fa-share-nodes group-hover:scale-125 transition-transform text-lg"></i>
                    <span>Share Details</span>
                  </button>
                </div>
                <div className="mt-8 text-center">
                   <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-60">
                      Safe & Secure Direct Bank Transfer
                   </p>
                </div>
              </div>
            </div>

            {/* Confirmation Box */}
            <div className="bg-orange-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 reveal-left">
               <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl shrink-0 backdrop-blur-xl border border-white/10 animate-pulse">
                  <i className="fa-solid fa-receipt"></i>
               </div>
               <div className="text-center md:text-left">
                  <h3 className="text-xl font-black mb-1 tracking-tight uppercase">Donation Confirmation</h3>
                  <p className="text-orange-50 opacity-95 leading-relaxed font-medium text-sm">
                    Please WhatsApp a screenshot of your transfer to <span className="font-black border-b border-white/40">{CONTACT_INFO.phone}</span> to receive your confirmation receipt.
                  </p>
               </div>
            </div>
          </div>

          {/* International Donor Option */}
          <aside className="lg:col-span-4 space-y-8 sticky top-[140px]">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col reveal-right">
              <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[9px] mb-6 block">GLOBAL GIVING</span>
              <h2 className="text-2xl font-black text-sky-950 tracking-tighter mb-4 uppercase leading-none">Overseas Donors</h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                Supporters outside Pakistan can donate via Credit Card or PayPal through our secure global partner.
              </p>
              <a 
                href={CONTACT_INFO.internationalPaymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#07847F] text-white hover:bg-orange-600 py-6 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center shadow-lg transition-all flex items-center justify-center gap-4 group"
              >
                <i className="fa-solid fa-globe-americas text-lg"></i>
                International Portal
              </a>
              <div className="flex justify-center gap-6 pt-10 grayscale opacity-30 text-3xl">
                <i className="fa-brands fa-cc-visa"></i>
                <i className="fa-brands fa-cc-mastercard"></i>
                <i className="fa-brands fa-cc-paypal"></i>
              </div>
            </div>

            {/* Impact Quote */}
            <div className="bg-[#07847F] rounded-[2.5rem] p-10 text-white shadow-xl reveal-zoom">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <i className="fa-solid fa-hands-holding-heart text-xl"></i>
                </div>
                <h4 className="font-black uppercase tracking-widest text-[11px]">Helping Hands</h4>
              </div>
              <p className="text-[14px] text-teal-50 leading-relaxed font-medium italic opacity-95">
                "Small acts, when multiplied by millions of people, can transform the world. Your contribution is a beacon of hope."
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Donate;
