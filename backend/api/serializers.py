from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BikeStops


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        # no one can read the password, can only write it p
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)

        # create new version of user -validated data is data that passed the checks of username and password
        user = User.objects.create_user(**validated_data)
        return user


# class NoteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Note
#         fields = ["id", "title", "content", "created_at", "author"]

#         # can only see author not write it
#         extra_kwargs = {"author": {"read_only": True}}

class BikeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = BikeStops
        fields = ["id", "capacity", "parking_type", "landmark", 
                  "latitude","longitude","city_name","created_at", "author"]
    # can only see author not write it
        extra_kwargs = {"author": {"read_only": True}}