from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from .models import RecitationClass, CourseFile
from .serializers import RecitationClassSerializer, CourseFileSerializer

@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok", "message": "Discrete Mathematics Backend API is healthy."})


class RecitationClassListView(ListAPIView):
    """
    Returns weekly recitation class schedules, times, locations, and video links.
    Managed by Amir / TAs via Django Admin.
    """
    queryset = RecitationClass.objects.all()
    serializer_class = RecitationClassSerializer


class CourseFileListView(ListAPIView):
    """
    Returns downloadable files filtered by category (assignment, quiz, project, sample_exam, lecture_note).
    Managed by Amir / TAs via Django Admin.
    """
    serializer_class = CourseFileSerializer

    def get_queryset(self):
        queryset = CourseFile.objects.all().order_by('id')
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset
