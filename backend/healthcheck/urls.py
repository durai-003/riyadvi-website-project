from django.urls import path
from .views import BusinessHealthCheckupCreateView

urlpatterns = [
    path(
        "",
        BusinessHealthCheckupCreateView.as_view(),
        name="business-health-checkup-create",
    ),
]