from django.urls import path
from .views import health_check, RecitationClassListView, CourseFileListView

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('recitations/', RecitationClassListView.as_view(), name='recitations-list'),
    path('files/', CourseFileListView.as_view(), name='files-list'),
]
