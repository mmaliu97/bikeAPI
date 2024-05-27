from django.urls import path
from . import views

urlpatterns = [
    path("bikestops/", views.BikeStopsListCreate.as_view(), name="bikestops-list"),
    path("bikestops/delete/<int:pk>/", views.BikeStopsDelete.as_view(), name="delete-bikestops"),
    path("bikestops/update/<int:pk>/", views.BikeStopsUpdate.as_view(), name="update-bikestops"),
    path('bikestops/<int:pk>/', views.BikeStopRetrieve.as_view(), name='bikestop-detail'),

]