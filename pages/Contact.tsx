
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { db, serverTimestamp } from '../firebase';

interface ContactProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const Contact: React.FC<ContactProps> = ({ data, setData }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use compat method for adding documents
      await db.collection("messages").add({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        timestamp: serverTimestamp(),
        status: 'new'
      });

      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send message. Please try again later.");
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-16 reveal-left">
            <div>
              <span className="text-[#07847F] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">CONNECT WITH US</span>
              <h1 className="text-5xl md:text-7xl font-black text-sky-950 mb-8 tracking-tighter uppercase leading-none">Get in <br/><span className="text-[#07847F] italic font-serif lowercase">touch.</span></h1>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                Assalam-o-Alaikum! We are here to answer your questions and help you maximize your impact.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#07847F] shadow-xl border border-slate-100 flex-shrink-0 text-2xl">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h4 className="font-black text-sky-950 mb-2 uppercase tracking-widest text-sm">Our Headquarters</h4>
                  <a href={CONTACT_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 text-base hover:text-[#07847F] transition-colors">{CONTACT_INFO.address}</a>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#07847F] shadow-xl border border-slate-100 flex-shrink-0 text-2xl">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-sky-950 mb-2 uppercase tracking-widest text-sm">Helpline Numbers</h4>
                  <p className="text-slate-500 text-base font-bold">{CONTACT_INFO.phone}</p>
                  <p className="text-slate-500 text-base font-bold">{CONTACT_INFO.whatsappDisplay} (WhatsApp)</p>
                </div>
              </div>
              <div className="flex items-start gap-8">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#07847F] shadow-xl border border-slate-100 flex-shrink-0 text-2xl">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-black text-sky-950 mb-2 uppercase tracking-widest text-sm">Email Support</h4>
                  <p className="text-slate-500 text-base">{CONTACT_INFO.email}</p>
                </div>
              </div>
            </div>

            <div className="h-80 rounded-[3rem] overflow-hidden shadow-2xl relative group">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.328333527581!2d74.27976827618588!3d31.48834044891157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919036c01e6992d%3A0x6a1608796851f505!2sNargis%20Block%20Allama%20Iqbal%20Town%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" 
                className="grayscale hover:grayscale-0 transition-all duration-1000"
               />
               <a href={CONTACT_INFO.mapUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 bg-white text-sky-950 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-sky-950 hover:text-white transition-all">Open in Google Maps</a>
            </div>
          </div>

          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative reveal-right">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
                 <div className="w-24 h-24 bg-teal-100 text-[#07847F] rounded-full flex items-center justify-center text-5xl">
                   <i className="fa-solid fa-paper-plane"></i>
                 </div>
                 <h2 className="text-3xl font-black text-sky-950 tracking-tighter uppercase">Message Sent!</h2>
                 <p className="text-slate-500 max-w-xs mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                 <button onClick={() => setSubmitted(false)} className="text-[#07847F] font-black text-xs uppercase tracking-widest hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-sky-950 mb-10 tracking-tighter uppercase">Direct Message</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your Full Name</label>
                      <input 
                        required
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-50 p-5 rounded-2xl focus:ring-2 focus:ring-[#07847F] focus:bg-white outline-none transition-all font-bold text-sky-950" 
                        placeholder="e.g. Abdullah Khan" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        required
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        type="email" 
                        className="w-full bg-slate-50 border border-slate-50 p-5 rounded-2xl focus:ring-2 focus:ring-[#07847F] focus:bg-white outline-none transition-all font-bold text-sky-950" 
                        placeholder="abdullah@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</label>
                      <input 
                        required
                        name="subject"
                        value={form.subject}
                        onChange={handleInputChange}
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-50 p-5 rounded-2xl focus:ring-2 focus:ring-[#07847F] focus:bg-white outline-none transition-all font-bold text-sky-950" 
                        placeholder="Inquiry about Orphan Sponsorship" 
                      />
                    </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">How can we help?</label>
                    <textarea 
                      required
                      name="message"
                      value={form.message}
                      onChange={handleInputChange}
                      rows={6} 
                      className="w-full bg-slate-50 border border-slate-50 p-5 rounded-2xl focus:ring-2 focus:ring-[#07847F] focus:bg-white outline-none resize-none transition-all font-bold text-sky-950" 
                      placeholder="Share your thoughts here..."
                    ></textarea>
                  </div>
                  <button 
                    disabled={loading}
                    className="w-full bg-sky-900 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-800 shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    {loading ? (
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                    ) : (
                      <i className="fa-solid fa-paper-plane"></i>
                    )}
                    Send Your Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
