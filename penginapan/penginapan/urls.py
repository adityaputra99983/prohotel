"""
URL configuration for penginapan project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from bookings import views as booking_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', booking_views.home, name='home'),
    path('book/', booking_views.book_room, name='book_room'),
    path('check-in/<int:booking_id>/', booking_views.check_in_booking, name='check_in_booking'),
    path('check-out/<int:booking_id>/', booking_views.check_out_booking, name='check_out_booking'),
    path('manage-rooms/', booking_views.manage_rooms, name='manage_rooms'),
    path('add-room/', booking_views.add_room, name='add_room'),
    path('delete-room/<int:room_id>/', booking_views.delete_room, name='delete_room'),
    path('api/chat/', booking_views.chat_api, name='chat_api'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
