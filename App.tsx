
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { db } from './firebase';
import { GoogleGenAI } from "@google/genai";
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import Contact from './pages/Contact';
import ZakatCalculator from './pages/ZakatCalculator';
import PostDetail from './pages/PostDetail';
import Admin from './pages/Admin';
import { CONTACT_INFO } from './constants';
import ScrollToTop from "./ScrollToTop"; 


const TopSocialBar = () => (
  <div className="bg-sky-950 text-white py-2 hidden md:block border-b border-white/5 relative z-[60]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center text-[10px] font-normal tracking-[0.2em] uppercase">
      <div className="flex items-center gap-6">
        <span className="opacity-60 lowercase italic font-light tracking-widest">connecting hearts digitally —</span>
        <div className="flex gap-5">
          {['facebook-f', 'instagram', 'linkedin-in', 'tiktok', 'youtube'].map((icon, i) => (
            <a key={i} href="#" className="hover:text-[#07847F] transition-all opacity-80 hover:opacity-100">
              <i className={`fa-brands fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-8 font-light">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-shield-check text-[#07847F]"></i>
          <span className="text-[#FFD700] font-bold uppercase">100% Tax Exempted NGO</span>
        </div>
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-envelope text-[#07847F]/70"></i>
          <span className="lowercase">{CONTACT_INFO.email}</span>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Zakat', path: '/zakat' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <TopSocialBar />
      <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-20 md:h-24">
            <Link to="/" className="flex items-center space-x-3 group">
              <img src="logo.png" alt="AASRA Logo" className="w-10 h-10 md:w-16 md:h-16 object-contain transition-all group-hover:scale-110" />
              <div className="flex flex-col">
              <span className="text-sky-900 font-medium text-base md:text-2xl uppercase tracking-widest font-sans">
                Aasra Welfare
              </span>

                <span className="text-[#07847F] text-[10px] md:text-[12px] font-black tracking-[0.4em]">SOCIETY</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className={`text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-[#07847F] relative py-2 ${location.pathname === link.path ? 'text-[#07847F]' : 'text-slate-500'}`}>
                  {link.name}
                  {location.pathname === link.path && <span className="absolute -bottom-1 left-0 h-1 bg-[#07847F] w-full"></span>}
                </Link>
              ))}
             <Link
                to="/donate"
                className="group flex items-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-2xl text-[14px] font-black tracking-widest shadow-2xl shadow-orange-100 hover:shadow-orange-400 hover:-translate-y-1 transition-all uppercase"
              >
                <i className="fa-solid fa-heart text-white animate-pulse"></i>
                DONATE NOW
              </Link>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-sky-900 p-2 text-2xl">
              <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-2xl px-6 py-12 space-y-4 text-center">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="block py-4 text-xs font-black uppercase tracking-widest text-slate-600">
                {link.name}
              </Link>
            ))}
            <Link to="/donate" onClick={() => setIsOpen(false)} className="block w-full bg-orange-600 text-white py-6 rounded-2xl font-black tracking-widest uppercase text-[10px]">
              DONATE NOW
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-sky-950 text-slate-300 pt-32 pb-12 border-t-4 border-[#07847F]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
      <div className="space-y-8">
        <h3 className="text-white font-black text-3xl tracking-tighter uppercase">AASRA Welfare</h3>
        <p className="text-base leading-relaxed text-slate-400 font-medium">Serving humanity with excellence and Ihsan. A 100% transparent and verified NGO in Pakistan.</p>
        <div className="flex gap-4">
          {['facebook-f', 'instagram', 'linkedin-in', 'tiktok', 'youtube'].map(icon => (
            <div key={icon} className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#07847F] transition-all cursor-pointer">
              <i className={`fa-brands fa-${icon}`}></i>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-[#07847F] font-black text-[10px] uppercase tracking-[0.4em] mb-10">Navigation</h4>
        <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
          <li><Link to="/about">Our History</Link></li>
          <li><Link to="/programs">Projects</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/donate" className="text-orange-400">Donate Now</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-[#07847F] font-black text-[10px] uppercase tracking-[0.4em] mb-10">Contact</h4>
        <ul className="space-y-6 text-sm font-medium">
          <li className="flex gap-4"><i className="fa-solid fa-location-dot text-[#07847F]"></i> <span>{CONTACT_INFO.address}</span></li>
          <li className="flex gap-4"><i className="fa-solid fa-phone text-[#07847F]"></i> <span>{CONTACT_INFO.phone}</span></li>
           <li className="flex gap-4"><i className="fa-solid fa-phone text-[#07847F]"></i> <span>{CONTACT_INFO.phone1}</span></li>
           <li className="flex gap-4"><i className="fa-solid fa-email text-[#07847F]"></i> <span>{CONTACT_INFO.email}</span></li>
        </ul>
      </div>
      <div>
        <h4 className="text-[#07847F] font-black text-[10px] uppercase tracking-[0.4em] mb-10">Registration</h4>
        {CONTACT_INFO.registrationNumbers.map((num, i) => (
          <div key={i} className="bg-sky-900/40 p-3 rounded-xl text-[11px] font- uppercase mb-2 border border-white/5 text-slate-300">
            {num}
          </div>
        ))}
      </div>
    </div>
    <div className="text-center text-[9px] font-black tracking-[0.4em] text-slate-500">
      © 2024 AASRA WELFARE SOCIETY. ALL RIGHTS RESERVED. <Link to="/admin" className="ml-4 hover:text-white">STAFF ACCESS</Link>
    </div>
  </footer>
);

// Gemini Assistant Component
const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chat, setChat] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: "You are the AASRA Welfare Society Smart Assistant. AASRA is a verified NGO in Pakistan focusing on Orphans, Clean Water, and Food distribution. Be helpful, professional, and encourage users to donate or volunteer. Keep answers concise."
        }
      });
      setChat(prev => [...prev, { role: 'bot', text: response.text || "I'm sorry, I couldn't process that request." }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'bot', text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 md:w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden mb-4 flex flex-col animate-fade-in h-[500px]">
          <div className="bg-sky-950 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#07847F] rounded-lg flex items-center justify-center text-xs font-bold">AI</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Impact Assistant</p>
                <p className="text-[10px] opacity-60">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
          </div>
          <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user' ? 'bg-[#07847F] text-white rounded-br-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-center text-[10px] text-slate-400 font-bold uppercase animate-pulse">Assistant is thinking...</div>}
          </div>
          <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our impact..." 
              className="flex-grow bg-slate-50 border-none rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-[#07847F]"
            />
            <button onClick={handleSend} className="bg-[#07847F] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-sky-950 transition-colors">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-sky-950 text-[#07847F] rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform border-4 border-[#07847F]/20"
      >
        <i className={`fa-solid ${isOpen ? 'fa-message' : 'fa-robot'}`}></i>
      </button>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<any>({
    programs: [],
    posts: [],
    gallery: [],
    team: [],
    sliders: [],
    campaigns: [],
    achievements: [],
    volunteers: [],
    banners: [],
    stats: { orphans: 0, waterWells: 0, mealsServed: 0, projects: 0 },
    chatMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collections = ['programs', 'posts', 'gallery', 'team', 'sliders', 'campaigns', 'achievements', 'volunteers', 'banners'];
    const unsubscribers = collections.map(colName => {
      return db.collection(colName).onSnapshot((snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData((prev: any) => ({ ...prev, [colName]: items }));
      });
    });

    setLoading(false);
    return () => unsubscribers.forEach(unsub => unsub());
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center bg-sky-950 text-[#07847F] text-5xl font-black">AASRA</div>;

  return (
   <BrowserRouter>
  <ScrollToTop />
  <div className="min-h-screen flex flex-col font-sans">
    <Navbar />
    <main className="flex-grow pt-[116px] md:pt-[132px]">
      <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/about" element={<About data={data} />} />
        <Route path="/programs" element={<Programs data={data} />} />
        <Route path="/programs/:id" element={<ProgramDetail data={data} />} />
        <Route path="/gallery" element={<Gallery data={data} />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact data={data} setData={setData} />} />
        <Route path="/zakat" element={<ZakatCalculator />} />
        <Route path="/posts/:id" element={<PostDetail data={data} />} />
        <Route path="/admin" element={<Admin data={data} setData={setData} />} />
      </Routes>
    </main>
    <Footer />
    
    <div className="fixed bottom-6 right-6 z-[100]">
      <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" className="w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
    </div>
  </div>
</BrowserRouter>

  );
}
