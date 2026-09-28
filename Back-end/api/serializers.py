from rest_framework import serializers
from .models import RecitationClass, CourseFile

class RecitationClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecitationClass
        fields = '__all__'


class CourseFileSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = CourseFile
        fields = ['id', 'title', 'category', 'category_display', 'description', 'file_url', 'created_at']
