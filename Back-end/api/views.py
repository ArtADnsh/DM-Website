from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from django.db.models import Q

from .models import CourseMaterial
from .serializers import CourseMaterialSerializer

# Fixed static data for Discrete Mathematics course (100% English)
COURSE_INFO = {
    "course_name": "Discrete Mathematics & Data Fundamentals",
    "course_code": "CS-201",
    "instructor": "Dr. Tahaei",
    "department": "Department of Computer Engineering",
    "term": "Fall 2026",
    "description": "Fundamental Discrete Mathematics course for Computer Science undergraduate students.",
    "characteristics": "Topics include Mathematical Logic, Set Theory, Graph Theory, Combinatorics, Recurrence Relations, and Discrete Algorithms.",
    "social_links": {
        "telegram_channel": "https://t.me/dm_tahaei_channel",
        "telegram_group": "https://t.me/dm_tahaei_group",
        "bale": "https://bale.ai/dm_tahaei"
    }
}

# Fixed static classroom photos
CLASSROOM_PHOTOS = [
    {
        "id": 1,
        "title": "Discrete Mathematics Lecture Hall",
        "caption": "Dr. Tahaei conducting the intro session on propositional logic",
        "image_url": "/images/classroom1.jpg"
    },
    {
        "id": 2,
        "title": "Recitation & Problem Solving Workshop",
        "caption": "Interactive graph theory problem-solving session",
        "image_url": "/images/classroom2.jpg"
    }
]

# Fixed TA team data
TA_TEAM = [
    {
        "id": 1,
        "name": "Amir Jebbeli",
        "role": "Head Teaching Assistant",
        "email": "amir.jebbeli@univ.ac.ir",
        "telegram_id": "@amir_jebbeli",
        "gender": "male",
        "avatar_url": None
    },
    {
        "id": 2,
        "name": "Sara Ahmadi",
        "role": "Quiz & Assignment Lead",
        "email": "sara.ahmadi@univ.ac.ir",
        "telegram_id": "@sara_ahmadi_ta",
        "gender": "female",
        "avatar_url": None
    },
    {
        "id": 3,
        "name": "Ali Mohammadi",
        "role": "Programming Project Lead",
        "email": "ali.mohammadi@univ.ac.ir",
        "telegram_id": "@ali_m_ta",
        "gender": "male",
        "avatar_url": None
    }
]


@api_view(['GET'])
def health_check(request):
    return Response({"status": "ok", "message": "Discrete Mathematics Course API is running."})


class CourseInfoView(APIView):
    def get(self, request):
        return Response(COURSE_INFO)


class ClassroomPhotoListView(APIView):
    def get(self, request):
        return Response(CLASSROOM_PHOTOS)


class TeachingAssistantListView(APIView):
    def get(self, request):
        return Response(TA_TEAM)


class CourseMaterialListView(ListAPIView):
    serializer_class = CourseMaterialSerializer

    def get_queryset(self):
        queryset = CourseMaterial.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class InternalSearchApiView(APIView):
    """
    Internal search across course materials and TA team.
    """
    def get(self, request):
        query = request.query_params.get('q', '').strip().lower()
        if not query:
            return Response({"query": query, "results": {"materials": [], "tas": []}})

        # Search materials
        materials = CourseMaterial.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query) | Q(category__icontains=query)
        )
        materials_serialized = CourseMaterialSerializer(materials, many=True).data

        # Search TAs in static list
        matched_tas = [
            ta for ta in TA_TEAM
            if query in ta['name'].lower() or query in ta['role'].lower() or query in ta['telegram_id'].lower()
        ]

        return Response({
            "query": query,
            "results": {
                "materials": materials_serialized,
                "tas": matched_tas,
                "count": len(materials_serialized) + len(matched_tas)
            }
        })
