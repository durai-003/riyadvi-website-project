from django.contrib import admin

from .models import CareerApplication


@admin.register(CareerApplication)
class CareerApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "full_name",
        "email",
        "position",
        "created_at",
    )

    search_fields = ("full_name", "email", "position")
    list_filter = ("position", "created_at")
    readonly_fields = ("created_at",)