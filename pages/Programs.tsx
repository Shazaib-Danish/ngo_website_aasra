
import React from 'react';
import { Link } from 'react-router-dom';
import { Program } from '../types';

interface ProgramsProps {
  data: {
    programs: Program[];
  };
}

const Programs: React.FC<ProgramsProps> = ({ data }) => {
  return (
    <div className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-extrabold text-sky-950">Our Impact Areas</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">Focused on sustainable development and dignity for all.</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {data.programs.map((program, idx) => (
            <div 
              key={program.id} 
              className={`bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col ${
                idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
            >
              <div className="lg:w-1/2 h-96 lg:h-auto overflow-hidden">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center text-3xl">
                  <i className={`fa-solid ${program.icon}`}></i>
                </div>
                <h2 className="text-4xl font-extrabold text-sky-950">{program.title}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">{program.description}</p>
                <div className="pt-4 flex items-center gap-6">
                  <Link 
                    to={`/programs/${program.id}`}
                    className="bg-sky-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-sky-800 transition-colors"
                  >
                    View Details
                  </Link>
                  <Link to="/donate" className="text-orange-500 font-bold hover:underline">Sponsor This Project</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programs;
