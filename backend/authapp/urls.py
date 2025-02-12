from django.urls import path
from .views import SignUpView,LoginView,LogoutView,UserDetailView
urlpatterns=[
    path('signin/',SignUpView.as_view(),name='signin'),
    path('login/',LoginView.as_view(),name='login'),
    path('logout/',LogoutView.as_view(),name='logout'),
    path('user/',UserDetailView.as_view(),name='user-detail'),
]