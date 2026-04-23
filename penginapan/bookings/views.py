import json
import requests
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib import messages
from .models import Room, Booking

OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.2"

SYSTEM_PROMPT = """Kamu adalah asisten customer service Griya Rimba, sebuah penginapan mewah bertema alam di tengah hutan. Bantu tamu dengan ramah dan profesional. Jawab dalam bahasa Indonesia. Informasi penginapan: Griya Rimba menawarkan pengalaman menginap eco-friendly di tengah hutan tropis dengan fasilitas seperti wisata alam, hidangan organik, terapi rimbun, dan api unggun senja."""

def home(request):
    rooms = Room.objects.all()
    # Find bookings by email if search query exists
    email_query = request.GET.get('email', '')
    if email_query:
        my_bookings = Booking.objects.filter(guest_email__icontains=email_query).exclude(status='COMPLETED').order_by('-created_at')
    else:
        my_bookings = Booking.objects.exclude(status='COMPLETED').order_by('-created_at')
    
    # Enrich rooms with occupancy status
    for room in rooms:
        is_occupied = Booking.objects.filter(room=room, status='CHECKED_IN').exists()
        room.is_occupied = is_occupied
        
    return render(request, 'home.html', {
        'rooms': rooms, 
        'my_bookings': my_bookings,
        'email_query': email_query
    })

def book_room(request):
    if request.method == 'POST':
        room_id = request.POST.get('room_id')
        guest_name = request.POST.get('guest_name')
        guest_email = request.POST.get('guest_email')
        check_in = request.POST.get('check_in')
        check_out = request.POST.get('check_out')

        from datetime import date
        
        try:
            # Basic validation
            if not all([room_id, guest_name, guest_email, check_in, check_out]):
                raise ValueError("Harap lengkapi semua data formulir.")

            # Date format validation
            d_check_in = date.fromisoformat(check_in)
            d_check_out = date.fromisoformat(check_out)

            if d_check_in < date.today():
                raise ValueError("Tanggal check-in tidak boleh di masa lalu.")
            
            if d_check_out <= d_check_in:
                raise ValueError("Tanggal check-out harus setelah tanggal check-in.")

            room = Room.objects.get(id=room_id)
            
            # Check availability
            if Booking.objects.filter(room=room, status='CHECKED_IN').exists():
                raise ValueError(f"Maaf, kamar {room.name} sedang terpakai saat ini.")

            booking = Booking.objects.create(
                room=room,
                guest_name=guest_name,
                guest_email=guest_email,
                check_in=d_check_in,
                check_out=d_check_out,
                status='BOOKED'
            )
            messages.success(request, f'Terima kasih {guest_name}! Pemesanan kamar {room.name} berhasil. Silakan cek bagian "Kelola Reservasi" di bawah.')
        except ValueError as ve:
            messages.error(request, f'Kesalahan: {str(ve)}')
        except Exception as e:
            messages.error(request, f'Maaf, terjadi kesalahan saat memesan: Format tanggal tidak valid atau data tidak lengkap.')
        
        return redirect('home')
    
    return redirect('home')

def check_in_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        if booking.status == 'BOOKED':
            booking.status = 'CHECKED_IN'
            booking.save()
            messages.success(request, f'Selamat datang! Anda telah berhasil Check-In di {booking.room.name}.')
    except Exception as e:
        messages.error(request, f'Gagal Check-In: {str(e)}')
    return redirect(f"/?email={request.GET.get('email', '')}")

def check_out_booking(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id)
        if booking.status == 'CHECKED_IN':
            booking.status = 'COMPLETED'
            booking.save()
            messages.success(request, f'Terima kasih! Anda telah menyelesaikan kunjungan di {booking.room.name}. Sampai jumpa kembali!')
    except Exception as e:
        messages.error(request, f'Gagal menyelesaikan pesanan: {str(e)}')
    return redirect(f"/?email={request.GET.get('email', '')}")

def manage_rooms(request):
    rooms = Room.objects.all()
    total_rooms = rooms.count()
    occupied_count = 0
    available_count = 0
    min_price = None
    
    for room in rooms:
        is_occ = Booking.objects.filter(room=room, status='CHECKED_IN').exists()
        room.is_occupied = is_occ
        if is_occ:
            occupied_count += 1
        else:
            available_count += 1
        if min_price is None or room.price < min_price:
            min_price = room.price
    
    return render(request, 'manage_rooms.html', {
        'rooms': rooms,
        'total_rooms': total_rooms,
        'occupied_count': occupied_count,
        'available_count': available_count,
        'min_price': min_price or 0
    })

def add_room(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        image = request.FILES.get('image')
        
        try:
            if not all([name, price, description]):
                raise ValueError("Nama, Harga, dan Deskripsi wajib diisi.")
            Room.objects.create(
                name=name,
                price=price,
                description=description,
                image=image
            )
            messages.success(request, f'Kamar "{name}" berhasil ditambahkan ke dalam sistem.')
        except Exception as e:
            messages.error(request, f'Gagal menambahkan kamar: {str(e)}')
            
    return redirect('manage_rooms')

def delete_room(request, room_id):
    if request.method == 'POST':
        try:
            room = Room.objects.get(id=room_id)
            if Booking.objects.filter(room=room, status='CHECKED_IN').exists():
                messages.error(request, f'Gagal: Kamar "{room.name}" tidak dapat dihapus karena sedang terpakai (Check-In).')
            else:
                room_name = room.name
                room.delete()
                messages.success(request, f'Kamar "{room_name}" berhasil dihapus dari sistem.')
        except Room.DoesNotExist:
            messages.error(request, 'Gagal: Kamar tidak ditemukan.')
        except Exception as e:
            messages.error(request, f'Terjadi kesalahan saat menghapus kamar: {str(e)}')
            
    return redirect('manage_rooms')

@csrf_exempt
def chat_api(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '')
        
        if not user_message:
            return JsonResponse({'error': 'Message is required'}, status=400)
        
        prompt = f"{SYSTEM_PROMPT}\n\nTamu: {user_message}\nAssistant:"
        
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False
        }
        
        response = requests.post(OLLAMA_URL, json=payload, timeout=120)
        response.raise_for_status()
        
        result = response.json()
        ai_response = result.get('response', 'Maaf, saya tidak bisa memproses pertanyaan Anda saat ini.')
        
        return JsonResponse({'response': ai_response})
    
    except requests.exceptions.ConnectionError:
        return JsonResponse({'error': 'Tidak dapat terhubung ke Ollama. Pastikan Ollama sudah berjalan di localhost:11434'}, status=503)
    except requests.exceptions.Timeout:
        return JsonResponse({'error': 'Request timeout. Model mungkin sedang memproses.'}, status=504)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
