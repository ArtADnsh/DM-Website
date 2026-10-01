from rest_framework import serializers
from .models import RecitationClass, RecitationFile, RecitationVideo, CourseFile, CourseAnnouncement

class RecitationFileSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_url', read_only=True)
    type = serializers.CharField(source='file_type', read_only=True)
    size = serializers.CharField(source='file_size', read_only=True)

    class Meta:
        model = RecitationFile
        fields = ['id', 'title', 'description', 'file', 'file_type', 'type', 'file_size', 'size', 'file_url', 'url', 'created_at']


class RecitationVideoSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_url', read_only=True)

    class Meta:
        model = RecitationVideo
        fields = ['id', 'title', 'description', 'video_file', 'video_url', 'url', 'duration', 'created_at']


class RecitationClassSerializer(serializers.ModelSerializer):
    files = RecitationFileSerializer(many=True, read_only=True)
    videos = RecitationVideoSerializer(many=True, read_only=True)

    class Meta:
        model = RecitationClass
        fields = ['id', 'number', 'title', 'instructor', 'instructor_telegram', 'duration', 'date_time', 'location_or_link', 'description', 'files', 'videos', 'created_at']


class CourseFileSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    url = serializers.CharField(source='get_url', read_only=True)
    type = serializers.CharField(source='file_type', read_only=True)
    size = serializers.CharField(source='file_size', read_only=True)

    class Meta:
        model = CourseFile
        fields = ['id', 'title', 'category', 'category_display', 'description', 'file', 'file_type', 'type', 'file_size', 'size', 'file_url', 'url', 'created_at']


class CourseAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseAnnouncement
        fields = ['id', 'title', 'message', 'link', 'link_text', 'is_active', 'updated_at']

