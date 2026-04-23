export interface Room {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  amenities: string[];
  size: string;
}

export const rooms: Room[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    desc: "Kamar Deluxe yang elegan dengan fasilitas lengkap, perfect untuk pasangan atau travelersolo yang menginginkan kenyamanan optimal.",
    price: 850000,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    amenities: ["King Bed", "AC", "Smart TV", "WiFi", "Mini Bar", "Hot Shower", "Safety Box"],
    size: "35 m²"
  },
  {
    id: "suite",
    name: "Suite Room",
    desc: "Kamar Suite luas dengan ruang tamu terpisah,view yang menakjubkan, dan fasilitas premium untuk pengalaman menginap yang tak terlupakan.",
    price: 1500000,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80",
    amenities: ["King Bed", "AC", "Smart TV", "WiFi", "Mini Bar", "Hot Shower", "Safety Box", "Living Room", "Bathtub"],
    size: "55 m²"
  },
  {
    id: "premium",
    name: "Premium Room",
    desc: "Kamar Premium eksklusif dengan desain mewah, balkon private, jacuzzi, dan layanan butler untuk tamu VIP yang menginginkan yang terbaik.",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    amenities: ["King Bed", "AC", "Smart TV", "WiFi", "Mini Bar", "Hot Shower", "Safety Box", "Living Room", "Bathtub", "Jacuzzi", "Balkon", "Butler Service"],
    size: "75 m²"
  }
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function generateWaMessage(
  roomName: string,
  checkIn: string,
  checkOut: string,
  guests: number,
  name: string,
  phone: string
): string {
  const message = `*Pemesanan Kamar Hotel*

Nama Pemesan: ${name}
No. Telepon: ${phone}

Tipe Kamar: ${roomName}
Check-in: ${checkIn}
Check-out: ${guests} malam

Mohon konfirmasi ketersediaan.`;
  return encodeURIComponent(message);
}