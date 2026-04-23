"use client";

import { Room, formatPrice } from "@/data/rooms";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="card-nature overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-primary-dark px-4 py-1.5 rounded-full text-sm font-semibold">
            {room.size}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Tersedia
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-primary-dark">{room.name}</h3>
          <div className="text-2xl">🌲</div>
        </div>
        
        <p className="text-stone text-sm mb-5 line-clamp-2 leading-relaxed">
          {room.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {room.amenities.slice(0, 5).map((amenity) => (
            <span
              key={amenity}
              className="text-xs bg-stone-50 text-primary-dark px-3 py-1.5 rounded-full border border-stone-100"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 5 && (
            <span className="text-xs bg-primary/10 text-primary-dark px-3 py-1.5 rounded-full">
              +{room.amenities.length - 5} lagi
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-stone-100">
          <div>
            <span className="text-2xl font-bold text-primary-dark">{formatPrice(room.price)}</span>
            <span className="text-stone text-sm">/malam</span>
          </div>
          <button
            onClick={() => {
              const modal = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
              modal?.showModal();
            }}
            className="btn-primary px-6 py-2.5 rounded-full font-medium"
          >
            Pesan
          </button>
        </div>
      </div>

      <dialog id={`booking-modal-${room.id}`} className="modal">
        <div className="modal-box max-w-md bg-white p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🌿</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary-dark">Pesan {room.name}</h3>
              <p className="text-stone text-sm">{room.size} • {formatPrice(room.price)}/malam</p>
            </div>
          </div>
          
          <form
            method="dialog"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              
              const name = formData.get("name") as string;
              const phone = formData.get("phone") as string;
              const checkIn = formData.get("checkIn") as string;
              const checkOut = formData.get("checkOut") as string;
              const guests = formData.get("guests") as string;

              if (!name || !phone || !checkIn || !checkOut) {
                alert("Mohon lengkapi semua data!");
                return;
              }

              const nights = Math.ceil(
                (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
              ) || 1;

              const message = `*PEMESANAN KAMAR*

🌿 Forest Haven Resort

👤 Nama: ${name}
📱 WA: ${phone}

🏠 Kamar: ${room.name}
📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut} (${nights} malam)
👥 Tamu: ${guests} orang

💰 Total: ${formatPrice(room.price * nights)}`;

              const waUrl = `https://wa.me/62816781261273?text=${encodeURIComponent(message)}`;
              window.open(waUrl, "_blank");

              const dialog = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
              dialog.close();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-stone-50/50"
                placeholder="Masukkan nama Anda"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Nomor WhatsApp</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-stone-50/50"
                placeholder="628xxxxxxxxxx"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-stone-50/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Check-out</label>
                <input
                  type="date"
                  name="checkOut"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-stone-50/50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Jumlah Tamu</label>
              <select
                name="guests"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-stone-50/50"
              >
                <option value="1">1 Tamu</option>
                <option value="2">2 Tamu</option>
                <option value="3">3 Tamu</option>
                <option value="4">4 Tamu</option>
              </select>
            </div>
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  const dialog = document.getElementById(`booking-modal-${room.id}`) as HTMLDialogElement;
                  dialog.close();
                }}
                className="flex-1 py-3 border-2 border-stone-200 rounded-xl font-medium hover:bg-stone-50 transition-colors text-stone"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary py-3 rounded-xl font-medium"
              >
                📱 Kirim via WA
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">tutup</button>
        </form>
      </dialog>
    </div>
  );
}