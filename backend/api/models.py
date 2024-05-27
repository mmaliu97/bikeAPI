from django.db import models
from django.contrib.auth.models import User


# class Note(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

#     def __str__(self):
#         return self.title

class BikeStops(models.Model):

    # bike details
    capacity = models.IntegerField(default=1)
    parking_type = models.CharField(max_length=255, default="Bollard")
    landmark = models.CharField(max_length=255, default="Marymount MRT")
    latitude = models.FloatField(default=1.34972210693726)
    longitude = models.FloatField(default=103.8390303269501)
    city_name = models.CharField(max_length=255, default="Singapore")
    
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bikestops")
    def __str__(self):
        return f"{self.landmark} Bike Stop in {self.city_name}"