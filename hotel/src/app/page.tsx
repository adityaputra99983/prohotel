import { rooms } from "@/data/rooms";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomCard from "@/components/RoomCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section id="rooms" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary-dark rounded-full text-sm font-semibold mb-4">
              🏡 Kamar Tersedia
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-5">
              Kamar Menghadap Hutan
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto leading-relaxed">
              Setiap kamar dirancang dengan elegan, menghadap keindahan hutan yang hijau. 
              Fasilitas premium untuk kenyamanan maximum Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section id="facilities" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary-dark rounded-full text-sm font-semibold mb-4">
              ✨ Fasilitas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-5">
              Nikmatin Fasilitas Premium
            </h2>
            <p className="text-stone text-lg max-w-2xl mx-auto leading-relaxed">
              Various best facilities available for your comfort and entertainment
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🏊", title: "Kolam Renang", desc: "Views hutan yang asri" },
              { icon: "🍽️", title: "Restoran", desc: "Makanan lokal & internasional" },
              { icon: "💆", title: "Spa & Wellness", desc: "Pijat tradisional" },
              { icon: "🏋️", title: "Gym", desc: "Fasilitas lengkap" },
              { icon: "📶", title: "WiFi", desc: "Internet super cepat" },
              { icon: "🅿️", title: "Parkir", desc: "Area luas & aman" },
              { icon: "🛎️", title: "Layanan 24 Jam", desc: "Resepsionis & keamanan" },
              { icon: "🚗", title: "Transport", desc: "Antar jemput gratis" },
            ].map((item) => (
              <div
                key={item.title}
                className="card-nature p-6 text-center hover:-translate-y-1"
              >
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-primary-dark mb-1">{item.title}</h3>
                <p className="text-stone text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 nature-gradient">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-semibold mb-6">
            🌲 Promo Spesial
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Mulai Booking Sekarang!
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Stok terbatas untuk musim ini! Pesan sekarang dan nikmati diskon 15% untuk pembayaran via WhatsApp
          </p>
          <a
            href="https://wa.me/62816781261273?text=Halo,%20saya%20ingin%20booking%20kamar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.156 0 1.14-.848 2.446-1.01 2.77-.159.297-.01.596.114.743.149.149.328.447.97.729 1.517.666 2.573 1.323 3.011 1.502.713.293 1.404.264 1.921.18.6-.099 1.837-.734 2.109-1.44.273-.706.273-1.473.192-1.612-.074-.149-.297-.199-.495-.249z"/>
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}