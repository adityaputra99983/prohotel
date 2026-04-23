"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
      
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1920&auto=format&fit=crop&q=80')`,
        }}
      />

      <div className="absolute inset-0 leaf-pattern z-10 pointer-events-none" />

      <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Resor Penginapan Alam kelas atas</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
          <span className="text-gradient">Forest Haven</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto font-light">
          Terhubungkan dengan keindahan alam. Nikmati ketenangan hutan dengan fasilitas luxury dan pelayanan terbaik
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/#rooms"
            className="btn-primary px-10 py-4 rounded-full font-semibold text-lg"
          >
            Pesan Kamar
          </Link>
          <Link
            href="#facilities"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
          >
            Lihat Fasilitas
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-sm">Scroll untuk melihat lebih</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}