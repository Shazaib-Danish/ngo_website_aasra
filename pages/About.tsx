
import React from 'react';
import { TeamMember } from '../types';

interface AboutProps {
  data: {
    team: TeamMember[];
  };
}

const About: React.FC<AboutProps> = ({ data }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-sky-950 text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-6">Our Mission & Values</h1>
          <p className="text-slate-300 text-xl font-light italic">"Restoring dignity to every soul we touch."</p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-sky-950">A Journey of Hope Since 2021</h2>
            <p className="text-slate-600 leading-relaxed">
              AASRA Welfare Society started in a small room in Lahore with a handful of volunteers who noticed that many orphans were lacking basic schooling despite having shelter. We realized that true welfare is not just about survival, but about thriving with dignity.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1 bg-teal-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sky-900">2021: The Beginning</h4>
                  <p className="text-sm text-slate-500">Founded with focus on 5 orphans in a small rented house.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-teal-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sky-900">202: Water Expansion</h4>
                  <p className="text-sm text-slate-500">Launched our first deep well project in Tharparkar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1 bg-teal-500 rounded-full"></div>
                <div>
                  <h4 className="font-bold text-sky-900">2023: Empowerment Centers</h4>
                  <p className="text-sm text-slate-500">Established 3 vocational training centers for women.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/about1/400/500" className="rounded-2xl shadow-xl mt-8" />
            <img src="https://picsum.photos/seed/about2/400/500" className="rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* Team Section */}
<section className="py-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-extrabold text-sky-950">The Hearts Behind AASRA</h2>
      <p className="text-slate-500 mt-2">Dedicated professionals and passionate volunteers.</p>
    </div>

    {/* Team Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
      {data.team.map(member => (
        <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
          
          {/* Image */}
          <div className="h-50 overflow-hidden relative">  {/* smaller height */}
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-fit group-hover:scale-100 transition-transform duration-500 rounded-t-2xl"  // rounded top corners
            />
            <div className="absolute inset-0 bg-sky-900/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl"></div>
          </div>

          {/* Content */}
          <div className="p-4 text-center">  {/* smaller padding */}
            <h3 className="text-lg font-bold text-sky-950">{member.name}</h3>  {/* smaller font */}
            <p className="text-teal-600 font-semibold text-xs uppercase mb-2 tracking-widest">{member.role}</p>
           
          </div>

        </div>
      ))}
    </div>
  </div>
</section>


      {/* Affiliations */}
      <section className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
           <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-12">Our Official Partners & Affiliations</p>
           <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="text-xl font-black text-sky-900">GOVT OF PUNJAB</div>
             <div className="text-xl font-black text-sky-900">CHARITY COMMISSION</div>
             <div className="text-xl font-black text-sky-900">FBR PAKISTAN</div>
             <div className="text-xl font-black text-sky-900">TAX-EXEMPTED NGO</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
