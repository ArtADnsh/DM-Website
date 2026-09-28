from django.contrib import admin
from .models import RecitationClass, CourseFile

@admin.register(RecitationClass)
class RecitationClassAdmin(admin.ModelAdmin):
    list_display = ('title', 'date_time', 'location_or_link', 'created_at')
    search_fields = ('title', 'date_time', 'location_or_link')

@admin.register(CourseFile)
class CourseFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'description', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description')
