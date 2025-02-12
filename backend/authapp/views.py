from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login

from rest_framework.response import Response
from rest_framework import status,generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import UserSerializer,RegisterSerializer,loginSerializer


User=get_user_model()


class SignUpView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):

        serializer=RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user=serializer.save()
            return Response(
                {"message":"Data added to database succesfully","user":UserSerializer(user).data},
                status=status.HTTP_201_CREATED
            )
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
class LoginView(APIView):
    permission_classes=[AllowAny]

    def post(self,request):
       
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        try:
            refresh_token=request.data["refresh"]
            token=RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message':'Logout successful'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message':'Invalid token'},status=status.HTTP_400_BAD_REQUEST)
class UserDetailView(generics.RetrieveAPIView):
    serializer_class=UserSerializer
    permission_classes=[IsAuthenticated]
    def get_object(self):
        return self.request.user