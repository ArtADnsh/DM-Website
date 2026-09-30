from django.contrib import admin
from .models import RecitationClass, RecitationFile, RecitationVideo, CourseFile, CourseAnnouncement

class RecitationFileInline(admin.TabularInline):
    model = RecitationFile
    extra = 1

class RecitationVideoInline(admin.TabularInline):
    model = RecitationVideo
    extra = 1

@admin.register(RecitationClass)
class RecitationClassAdmin(admin.ModelAdmin):
    list_display = ('number', 'title', 'instructor', 'duration', 'date_time', 'created_at')
    list_filter = ('instructor', 'created_at')
    search_fields = ('number', 'title', 'instructor', 'description')
    inlines = [RecitationFileInline, RecitationVideoInline]

@admin.register(CourseFile)
class CourseFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'file_type', 'file_size', 'description', 'created_at')
    list_filter = ('category', 'file_type', 'created_at')
    search_fields = ('title', 'description')

@admin.register(CourseAnnouncement)
class CourseAnnouncementAdmin(admin.ModelAdmin):
    list_display = ('title', 'message_snippet', 'is_active', 'updated_at')

    def message_snippet(self, obj):
        return obj.message[:80] + ("..." if len(obj.message) > 80 else "")
    message_snippet.short_description = "Message"

    def has_add_permission(self, request):
        return not CourseAnnouncement.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
