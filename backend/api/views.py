from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, BikeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BikeStops
from rest_framework.views import APIView
from rest_framework.response import Response


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Creating and Retrieving
class BikeStopsListCreate(generics.ListCreateAPIView):
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

    # overwriting get_queryset
    def get_queryset(self):

        user = self.request.user
        return BikeStops.objects.filter()

    
    def perform_create(self, serializer):
        if serializer.is_valid():
            # serializer data saved into note automatically, author info has to be manually entered
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

# Just GETTING bikestop
class BikeStopRetrieve(generics.RetrieveAPIView):
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'  # or 'pk' if you use the primary key field

    def get_queryset(self):
        user = self.request.user
        return BikeStops.objects.filter()

# Delete functionality
class BikeStopsDelete(generics.DestroyAPIView):
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return BikeStops.objects.filter(author=user)

# Update functionality
class BikeStopsUpdate(generics.UpdateAPIView):
    serializer_class = BikeSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
# 
    def get_queryset(self):
        user = self.request.user
        return BikeStops.objects.filter(author=user)



class CreateUserView(generics.CreateAPIView):
    # built in view from django

    # get all users to prevent duplicates
    queryset = User.objects.all()

    # accept user class info, ie username and pw
    serializer_class = UserSerializer

    # allow any, to include non users and let them create their account
    permission_classes = [AllowAny]