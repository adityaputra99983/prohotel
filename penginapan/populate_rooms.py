import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'penginapan.settings')
django.setup()

from bookings.models import Room

def populate():
    rooms = [
        {
            "name": "Griya Kanopi Kaca",
            "description": "Menawarkan dinding kaca dari lantai ke langit-langit dengan pemandangan 360 derajat ke dalam hutan tropis yang rimbun.",
            "price": 2500000,
            "image_url": "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "name": "Sanctuari Batu Sungai",
            "description": "Terletak tepat di pinggir sungai mengalir, dengan kolam air hangat alami dan balkon yang tenang di bawah rindangnya pohon.",
            "price": 4200000,
            "image_url": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"
        },
        {
            "name": "Pondok Pinus Mewah",
            "description": "Penginapan kayu pinus yang hangat dengan perapian pribadi dan akses langsung ke jalur pendakian hutan.",
            "price": 3100000,
            "image_url": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000"
        }
    ]

    for room_data in rooms:
        Room.objects.get_or_create(
            name=room_data['name'],
            defaults={
                'description': room_data['description'],
                'price': room_data['price'],
                'image_url': room_data['image_url']
            }
        )
    print("Database has been populated with nature rooms!")

if __name__ == '__main__':
    populate()
