
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import PlanningGuideLead
from .serializers import PlanningGuideLeadSerializer


class PlanningGuideLeadCreateView(generics.CreateAPIView):
    queryset = PlanningGuideLead.objects.all()
    serializer_class = PlanningGuideLeadSerializer
    permission_classes = [AllowAny]
