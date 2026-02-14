
import React, { useState } from 'react';
import { GalleryItem } from '../types';

// Fix: Properly type the data prop to ensure TypeScript can infer the 'gallery' structure correctly.
const Gallery: React.FC<{ data: { gallery: GalleryItem[] } }> = ({ data }) => {
  const [filter, setFilter] = useState('All');
  
  // Fix: Explicitly type the Set as Set<string> to resolve 'unknown' inference issues from Set and Array.from.
  const categories: string[] = ['All', ...Array.from(new Set<string>(data.gallery.map(item => item.category)))];

  const filteredGallery = filter === 'All' 
    ? data.gallery 
    : data.gallery.filter(item => item.category === filter);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-sky-950 mb-4">Impact in Pictures</h1>
          <p className="text-slate-500">Witness the change your donations bring to life.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Fix: Explicitly typing cat as string to satisfy Key and SetStateAction requirements */}
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2.5 rounded-full font-bold transition-all border-2 ${
                filter === cat 
                ? 'bg-teal-600 text-white border-teal-600 shadow-lg' 
                : 'text-slate-600 border-slate-100 hover:border-teal-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item: GalleryItem) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl shadow-md cursor-pointer">
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <span className="text-teal-400 font-bold text-xs uppercase mb-2">{item.category}</span>
                <h3 className="text-white text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
