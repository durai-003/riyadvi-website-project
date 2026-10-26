
from django.contrib import admin
from .models import ContactEnquiry


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "email",
        "service",
        "created_at",
    )

    list_filter = ("service", "created_at")
    search_fields = ("name", "email", "company")
    readonly_fields = ("created_at",)
    ordering = ("-created_at",)
