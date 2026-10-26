from django.db import models


class BusinessHealthCheckupSubmission(models.Model):
    # Step 1: Business Information
    business_name = models.CharField(max_length=150)
    contact_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)

    # Steps 2–5: Assessment answers
    digital_presence = models.JSONField(default=dict, blank=True)
    marketing = models.JSONField(default=dict, blank=True)
    technology = models.JSONField(default=dict, blank=True)
    business_challenges = models.JSONField(default=dict, blank=True)

    # Step 6: Submission timestamp
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.business_name} - {self.contact_name}"