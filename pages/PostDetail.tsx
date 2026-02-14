
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Post } from '../types';

const PostDetail: React.FC<{ data: any }> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const post = data.posts.find((p: Post) => p.id === id);

  if (!post) return <div className="p-20 text-center">Post not found</div>;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-teal-600 font-bold mb-8 hover:gap-2 transition-all">
           <i className="fa-solid fa-arrow-left mr-2"></i> BACK TO HOME
        </Link>
        
        <article className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <img src={post.image} alt={post.title} className="w-full h-96 object-cover" />
          <div className="p-8 lg:p-12 space-y-6">
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
               <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full">{post.category}</span>
               <span className="text-slate-400">{post.date}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-sky-950 leading-tight">{post.title}</h1>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
               {post.content || post.excerpt}
               <p className="mt-6">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
               </p>
               <p className="mt-4">
                 Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
               </p>
            </div>
          </div>
        </article>

        <div className="mt-12 bg-sky-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
              <h4 className="text-xl font-bold">Help us share the impact</h4>
              <p className="text-slate-300 text-sm">Your awareness counts as much as your donation.</p>
           </div>
           <div className="flex gap-4">
              <button className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all"><i className="fa-brands fa-facebook"></i></button>
              <button className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all"><i className="fa-brands fa-twitter"></i></button>
              <button className="bg-white/10 p-4 rounded-xl hover:bg-white/20 transition-all"><i className="fa-solid fa-link"></i></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
