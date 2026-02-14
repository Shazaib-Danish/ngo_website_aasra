
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Program } from '../types';
import ReactMarkdown from "react-markdown";
import Contact from './Contact';

const ProgramDetail: React.FC<{ data: any }> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const program = data.programs.find((p: Program) => p.id === id);

  if (!program) return <div className="p-20 text-center">Program not found</div>;

  return (
    <div className="bg-white">
      <div className="h-[60vh] relative overflow-hidden">
        <img src={program.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-white text-5xl font-extrabold mb-6 drop-shadow-lg">{program.title}</h1>
            <div className="flex items-center justify-center gap-4 text-teal-400 font-bold uppercase tracking-widest text-sm">
               <span className="w-8 h-px bg-teal-400"></span>
               Core Mission
               <span className="w-8 h-px bg-teal-400"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 space-y-12">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold text-sky-950">About the Project</h2>
               <div className="prose prose-slate max-w-none">
  <ReactMarkdown>
    {program.longDescription || program.description}
  </ReactMarkdown>
</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <i className="fa-solid fa-check-circle text-teal-500 text-2xl mb-4"></i>
                  <h4 className="font-bold text-sky-900 mb-2">Sustainable Impact</h4>
                  <p className="text-sm text-slate-500">We ensure that our projects create long-term stability for the community, not just temporary relief.</p>
               </div>
               <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <i className="fa-solid fa-eye text-teal-500 text-2xl mb-4"></i>
                  <h4 className="font-bold text-sky-900 mb-2">Full Transparency</h4>
                  <p className="text-sm text-slate-500">Donors receive quarterly reports and visual proof of their contributions in action.</p>
               </div>
            </div>

            <div className="bg-sky-900 text-white p-12 rounded-3xl relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Want to make a difference?</h3>
                  <p className="text-slate-300 mb-8 max-w-xl">Every single contribution towards this {program.title.toLowerCase()} program brings us closer to a world without suffering.</p>
                  <Link to="/donate" className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-orange-600 transition-all inline-block">
                     SUPPORT THIS PROJECT
                  </Link>
               </div>
               <i className={`fa-solid ${program.icon} absolute -bottom-10 -right-10 text-[200px] text-white/5`}></i>
            </div>
          </div>

          <aside className="lg:w-1/3 space-y-8">
         

            <div className="bg-teal-600 p-8 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-4">Direct Inquiry?</h3>
              <p className="text-sm opacity-90 mb-6">Talk to our project coordinators about specific sponsorship tiers.</p>
              <a href="tel:+923001234567" className="flex items-center gap-3 font-bold border-b border-white/30 pb-2">
                <i className="fa-solid fa-phone"></i> +92 321 111
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
