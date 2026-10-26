from rest_framework import serializers
from .models import BusinessHealthCheckupSubmission


class BusinessHealthCheckupSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessHealthCheckupSubmission
        fields = [
            "id",
            "business_name",
            "contact_name",
            "email",
            "phone",
            "website",
            "industry",
            "digital_presence",
            "marketing",
            "technology",
            "business_challenges",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]