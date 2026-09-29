from rest_framework import serializers
from .models import RecitationClass, CourseFile

class RecitationClassSerializer(serializers.ModelSerializer):
    url = serializers.CharField(source='get_url', read_only=True)

    class Meta:
        model = RecitationClass
        fields = ['id', 'number', 'title', 'instructor', 'duration', 'date_time', 'location_or_link', 'description', 'video_file', 'video_url', 'url', 'created_at']


class CourseFileSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    url = serializers.CharField(source='get_url', read_only=True)
    type = serializers.CharField(source='file_type', read_only=True)
    size = serializers.CharField(source='file_size', read_only=True)

    class Meta:
        model = CourseFile
        fields = ['id', 'title', 'category', 'category_display', 'description', 'file', 'file_type', 'type', 'file_size', 'size', 'file_url', 'url', 'created_at']


