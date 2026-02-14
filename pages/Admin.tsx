
import React, { useState, useEffect } from 'react';
import { db, serverTimestamp } from '../firebase';
import { initialPrograms, initialPosts, initialGallery, initialTeam, initialSliders, initialCampaigns, initialAchievements } from '../store/mockData';

const Admin: React.FC<{ data: any, setData: any }> = ({ data, setData }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pass, setPass] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formType, setFormType] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (isLoggedIn) {
      const unsub = db.collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      });
      return () => unsub();
    }
  }, [isLoggedIn]);

  const handleLogin = () => pass === 'admin123' ? setIsLoggedIn(true) : alert('Wrong Password');

  const handleDelete = async (id: string, col: string) => {
    if (window.confirm('Delete this item from Cloud?')) {
      await db.collection(col).doc(id).delete();
    }
  };

  const openModal = (type: string, item: any = null) => {
    setFormType(type);
    setEditingItem(item || {});
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const colName = formType;
    try {
      if (editingItem.id) {
        const { id, ...saveData } = editingItem;
        await db.collection(colName).doc(id).set(saveData, { merge: true });
      } else {
        await db.collection(colName).add({ ...editingItem, timestamp: serverTimestamp() });
      }
      setIsModalOpen(false);
    } catch (err) {
      alert("Error saving: " + err);
    }
  };

  const seedDatabase = async () => {
    if (!window.confirm("This will push all mock data to your live Firebase database. Continue?")) return;
    const collections: any = {
      programs: initialPrograms,
      posts: initialPosts,
      gallery: initialGallery,
      team: initialTeam,
      sliders: initialSliders,
      campaigns: initialCampaigns,
      achievements: initialAchievements,
      volunteers: [
        { name: 'Ali Raza', role: 'Volunteer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop' },
        { name: 'Fatima Ahmed', role: 'Volunteer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop' }
      ],
      banners: [
        { type: 'zakat', title: 'Zakat Fund', text: 'Zakat is a bridge to paradise. Purify your wealth and uplift the Ummah by contributing to our 100% transparent Zakat Fund.', link: '/zakat' },
        { type: 'hadith', title: 'Surah Al-Baqarah 2:261', text: 'The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven ears; in each ear is a hundred grains.', link: '' },
        { type: 'volunteer', title: 'Volunteer Banner', text: 'Join our global caravan of khair. Your time and skills can bring hope to thousands. We need passionate individuals for our on-ground projects.', link: '/contact' }
      ]
    };

    for (const [col, items] of Object.entries(collections)) {
      for (const item of items as any[]) {
        const { id, ...rest } = item;
        await db.collection(col).add(rest);
      }
    }
    alert("Database Seeded Successfully!");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center space-y-8">
          <div className="w-20 h-20 bg-sky-900 rounded-3xl mx-auto flex items-center justify-center text-white text-4xl shadow-xl"><i className="fa-solid fa-shield-halved"></i></div>
          <h2 className="text-3xl font-black text-sky-950 uppercase">CMS LOGIN</h2>
          <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full p-5 rounded-2xl bg-slate-50 border-2 outline-none focus:border-teal-500 font-bold" />
          <button onClick={handleLogin} className="w-full bg-sky-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-sky-800 transition-all">ACCESS PANEL</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
    { id: 'messages', icon: 'fa-envelope', label: 'Messages' },
    { id: 'banners', icon: 'fa-bullhorn', label: 'Section Banners' },
    { id: 'volunteers', icon: 'fa-user-plus', label: 'Volunteers' },
    { id: 'sliders', icon: 'fa-panorama', label: 'Hero Sliders' },
    { id: 'campaigns', icon: 'fa-flag', label: 'Campaigns' },
    { id: 'programs', icon: 'fa-list-check', label: 'Impact Areas' },
    { id: 'posts', icon: 'fa-newspaper', label: 'News/Blog' },
    { id: 'team', icon: 'fa-users', label: 'Team Members' },
    { id: 'gallery', icon: 'fa-images', label: 'Gallery' },
    { id: 'achievements', icon: 'fa-award', label: 'Achievements' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen flex">
      <aside className="w-72 bg-sky-950 text-white flex flex-col fixed h-full hidden lg:flex">
        <div className="p-8 border-b border-white/10 font-black text-xl tracking-widest">AASRA CMS</div>
        <nav className="flex-grow p-6 space-y-2">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-teal-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <i className={`fa-solid ${tab.icon} w-6`}></i> {tab.label}
            </button>
          ))}
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="m-6 p-4 text-red-400 font-bold hover:bg-red-400/10 rounded-2xl text-center border border-red-400/20">LOGOUT</button>
      </aside>

      <main className="flex-grow lg:ml-72 p-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-sky-950 uppercase tracking-tighter">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
          <div className="flex gap-4">
            {activeTab === 'dashboard' && <button onClick={seedDatabase} className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl">Push Mock Data to Cloud</button>}
            {activeTab !== 'dashboard' && activeTab !== 'messages' && <button onClick={() => openModal(activeTab)} className="bg-teal-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs shadow-xl"><i className="fa-solid fa-plus mr-2"></i> Add New</button>}
          </div>
        </div>

        {activeTab === 'dashboard' ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"><p className="text-4xl font-black text-sky-950">{data.programs.length}</p><p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Active Programs</p></div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"><p className="text-4xl font-black text-sky-950">{messages.length}</p><p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Cloud Enquiries</p></div>
              <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100"><p className="text-4xl font-black text-sky-950">{data.campaigns.length}</p><p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-2">Active Campaigns</p></div>
           </div>
        ) : activeTab === 'messages' ? (
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative group">
                <div className="absolute left-0 top-0 w-2 h-full bg-orange-500"></div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-black text-sky-950 uppercase">{msg.name} <span className="text-xs lowercase text-slate-400 ml-2">({msg.email})</span></h3>
                  <button onClick={() => handleDelete(msg.id, 'messages')} className="text-red-400 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                </div>
                <p className="bg-slate-50 p-6 rounded-2xl text-slate-600 italic">"{msg.message}"</p>
                <div className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Sent: {msg.timestamp?.toDate().toLocaleString()}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">{activeTab === 'banners' ? 'Type' : 'Image'}</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest">Title / Details</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data[activeTab]?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-6">
                      {activeTab === 'banners' ? (
                        <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{item.type}</span>
                      ) : (
                        <img src={item.image || item.url || item.imageUrl} className="w-16 h-16 object-cover rounded-xl" />
                      )}
                    </td>
                    <td className="p-6"><p className="font-black text-sky-950 uppercase">{item.title || item.name}</p><p className="text-[10px] text-slate-400 font-bold uppercase">{item.category || item.role || item.text?.slice(0, 50) || 'Content'}</p></td>
                    <td className="p-6 text-right space-x-2">
                      <button onClick={() => openModal(activeTab, item)} className="w-10 h-10 bg-slate-100 rounded-xl text-sky-600 hover:bg-sky-600 hover:text-white transition-all"><i className="fa-solid fa-pen"></i></button>
                      <button onClick={() => handleDelete(item.id, activeTab)} className="w-10 h-10 bg-red-50 rounded-xl text-red-600 hover:bg-red-600 hover:text-white transition-all"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-sky-950/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 p-10">
            <h3 className="text-2xl font-black text-sky-950 uppercase mb-8">{editingItem.id ? 'Edit' : 'Create'} {activeTab}</h3>
            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'banners' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Type (zakat, hadith, volunteer)</label>
                  <input required value={editingItem.type || ''} onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border outline-none font-bold text-sky-950" />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title / Name</label>
                <input required value={editingItem.title || editingItem.name || ''} onChange={(e) => setEditingItem({ ...editingItem, [activeTab === 'team' || activeTab === 'volunteers' ? 'name' : 'title']: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border outline-none font-bold text-sky-950" />
              </div>
              {activeTab !== 'banners' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Image URL</label>
                  <input required value={editingItem.image || editingItem.url || editingItem.imageUrl || ''} onChange={(e) => setEditingItem({ ...editingItem, [activeTab === 'gallery' || activeTab === 'sliders' ? 'url' : activeTab === 'campaigns' ? 'imageUrl' : 'image']: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border outline-none font-bold text-sky-950" />
                </div>
              )}
              {(activeTab === 'banners' || activeTab === 'programs' || activeTab === 'posts') && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content / Text</label>
                  <textarea rows={4} value={editingItem.text || editingItem.description || editingItem.excerpt || ''} onChange={(e) => setEditingItem({ ...editingItem, [activeTab === 'banners' ? 'text' : activeTab === 'programs' ? 'description' : 'excerpt']: e.target.value })} className="w-full p-4 rounded-xl bg-slate-50 border outline-none font-bold text-sky-950 resize-none" />
                </div>
              )}
              <button type="submit" className="w-full bg-sky-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-sky-800 transition-all mt-4">Save to Cloud</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
