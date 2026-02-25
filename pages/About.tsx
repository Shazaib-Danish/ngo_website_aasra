
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
    
    {/* LEFT CONTENT */}
    <div className="space-y-6">
      <h2 className="text-4xl font-extrabold text-sky-950">
        A Journey of Hope Since 2021
      </h2>

      <p className="text-slate-600 leading-relaxed">
        Aasra Welfare Society was founded in 2021 in Lahore with a simple but powerful belief 
        every orphan deserves education, dignity, and opportunity. What began in a small rented 
        room with just five children has grown into a dedicated welfare organization serving 
        vulnerable communities across Pakistan. We believe true welfare is not just about survival, 
        but about empowering individuals to live with confidence, faith, and independence.
      </p>

      {/* Timeline */}
      <div className="space-y-4">

        <div className="flex gap-4">
          <div className="w-1 bg-teal-500 rounded-full"></div>
          <div>
            <h4 className="font-bold text-sky-900">2021: The Beginning</h4>
            <p className="text-sm text-slate-500">
              Founded with focus on 5 orphans in a small rented house in Lahore.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1 bg-teal-500 rounded-full"></div>
          <div>
            <h4 className="font-bold text-sky-900">2022: Water Expansion</h4>
            <p className="text-sm text-slate-500">
              Launched our first deep well project to provide clean drinking water in Tharparkar.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1 bg-teal-500 rounded-full"></div>
          <div>
            <h4 className="font-bold text-sky-900">2023: Empowerment Centers</h4>
            <p className="text-sm text-slate-500">
              Established vocational training centers to support widows and underprivileged women.
            </p>
          </div>
        </div>

      </div>

      {/* Vision & Mission */}
      <div className="mt-10 space-y-6">

        <div>
          <h3 className="text-2xl font-bold text-sky-900 mb-2">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed">
            To build a compassionate society where no orphan feels abandoned, 
            no child is deprived of education, and every family has access to 
            food, shelter, healthcare, and clean water.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-sky-900 mb-2">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to provide holistic care through education, character 
            development, healthcare support, and sustainable livelihood programs. 
            We strive to empower orphans, support widows, deliver clean water solutions, 
            and respond to emergencies with transparency and integrity.
          </p>
        </div>

        {/* Core Programs */}
        <div>
          <h3 className="text-2xl font-bold text-sky-900 mb-4">Our Core Programs</h3>
          <ul className="text-slate-600 space-y-2 list-disc list-inside">
            <li>Orphan Care & Education Support</li>
            <li>Ramadan Ration & Iftar Programs</li>
            <li>Clean Water & Deep Well Projects</li>
            <li>Emergency Relief & Flood Support</li>
          </ul>
        </div>

      </div>
    </div>

    {/* RIGHT IMAGES */}
    <div className="grid grid-row-2 gap-6">
      <img 
        src="https://i.postimg.cc/yYSMS0Tj/FLOOD-2025.png" 
        alt="Aasra Welfare Society Orphan Care"
        className="rounded-2xl shadow-xl mt-8"
      />
      <img 
        src="https://i.postimg.cc/mrTJqJGt/Logo-PNG.png" 
        alt="Aasra Welfare Society Programs"
        className="rounded-2xl shadow-xl"
      />
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
