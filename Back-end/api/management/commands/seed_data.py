from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import RecitationClass, CourseFile

class Command(BaseCommand):
    help = "Seed database with initial sample course data and superuser"

    def handle(self, *args, **options):
        # Create Superuser if not existing
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("Created admin user (username: admin, password: admin123)"))

        # Seed Recitation Classes
        if RecitationClass.objects.count() == 0:
            recitations = [
                {
                    'title': 'Recitation Session 1: Mathematical Logic & Induction',
                    'date_time': 'Mondays, 14:00 - 16:00',
                    'location_or_link': 'Classroom 102 (Live & Skyroom)',
                    'description': 'Problem-solving session covering truth tables, quantifiers, and mathematical induction.',
                    'video_url': 'https://lms.univ.ac.ir/recitations/session1'
                },
                {
                    'title': 'Recitation Session 2: Set Theory & Relations',
                    'date_time': 'Mondays, 14:00 - 16:00',
                    'location_or_link': 'Classroom 102 (Live & Skyroom)',
                    'description': 'Exercises on equivalence relations, partial orderings, and Cartesian products.',
                    'video_url': 'https://lms.univ.ac.ir/recitations/session2'
                },
                {
                    'title': 'Recitation Session 3: Graph Theory & Trees',
                    'date_time': 'Wednesdays, 16:00 - 18:00',
                    'location_or_link': 'Online Skyroom Room #3',
                    'description': 'Solving Eulerian and Hamiltonian graph problems, tree traversals, and planar graphs.',
                    'video_url': 'https://lms.univ.ac.ir/recitations/session3'
                }
            ]
            for r in recitations:
                RecitationClass.objects.create(**r)

        # Seed Course Files
        if CourseFile.objects.count() == 0:
            files = [
                {
                    'title': 'Homework #1: Propositional Logic & Quantifiers',
                    'category': 'assignment',
                    'description': 'Due Oct 15th at 23:59',
                    'file_url': '/materials/homeworks/hw1_logic.pdf'
                },
                {
                    'title': 'Homework #2: Set Theory & Relations',
                    'category': 'assignment',
                    'description': 'Due Oct 29th at 23:59',
                    'file_url': '/materials/homeworks/hw2_sets.pdf'
                },
                {
                    'title': 'Quiz #1: Logic & Truth Tables (Questions & Solutions)',
                    'category': 'quiz',
                    'description': 'In-class Quiz 1 solved sheet',
                    'file_url': '/materials/quizzes/quiz1_solutions.pdf'
                },
                {
                    'title': 'Programming Project Phase 1: Graph Algorithms in Python',
                    'category': 'project',
                    'description': 'Implementation specs for BFS, DFS, and Dijkstra algorithm',
                    'file_url': '/materials/projects/project_phase1_spec.pdf'
                },
                {
                    'title': 'Midterm Exam Past Papers (2023 - 2025) with Solutions',
                    'category': 'sample_exam',
                    'description': 'Collection of past 3 years midterm exams',
                    'file_url': '/materials/exams/midterm_past_papers.pdf'
                },
                {
                    'title': 'Lecture Notes Chapter 1: Mathematical Logic',
                    'category': 'lecture_note',
                    'description': 'Dr. Tahaei slides for Chapter 1',
                    'file_url': '/materials/notes/chapter1_logic.pdf'
                }
            ]
            for f in files:
                CourseFile.objects.create(**f)

        self.stdout.write(self.style.SUCCESS("Database migration and seeding verified successfully!"))
