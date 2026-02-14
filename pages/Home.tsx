
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Program, Post, SliderImage, Stats, TeamMember, Campaign, Achievement } from '../types';
import { CONTACT_INFO, COLORS } from '../constants';

interface HomeProps {
  data: {
    programs: Program[];
    posts: Post[];
    sliders: SliderImage[];
    stats: Stats;
    gallery: any[];
    team: TeamMember[];
    campaigns: Campaign[];
    achievements: Achievement[];
  };
}

const CountUp: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        let start = 0;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        setHasAnimated(true);
      }
    }, { threshold: 0.1 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const Home: React.FC<HomeProps> = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % data.sliders.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.sliders.length]);

  return (
    <div className="overflow-hidden">
      {/* Hero Slider */}
      <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        {data.sliders.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              idx === activeSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          >
            <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                <div className={`max-w-4xl transition-all duration-1000 delay-300 transform ${idx === activeSlide ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  <span className="inline-block bg-[#07847F] text-white text-[10px] font-black uppercase tracking-[0.5em] px-6 py-2.5 rounded-full mb-8 shadow-2xl">
                    SERVING WITH IHSAN
                  </span>
                  <h2 className="text-white text-5xl md:text-8xl font-black mb-8 leading-[1.0] md:leading-[0.9] drop-shadow-2xl tracking-tighter text-balance uppercase">
                    {slide.title}
                  </h2>
                  <p className="text-slate-200 text-base md:text-2xl mb-10 opacity-95 font-medium max-w-2xl border-l-8 border-[#07847F] pl-8 leading-relaxed font-serif italic">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <Link
                      to="/donate"
                      className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-5 rounded-2xl font-black text-xs shadow-2xl transition-all flex items-center justify-center gap-4 group uppercase tracking-widest"
                    >
                      <i className="fa-solid fa-heart group-hover:scale-125 transition-transform"></i>
                      Donate Now 
                    </Link>
                    <Link
                      to="/about"
                      className="bg-white/10 backdrop-blur-3xl text-white border-2 border-white/20 hover:bg-white hover:text-[#07847F] px-12 py-5 rounded-2xl font-black text-xs transition-all flex items-center justify-center shadow-2xl uppercase tracking-widest"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
          {data.sliders.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 transition-all duration-700 rounded-full ${
                idx === activeSlide ? 'bg-orange-500 w-20 shadow-xl shadow-orange-500/50' : 'bg-white/30 w-8 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* HADITH 1 - Background: White */}
      <section className="bg-white py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <i className="fa-solid fa-hands-praying text-[20rem]"></i>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center reveal">
          <p className="text-sky-950 text-xl md:text-4xl font-medium tracking-tight italic opacity-95 font-serif max-w-5xl mx-auto leading-tight drop-shadow-sm">
            "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains."
            <span className="block mt-8 text-[#07847F] not-italic font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">— Surah Al-Baqarah 2:261</span>
          </p>
        </div>
      </section>

      {/* ABOUT US - Background: Slate-50 */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="lg:w-1/2 reveal-left">
              <div className="relative">
                <img 
                  src="https://i.postimg.cc/ZYcbpqJd/about.png" 
                  alt="About AASRA" 
                  className="w-full h-[400px] md:h-[650px] object-cover rounded-[3rem] shadow-2xl relative z-10 "
                />
                <div className="absolute -bottom-10 -right-10 bg-orange-600 p-8 rounded-[2rem] shadow-2xl z-20 text-white animate-float hidden md:block">
                  <p className="text-4xl font-black tracking-tighter">5+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Years of Service</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 reveal-right">
              <span className="text-[#07847F] font-black uppercase tracking-[0.4em] text-[9px] mb-6 block">WHO WE ARE</span>
              <h2 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter leading-none mb-10">Healing Hearts, <br/><span className="text-[#07847F] italic font-serif">Restoring Hope.</span></h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium mb-10 leading-relaxed font-serif italic border-l-4 border-slate-100 pl-8">
                AASRA Welfare Society is more than an organization; it is a movement of compassion dedicated to uplifting the most vulnerable members of our society.
              </p>
              <div className="space-y-6 mb-12">
                <p className="text-slate-600 leading-relaxed text-base">
                  Founded in 20, we began with a simple mission: to ensure no child is left behind. Today, we manage holistic programs spanning across orphan care, clean water, and food security.
                </p>
              </div>
              <Link to="/about" className="bg-[#07847F] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:opacity-90 transition-all flex items-center justify-center lg:inline-flex gap-3 group">
                Read Full Story <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS - Background: Primary Teal (#07847F) */}
<section className="py-24 bg-[#07847F] reveal-zoom">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { label: 'Orphans Supported', value: 32, icon: 'fa-child-reaching' },
        { label: 'Water Projects', value: 170, icon: 'fa-faucet-drip' },
        { label: 'Food Served', value: 5000, icon: 'fa-bowl-food' },
        { label: 'Beneficiaries', value: 12000, icon: 'fa-people-group' },
      ].map((stat, i) => (
        <div
          key={i}
          className="bg-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center gap-6 group hover:-translate-y-2 transition-all duration-500 border border-white/10"
        >
          {/* Icon Box */}
          <div
            className={`w-16 h-16 bg-[#07847F] text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-all border border-white/20`}
          >
            <i className={`fa-solid ${stat.icon} text-white`}></i>
          </div>

          {/* Value and Label */}
          <div>
            <p className="text-3xl md:text-4xl font-black text-sky-950 tracking-tighter mb-2">
              <CountUp end={stat.value} />+
            </p>
            <p className="text-[9px] font-semibold text-sky-950 uppercase tracking-[0.3em]">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



      {/* ACHIEVEMENTS SECTION - Background: White */}
{/* ACHIEVEMENTS SECTION - Background: White */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16 reveal">
      <span className="text-[#07847F] font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">OUR JOURNEY</span>
      <h2 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter leading-none mb-6 uppercase">Major Achievements</h2>
      <p className="text-slate-500 max-w-2xl mx-auto text-lg">Milestones that define our commitment to excellence and service.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {data.achievements.map((achievement) => (
        <div key={achievement.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col reveal-zoom">
          
          {/* Image */}
          <div className="h-64 overflow-hidden relative">
            <img 
              src={achievement.image} 
              alt={achievement.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" 
            />
          </div>

          {/* Content */}
          <div className="p-10 flex flex-col flex-grow">
            <h3 className="text-xl font-black text-sky-950 mb-2 tracking-tight uppercase leading-tight group-hover:text-[#07847F] transition-colors">{achievement.title}</h3>
            
            {/* Date below title */}
            <span className="text-[#07847F] font-semibold text-[10px] uppercase tracking-widest mb-4">{achievement.date}</span>
            
            <p className="text-slate-500 text-sm leading-relaxed opacity-90">{achievement.text}</p>
            
            <div className="mt-8 pt-8 border-t border-slate-50">
              <span className="text-[#07847F] font-black text-[9px] uppercase tracking-[0.3em] flex items-center gap-2">
                <i className="fa-solid fa-award"></i> AASRA Milestone
              </span>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>


      {/* ACTIVE CAMPAIGNS SECTION - Background: Sky-950 (Dark Navy) */}
      <section className="py-24 bg-sky-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 reveal">
              <div className="max-w-2xl">
                <span className="text-teal-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">ACTIVE APPEALS</span>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase">Our Current <span className="text-teal-400 italic font-serif">Appeals</span></h2>
              </div>
              <div className="hidden md:flex flex-col items-end gap-2 pb-2">
                <div className="flex gap-1.5">
                   <div className="w-8 h-1 rounded-full bg-teal-400"></div>
                   <div className="w-2 h-1 rounded-full bg-white/20"></div>
                   <div className="w-2 h-1 rounded-full bg-white/20"></div>
                </div>
                <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mr-1">Swipe for more</p>
              </div>
           </div>
           
           <div className="flex gap-5 md:gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory">
             {data.campaigns.map((camp, idx) => (
               <div 
                 key={camp.id} 
                 className={`
                    w-[75%] md:w-[calc(33.333%-1.35rem)] 
                    bg-white rounded-[2.5rem] 
                    overflow-hidden shadow-2xl
                    border border-white/5 flex-shrink-0 snap-center group flex flex-col
                 `}
               >
                 {/* Image Part - Clear, No Overlay */}
                 <div className="w-full aspect-[4/3] overflow-hidden">
                    <img src={camp.imageUrl} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 
                 {/* Content Part - Below Image */}
                 <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                    <span className="inline-block text-[#07847F] text-[7px] md:text-[8px] font-black mb-3 uppercase tracking-widest">Urgent Need</span>
                    <h3 className="text-sky-950 text-base md:text-xl font-black mb-6 leading-tight tracking-tight uppercase line-clamp-2 h-12 md:h-14">
                      {camp.title}
                    </h3>
                    <Link to={camp.link} className="inline-flex items-center gap-2 bg-[#07847F] text-white px-6 py-4 rounded-xl font-black text-[8px] md:text-[9px] uppercase tracking-widest text-center shadow-md hover:bg-orange-600 transition-all w-full justify-center">
                      Donate Now <i className="fa-solid fa-arrow-right text-[8px]"></i>
                    </Link>
                 </div>
               </div>
             ))}
             {/* Spacing for mobile peek end */}
             <div className="min-w-[5%] md:hidden flex-shrink-0"></div>
           </div>
        </div>
      </section>

      {/* CORE PROGRAMS - Background: White */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-[#07847F] font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">TRANSFORMATIVE ACTION</span>
            <h2 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter leading-none mb-6 uppercase">Our Impact Programs</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Holistic solutions tackling poverty at its roots.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.programs.map((program) => (
              <div key={program.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col reveal-zoom">
                <div className="h-56 overflow-hidden relative">
                   <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
          
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-sky-950 mb-4 tracking-tight uppercase leading-tight">{program.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{program.description}</p>
                  <Link to={`/programs/${program.id}`} className="text-[#07847F] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                    View Impact <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZAKAT SECTION - Background: Slate-50 */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-[#07847F] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 reveal-zoom border border-[#05635f] shadow-2xl">
              <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
                <span className="text-orange-400 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">ZAKAT OBLIGATION</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase leading-[1.1]">Purify Your Wealth with <span className="text-orange-400 italic font-serif">AASRA Zakat Fund.</span></h2>
                <p className="text-slate-300 text-base md:text-lg font-medium mb-10 leading-relaxed">
                   Your Zakat is distributed according to Sharia principles to orphans, widows, and those in extreme poverty.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/zakat" className="bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-700 transition-all text-center">
                    Calculate Zakat
                  </Link>
                  <Link to="/donate" className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-sky-950 transition-all text-center">
                    Donate Zakat
                  </Link>
                </div>
              </div>
                    <div className="lg:w-1/2 relative flex justify-center">
                      {/* Faded circular background */}
                      <div className="w-full max-w-sm aspect-square bg-white/5 rounded-full blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                      {/* Main image with soft corners */}
                      <img
                        src="https://i.postimg.cc/ZKqWqM1z/IMG-4188.webp"
                        alt="Background"
                        className="w-100 md:w-100 rounded-3xl object-cover relative z-10"
                      />
                    </div>


           </div>
        </div>
      </section>

      {/* HADITH 2 - Background: Primary Teal (#07847F) */}
      <section className="bg-[#07847F] py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center scale-150 pointer-events-none">
           <i className="fa-solid fa-kaaba text-[30rem]"></i>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 reveal">
          <p className="text-2xl md:text-5xl font-medium tracking-tight italic font-serif max-w-4xl mx-auto leading-tight">
            "Protect yourself from hell-fire even by giving a piece of a date in charity."
            <span className="block mt-8 text-orange-400 not-italic font-black text-[10px] md:text-xs uppercase tracking-[0.5em]">— Al-Bukhari & Muslim</span>
          </p>
        </div>
      </section>

      {/* TEAM SECTION - Background: White */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <span className="text-[#07847F] font-black uppercase tracking-[0.4em] text-[9px] mb-4 block">EXECUTIVE LEADERSHIP</span>
            <h2 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter leading-none mb-6 uppercase">The Hearts of AASRA</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {data.team.map((member) => (
              <div key={member.id} className="group flex flex-col items-center reveal-zoom">
                <div className="w-full aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lg border border-slate-100 mb-6 bg-slate-50">
                   <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm md:text-base font-black text-sky-950 tracking-tight uppercase leading-tight mb-1">{member.name}</h3>
                  <p className="text-[#07847F] font-black text-[8px] md:text-[9px] uppercase tracking-[0.2em]">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT STORIES - Background: Slate-50 */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-black uppercase tracking-[0.4em] text-[9px] mb-6 block">VOICES OF CHANGE</span>
              <h2 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter leading-none uppercase">Recent Stories</h2>
            </div>
            <Link to="/gallery" className="text-[#07847F] font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2 mb-2">
              View All <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.posts.map((post) => (
              <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col group reveal-zoom">
                <div className="h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#07847F] font-black text-[9px] uppercase tracking-widest">{post.category}</span>
                    <span className="text-slate-400 text-[9px] font-bold">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-black text-sky-950 mb-4 tracking-tight leading-tight group-hover:text-[#07847F] transition-colors uppercase h-12 overflow-hidden">{post.title}</h3>
                  <p className="text-slate-500 text-xs line-clamp-2 mb-8 leading-relaxed opacity-80">{post.excerpt}</p>
                  <Link to={`/posts/${post.id}`} className="text-[#07847F] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 mt-auto">
                    Read More <i className="fa-solid fa-arrow-right text-[#07847F]"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VOLUNTEER - Background: White */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-sky-950 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 reveal-zoom">
            <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
              <span className="text-[#07847F] font-black uppercase tracking-[0.5em] text-[9px] mb-8 block">BECOME AN AMBASSADOR</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 uppercase">Lend Your <br/><span className="text-[#07847F] italic font-serif">Hands & Heart.</span></h2>
              <p className="text-slate-300 text-lg md:text-xl font-medium mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
                AASRA is built on the passion of selfless volunteers. Join our local and international network of change-makers today.
              </p>
              <button className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-orange-700 transition-all">
                Register to Volunteer
              </button>
            </div>
            <div className="lg:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&fit=crop" 
                alt="Volunteer" 
                className="w-full h-[400px] md:h-[550px] object-cover rounded-[3rem] shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
