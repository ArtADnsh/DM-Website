from django.contrib import admin
from .models import RecitationClass, CourseFile

@admin.register(RecitationClass)
class RecitationClassAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'instructor', 'duration', 'date_time', 'created_at')
    list_filter = ('instructor', 'created_at')
    search_fields = ('number', 'title', 'instructor', 'description')

@admin.register(CourseFile)
class CourseFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'file_type', 'file_size', 'description', 'created_at')
    list_filter = ('category', 'file_type', 'created_at')
    search_fields = ('title', 'description')

