from django.urls import path
from .views import health_check, get_announcement, RecitationClassListView, CourseFileListView

urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('announcement/', get_announcement, name='announcement'),
    path('recitations/', RecitationClassListView.as_view(), name='recitations-list'),
    path('files/', CourseFileListView.as_view(), name='files-list'),
]
