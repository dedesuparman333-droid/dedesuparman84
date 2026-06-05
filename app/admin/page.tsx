"use client";

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { Plus, Trash2, ExternalLink, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPortal() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Setup error warning if no Supabase URL
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co';

  useEffect(() => {
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchProjects() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setProjects(data);
    } catch (err: any) {
      console.error('Error fetching projects:', err);
      // Suppress network error displaying big text if they just haven't set keys
      if (!isSupabaseConfigured) {
         setError('Supabase credentials belum dikonfigurasi. Silakan atur di Vercel atau .env Anda.');
      } else {
         setError(err.message || 'Gagal mengambil data proyek.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !linkUrl) {
      setError('Judul dan Link URL wajib diisi');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const { error } = await supabase.from('projects').insert([
        {
          title,
          description,
          link_url: linkUrl,
          category,
          image_url: imageUrl || null
        }
      ]);

      if (error) throw error;

      // Reset form
      setTitle('');
      setDescription('');
      setLinkUrl('');
      setCategory('');
      setImageUrl('');
      
      // Refresh list
      fetchProjects();
      
    } catch (err: any) {
      console.error('Error adding project:', err);
      setError(err.message || 'Gagal menambahkan proyek');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      fetchProjects();
    } catch (err: any) {
      console.error('Error deleting project:', err);
      alert('Gagal menghapus proyek: ' + err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Portofolio
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Admin Portal</h1>
            <p className="text-slate-600">Manajemen link project dan portofolio</p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 flex items-start">
            <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5 text-amber-600" />
            <div>
              <h3 className="font-bold mb-1">Supabase Belum Dikonfigurasi</h3>
              <p className="text-sm opacity-90">
                Anda perlu menambahkan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> pada Environment Variables Vercel atau file .env lokal Anda.
              </p>
              <p className="text-sm mt-2 opacity-90">
                Jangan lupa jalankan query SQL pada file <code>schema.sql</code> di editor Supabase Anda untuk membuat tabel.
              </p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Tambah Project */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h2 className="text-lg font-bold mb-4 flex items-center border-b pb-3">
                <Plus className="w-5 h-5 mr-2 text-blue-600" /> Tambah Project
              </h2>
              
              {error && (
                 <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-4 border border-red-100">
                    {error}
                 </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Judul Project *</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Contoh: Sistem Informasi Akademik"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Contoh: Web App, Google Apps Script"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Link URL *</label>
                  <input 
                    type="url" 
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Opsional (https://picsum...)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    placeholder="Deskripsikan project ini..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex justify-center items-center"
                >
                  {submitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                  ) : 'Simpan Project'}
                </button>
              </form>
            </div>
          </div>

          {/* List Project */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold mb-4 border-b pb-3">Daftar Project ({projects.length})</h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12 text-slate-500 border border-dashed rounded-lg border-slate-300">
                  <p>Belum ada project yang ditambahkan.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border border-slate-200 rounded-lg p-4 flex gap-4 hover:bg-slate-50 transition-colors">
                      {project.image_url && (
                        <div className="hidden sm:block w-24 h-24 shrink-0 rounded bg-slate-100 overflow-hidden relative border border-slate-200">
                          <Image src={project.image_url} alt={project.title} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            {project.category && (
                              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1 block">{project.category}</span>
                            )}
                            <h3 className="font-bold text-lg leading-tight">{project.title}</h3>
                          </div>
                          <button 
                            onClick={() => handleDelete(project.id)}
                            className="text-slate-400 hover:text-red-600 p-1 bg-white rounded-md border border-slate-200 hover:border-red-200 transition-colors ml-2 shrink-0"
                            title="Hapus Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm mt-2 line-clamp-2">{project.description}</p>
                        <div className="mt-3 flex items-center">
                          <a href={project.link_url} target="_blank" rel="noopener noreferrer" className="text-xs inline-flex items-center text-blue-600 border border-blue-200 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors truncate max-w-xs">
                            <ExternalLink className="w-3 h-3 mr-1 shrink-0" /> <span className="truncate">{project.link_url}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
