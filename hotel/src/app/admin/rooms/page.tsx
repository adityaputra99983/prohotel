"use client";

import { useState } from "react";
import { rooms as initialRooms, Room, formatPrice } from "@/data/rooms";

export default function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    size: "",
    amenities: "",
    image: "",
  });

  const openModal = (room?: Room) => {
    if (room) {
      setEditingRoom(room);
      setFormData({
        name: room.name,
        desc: room.desc,
        price: room.price.toString(),
        size: room.size,
        amenities: room.amenities.join(", "),
        image: room.image,
      });
    } else {
      setEditingRoom(null);
      setFormData({ name: "", desc: "", price: "", size: "", amenities: "", image: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingRoom(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const roomData: Room = {
      id: editingRoom?.id || `room-${Date.now()}`,
      name: formData.name,
      desc: formData.desc,
      price: parseInt(formData.price),
      size: formData.size,
      amenities: formData.amenities.split(", ").map((a) => a.trim()),
      image: formData.image || "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    };

    if (editingRoom) {
      setRooms((prev) => prev.map((r) => (r.id === editingRoom.id ? roomData : r)));
    } else {
      setRooms((prev) => [...prev, roomData]);
    }

    closeModal();
  };

  const deleteRoom = (id: string) => {
    if (confirm("Yakin ingin menghapus kamar ini?")) {
      setRooms((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e3d29", marginBottom: "8px" }}>Kelola Kamar</h1>
          <p style={{ color: "#6b6b65" }}>Tambah, edit, atau hapus tipe kamar</p>
        </div>
        <button
          onClick={() => openModal()}
          style={{ padding: "12px 24px", background: "#2d5a3d", color: "white", borderRadius: "12px", fontWeight: "600", border: "none", cursor: "pointer" }}
        >
          + Tambah Kamar
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
        {rooms.map((room) => (
          <div key={room.id} style={{ background: "white", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <div style={{ height: "192px", position: "relative" }}>
              <img src={room.image} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.9)", padding: "4px 12px", borderRadius: "999px", fontSize: "14px", fontWeight: "600", color: "#1e3d29" }}>
                {room.size}
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e3d29", marginBottom: "8px" }}>{room.name}</h3>
              <p style={{ color: "#6b6b65", fontSize: "14px", marginBottom: "12px" }}>{room.desc}</p>
              
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px" }}>
                {room.amenities.slice(0, 3).map((amenity) => (
                  <span key={amenity} style={{ fontSize: "12px", background: "#f3f4f6", color: "#6b6b65", padding: "4px 8px", borderRadius: "4px" }}>
                    {amenity}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid #e5e5e5" }}>
                <div>
                  <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3d29" }}>{formatPrice(room.price)}</span>
                  <span style={{ color: "#6b6b65", fontSize: "14px" }}>/malam</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => openModal(room)} style={{ padding: "8px", color: "#2d5a3d", background: "#f3f4f6", borderRadius: "8px", border: "none", cursor: "pointer" }}>✏️</button>
                  <button onClick={() => deleteRoom(room.id)} style={{ padding: "8px", color: "#dc2626", background: "#fee2e2", borderRadius: "8px", border: "none", cursor: "pointer" }}>🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "white", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflow: "auto" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "bold", color: "#1e3d29", marginBottom: "24px" }}>
              {editingRoom ? "Edit Kamar" : "Tambah Kamar Baru"}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Nama Kamar</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px" }} required />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Deskripsi</label>
                <textarea value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px", minHeight: "80px" }} required />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Harga</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px" }} required />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Ukuran</label>
                  <input type="text" value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px" }} placeholder="35 m²" required />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: "#1e3d29", marginBottom: "8px" }}>Fasilitas (pisahkan dengan koma)</label>
                <input type="text" value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e5e5", borderRadius: "12px" }} required />
              </div>

              <div style={{ display: "flex", gap: "12px", paddingTop: "12px" }}>
                <button type="button" onClick={closeModal} style={{ flex: 1, padding: "14px", border: "2px solid #e5e5e5", borderRadius: "12px", background: "white", cursor: "pointer" }}>Batal</button>
                <button type="submit" style={{ flex: 1, padding: "14px", background: "#2d5a3d", color: "white", borderRadius: "12px", border: "none", fontWeight: "600", cursor: "pointer" }}>
                  {editingRoom ? "Simpan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}