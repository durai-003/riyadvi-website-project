
from rest_framework import serializers
from .models import PlanningGuideLead


class PlanningGuideLeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanningGuideLead
        fields = [
            "id",
            "name",
            "company",
            "email",
            "phone",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
