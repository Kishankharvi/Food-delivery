from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


User=get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","password"]
        extra_kwargs={"password":{"write_only":True}}
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user

class loginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)

    def validate(self,data):
        user=User.objects.filter(email=date["email"]).first()
        if user and user.check_password(data["password"]):
            refresh =RefreshToken.for_user(user)
            return {
                "refresh":str(refresh),
                "access":str(refresh.access_token),
                "user":UserSerializer(user).data
            }
        raise serializers.ValidationError("Invalid credentials")
