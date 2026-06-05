import { supabase } from '@/lib/supabase';
import { ArrowRight, Send, Briefcase, MessageSquare, Users, Clock, Database, FileSpreadsheet, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 0; // Disable caching for the portfolio to always show latest projects

// Note: Replace the empty string below with your actual Base64 string of the uploaded photo.
// Example: const profileImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..."
const profileImageBase64 = "";

export default async function Portfolio() {
  // Fetch projects from Supabase
  let projects: any[] = [];
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      projects = data;
    }
  } catch (err) {
    console.error('Error fetching projects:', err);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="bg-[#0b1120] text-white py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50 shadow-sm border-b border-white/5">
        <div className="flex items-center text-xl font-bold">
          <span className="text-blue-500 mr-2">{'</>'}</span> DedeSuparman
        </div>
        <div className="hidden md:flex items-center space-x-6 text-sm text-slate-300">
          <Link href="#" className="text-white border-b-2 border-blue-500 pb-1 font-medium">Beranda</Link>
          <Link href="#tentang" className="hover:text-white transition-colors">Tentang Saya</Link>
          <Link href="#keahlian" className="hover:text-white transition-colors">Keahlian</Link>
          <Link href="#portofolio" className="hover:text-white transition-colors">Portofolio</Link>
          <Link href="#layanan" className="hover:text-white transition-colors">Layanan</Link>
          <Link href="#kontak" className="hover:text-white transition-colors">Kontak</Link>
          <Link href="#kontak" className="border border-slate-600 hover:border-blue-500 hover:bg-blue-900/30 px-4 py-2 rounded-md transition-colors text-blue-400">
            Hubungi Saya
          </Link>
          <Link href="/admin" className="text-xs text-slate-500 hover:text-white ml-2 flex items-center">
            Admin <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0b1120] to-[#111827] text-white pt-16 pb-32 px-6 md:px-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-1/4 right-1/4 opacity-20 pointer-events-none">
          <div className="w-96 h-96 bg-blue-600 rounded-full blur-[100px] mix-blend-screen"></div>
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none mix-blend-overlay">
           <svg width="600" height="600" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-blue-500 text-xl font-medium mb-3">Halo, Saya</h2>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">Dede Suparman</h1>
            <h3 className="text-xl md:text-2xl font-medium mb-6 text-slate-300">
              Developer <span className="text-emerald-400">Google Apps Script</span>, <span className="text-blue-400">AppSheet</span> & <span className="text-green-500">Excel</span>
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg leading-relaxed text-lg">
              Saya membantu bisnis dan organisasi mengotomatisasi proses, membangun aplikasi tanpa kode, dan mengolah data menjadi solusi yang efisien dan terintegrasi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#portofolio" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md flex items-center shadow-lg shadow-blue-500/25 transition-all font-medium">
                Lihat Portofolio <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="#kontak" className="bg-transparent border border-slate-600 hover:border-slate-400 text-white px-6 py-3 rounded-md flex items-center transition-all">
                Hubungi Saya <Send className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full relative flex justify-center items-center">
             {/* Decorative placeholder for photo to match the provided image vibe */}
             <div className="relative w-64 h-64 md:w-80 md:h-80 z-10 mt-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
                
                {/* Photo Placeholder / Area */}
                <Image 
                    src={profileImageBase64 || "https://picsum.photos/seed/dede/600/600"} 
                    width={600} 
                    height={600} 
                    alt="Dede Suparman avatar" 
                    className="rounded-b-[100px] rounded-t-full object-cover w-full h-full relative z-10 border-b-4 border-blue-500" 
                    referrerPolicy="no-referrer" 
                />
                
                {/* Floating Tech Icons - Made to look like the UI image */}
                <div className="absolute -top-4 -left-8 bg-white p-3 rounded-2xl shadow-2xl transform -rotate-6 animate-bounce z-20 border border-slate-100" style={{animationDuration: '3s'}}>
                  <Database className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="absolute top-1/2 -right-12 bg-white p-3 rounded-2xl shadow-2xl transform rotate-6 animate-bounce z-20 border border-slate-100" style={{animationDuration: '4s', animationDelay: '1s'}}>
                   <Code className="w-8 h-8 text-blue-500" />
                </div>
                <div className="absolute -bottom-4 -left-2 bg-white p-3 rounded-2xl shadow-2xl transform -rotate-3 animate-bounce z-20 border border-slate-100" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>
                   <FileSpreadsheet className="w-8 h-8 text-green-600" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 -mt-16 relative z-20 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* About Me Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 lg:w-1/3" id="tentang">
            <h3 className="text-xl font-bold border-b-2 border-blue-600 inline-block pb-1 mb-6 text-slate-900">Tentang Saya</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Saya adalah seorang developer yang fokus pada solusi otomasi dan digitalisasi menggunakan Google Apps Script, AppSheet, dan Microsoft Excel.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Dengan pengalaman dalam membangun sistem yang efisien dan mudah digunakan, saya siap membantu Anda mewujudkan ide menjadi solusi nyata.
            </p>
            <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md inline-flex items-center transition-colors shadow-sm">
              Unduh CV <ArrowRight className="w-4 h-4 ml-2 mt-0.5 rotate-90" />
            </a>
          </div>

          {/* Skills Cards */}
          <div className="lg:w-2/3 grid md:grid-cols-3 gap-6" id="keahlian">
            {/* Skill 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col text-left hover:shadow-md transition-shadow">
              <Database className="w-10 h-10 text-emerald-500 mb-4" />
              <h4 className="text-emerald-700 font-bold mb-3 text-lg">Google Apps Script</h4>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                Automasi, integrasi, dan pengembangan solusi berbasis Google Workspace.
              </p>
              <Link href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors mt-auto">
                Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Skill 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col text-left hover:shadow-md transition-shadow">
              <Code className="w-10 h-10 text-blue-500 mb-4" />
              <h4 className="text-blue-700 font-bold mb-3 text-lg">AppSheet</h4>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                Membangun aplikasi bisnis tanpa kode, cepat dan terintegrasi dengan data.
              </p>
              <Link href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors mt-auto">
                Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Skill 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col text-left hover:shadow-md transition-shadow">
              <FileSpreadsheet className="w-10 h-10 text-green-600 mb-4" />
              <h4 className="text-green-700 font-bold mb-3 text-lg">Excel</h4>
              <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-grow">
                Pengolahan data, dashboard, reporting, dan analisis untuk pengambilan keputusan.
              </p>
              <Link href="#" className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-800 transition-colors mt-auto">
                Lihat Detail <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-6 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left md:divide-x md:divide-slate-100">
            <div className="flex flex-col md:flex-row items-center md:justify-center p-2">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-3 md:mb-0 md:mr-4 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">+5</div>
                <div className="text-sm text-slate-500">Tahun Pengalaman</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center md:justify-center p-2">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-3 md:mb-0 md:mr-4 shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">+50</div>
                <div className="text-sm text-slate-500">Proyek Selesai</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-center p-2">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-3 md:mb-0 md:mr-4 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">+30</div>
                <div className="text-sm text-slate-500">Klien Puas</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-center p-2">
              <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-3 md:mb-0 md:mr-4 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-800">100%</div>
                <div className="text-sm text-slate-500">Komitmen & Kualitas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section - Loaded from Supabase */}
        <div className="mt-20" id="portofolio">
           <div className="flex justify-between items-end mb-8">
             <div>
               <h3 className="text-xl md:text-2xl font-bold text-slate-900 border-b-2 border-blue-600 inline-block pb-1 mb-2">Portofolio</h3>
               <p className="text-slate-600">Beberapa project yang sudah dikerjakan</p>
             </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {projects.map((project) => (
                <div key={project.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col">
                  <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden relative shrink-0">
                    {project.image_url ? (
                       <Image src={project.image_url} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (
                       <Briefcase className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    {project.category && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block w-max mb-3">{project.category}</span>
                    )}
                    <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{project.title}</h4>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{project.description}</p>
                    <a href={project.link_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium text-sm flex items-center hover:underline mt-auto w-max">
                      Kunjungi Project <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
             ))}

             {projects.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-xl border-2 border-dashed border-slate-200">
                   <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                   <h4 className="text-lg font-medium text-slate-700 mb-2">Belum ada portofolio</h4>
                   <p className="text-slate-500 mb-4 max-w-sm mx-auto">Anda belum menambahkan project portofolio apapun. Tambahkan melalui admin portal.</p>
                   <Link href="/admin" className="bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium px-4 py-2 rounded-md transition-colors inline-flex items-center">
                     Masuk Admin Portal
                   </Link>
                </div>
             )}
           </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-slate-400 py-10 text-center border-t border-slate-800">
         <div className="flex justify-center mb-4">
            <span className="text-blue-500 text-xl font-bold mr-2">{'</>'}</span> 
            <span className="text-white text-xl font-bold">DedeSuparman</span>
         </div>
         <p>© {new Date().getFullYear()} Dede Suparman. All rights reserved.</p>
         <p className="text-sm mt-2 opacity-60">Dibuat di AI Studio dengan Next.js & Supabase</p>
      </footer>
    </div>
  );
}
