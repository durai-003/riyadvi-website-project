from django.core.validators import FileExtensionValidator
from django.db import models


class CareerApplication(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    position = models.CharField(max_length=120)

    resume = models.FileField(
        upload_to="career_resumes/",
        validators=[
            FileExtensionValidator(
                allowed_extensions=["pdf", "doc", "docx"]
            )
        ],
    )

    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} - {self.position}"

    class Meta:
        ordering = ["-created_at"]