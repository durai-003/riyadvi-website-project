from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import BusinessHealthCheckupSubmission
from .serializers import BusinessHealthCheckupSerializer


class BusinessHealthCheckupCreateView(generics.CreateAPIView):
    queryset = BusinessHealthCheckupSubmission.objects.all()
    serializer_class = BusinessHealthCheckupSerializer
    permission_classes = [AllowAny]