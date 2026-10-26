
from django.urls import path
from .views import PlanningGuideLeadCreateView

urlpatterns = [
    path("", PlanningGuideLeadCreateView.as_view(), name="planning-guide-lead-create"),
]
