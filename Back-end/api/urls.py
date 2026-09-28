from django.urls import path
from .views import (
    health_check,
    CourseInfoView,
    ClassroomPhotoListView,
    CourseMaterialListView,
    TeachingAssistantListView,
    InternalSearchApiView
)

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('course-info/', CourseInfoView.as_view(), name='course-info'),
    path('photos/', ClassroomPhotoListView.as_view(), name='classroom-photos'),
    path('materials/', CourseMaterialListView.as_view(), name='course-materials'),
    path('tas/', TeachingAssistantListView.as_view(), name='teaching-assistants'),
    path('search/', InternalSearchApiView.as_view(), name='internal-search'),
]
