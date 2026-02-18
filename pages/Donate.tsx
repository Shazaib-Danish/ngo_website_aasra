import React, { useEffect, useRef } from 'react';
import { BANK_DETAILS, CONTACT_INFO } from '../constants';
import BankLogo from "../bank_logo.png";

const Donate: React.FC = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

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
    alert('✅ Bank details copied to clipboard!');
  };

  useEffect(() => {
    // Only if widget div exists
    if (widgetRef.current) {
      // Add CSS if not already present
      if (!document.getElementById('whydonate-css')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://plugin.whydonate.com/wdplugin-style.css';
        link.id = 'whydonate-css';
        document.head.appendChild(link);
      }

      // Remove any previous script
      const existingScript = document.getElementById('whydonate-js');
      if (existingScript) existingScript.remove();

      // Add JS script
      const script = document.createElement('script');
      script.src = 'https://plugin.whydonate.com/wp_styling.js';
      script.id = 'whydonate-js';
      script.async = true;
      document.body.appendChild(script);

      // Optional: Cleanup on unmount
      return () => {
        script.remove();
      };
    }
  }, []); // 


  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section className="bg-sky-950 py-12 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center scale-150">
          <i className="fa-solid fa-kaaba text-white text-[25rem]"></i>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 reveal">
          <span className="text-teal-400 font-black uppercase tracking-[0.5em] text-[8px] mb-4 block">INVEST IN AKHIRAH</span>
          <h1 className="text-3xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-4">
            Invest in Your <br/>
            <span className="text-teal-400 italic font-serif">Eternal Future.</span>
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-lg font-medium leading-relaxed font-serif italic border-x border-white/10 px-6">
            "Those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears." (Surah Al-Baqarah 2:261)
          </p>
        </div>
      </section>

      {/* Main Donate Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-30 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Credit Card Widget - Left on desktop, top on mobile */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col reveal-right">
              <span className="text-orange-600 font-black uppercase tracking-[0.3em] text-[9px] mb-6 block">GLOBAL GIVING</span>
              <h2 className="text-2xl font-black text-sky-950 tracking-tighter mb-4 uppercase leading-none">Credit Card Donation</h2>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
                Donate via Credit Card securely.
              </p>

              {/* Whydonate Widget */}
               <div>    <div ref={widgetRef} id="widget-here-wWmjJ"        class="widget-here"        data-shortcode="wWmjJ"        data-lang="auto"        value="donation-widget"    ></div></div>
            </div>
          </div>

          {/* Bank Transfer - Right on desktop, bottom on mobile */}
          <div className="lg:col-span-6 space-y-8">
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
                  <img src={BankLogo} alt="bank logo" className="w-100 h-100 md:w-160 md:h-160 object-contain transition-all group-hover:scale-110 mb-4" />
                  <div className="space-y-8 md:space-y-12 mb-10">
                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Bank Name</p>
                      <p className="text-xl md:text-3xl font-normal tracking-tight text-sky-900 leading-none whitespace-nowrap">{BANK_DETAILS.bankName}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Title</p>
                      <p className="text-xl md:text-3xl font-normal tracking-tight text-sky-900 leading-none whitespace-nowrap">{BANK_DETAILS.accountTitle}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">Acc No</p>
                      <p className="text-xl md:text-3xl font-normal tracking-tight text-sky-900 leading-none break-all select-all whitespace-nowrap">{BANK_DETAILS.accountNumber}</p>
                    </div>
                    <div className="group border-l-4 border-slate-100 pl-4 md:pl-8 hover:border-[#07847F] transition-all bg-sky-50/40 py-6 md:py-8 rounded-r-[2.5rem] md:rounded-r-[3rem] pr-6">
                      <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 md:mb-4">IBAN No</p>
                      <p className="text-xl md:text-3xl font-normal tracking-tight text-sky-900 leading-none break-all select-all whitespace-nowrap">{BANK_DETAILS.iban}</p>
                    </div>
                  </div>
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
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Donate;
