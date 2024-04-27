from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    # overwriting get_queryset
    def perform_create(self, serializer):
        if serializer.is_valid():
            # serializer data saved into note automatically, author info has to be manually entered
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    # built in view from django

    # get all users to prevent duplicates
    queryset = User.objects.all()

    # accept user class info, ie username and pw
    serializer_class = UserSerializer

    # allow any, to include non users and let them create their account
    permission_classes = [AllowAny]