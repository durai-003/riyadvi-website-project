from django.db import models


class ContactEnquiry(models.Model):
    SERVICE_CHOICES = [
        ("Web Development", "Web Development"),
        ("App Development", "App Development"),
        ("Digital Marketing", "Digital Marketing"),
        ("AR/VR", "AR/VR Solutions"),
        ("3D Modeling", "3D Modeling"),
        ("UI/UX Design", "UI/UX Design"),
        ("Other", "Other"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    company = models.CharField(max_length=150, blank=True)
    service = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES,
    )
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.service}"