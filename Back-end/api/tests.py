from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import CourseAnnouncement, RecitationClass, RecitationFile, CourseFile

class ApiEndpointsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_health_check(self):
        response = self.client.get('/api/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('status'), 'ok')

    def test_get_announcement(self):
        CourseAnnouncement.objects.create(
            pk=1,
            title='📢 Test Notice',
            message='Test announcement content',
            is_active=True
        )
        response = self.client.get('/api/announcement/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('title'), '📢 Test Notice')

    def test_get_recitations(self):
        recitation = RecitationClass.objects.create(
            number='01',
            title='Logic & Induction',
            instructor='Amir Jebbeli'
        )
        RecitationFile.objects.create(
            recitation=recitation,
            title='Session 1 Slides',
            file_url='/materials/notes/Propositional_Logic.pdf'
        )
        response = self.client.get('/api/recitations/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['number'], '01')
        self.assertEqual(len(response.data[0]['files']), 1)

    def test_get_course_files(self):
        CourseFile.objects.create(
            title='Slide 01: Propositional Logic',
            category='lecture_note',
            file_url='/materials/notes/Propositional_Logic.pdf'
        )
        CourseFile.objects.create(
            title='HW1 Logic',
            category='assignment',
            file_url='/materials/hw1.pdf'
        )
        
        # Test all files
        response = self.client.get('/api/files/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Test filtering by category
        filtered_response = self.client.get('/api/files/?category=assignment')
        self.assertEqual(filtered_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(filtered_response.data), 1)
        self.assertEqual(filtered_response.data[0]['title'], 'HW1 Logic')
