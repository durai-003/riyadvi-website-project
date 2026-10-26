import os

from rest_framework import serializers

from .models import CareerApplication


class CareerApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerApplication
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "position",
            "resume",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_resume(self, value):
        allowed_extensions = {".pdf", ".doc", ".docx"}
        extension = os.path.splitext(value.name)[1].lower()

        if extension not in allowed_extensions:
            raise serializers.ValidationError(
                "Upload a PDF, DOC, or DOCX resume."
            )

        max_size = 5 * 1024 * 1024

        if value.size > max_size:
            raise serializers.ValidationError(
                "Resume file must be 5 MB or smaller."
            )

        return value