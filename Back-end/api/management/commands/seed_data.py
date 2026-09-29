from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import RecitationClass, CourseFile

class Command(BaseCommand):
    help = "Seed database with initial sample course data and superuser"

    def handle(self, *args, **options):
        # Create Superuser if not existing
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@outlook.com', 'admin123')
            self.stdout.write(self.style.SUCCESS("Created admin user (username: admin, password: admin123)"))

        # Seed Recitation Classes (Tutorial Sessions)
        recitations = [
            {
                'number': '01',
                'title': 'Propositional Logic & Truth Tables',
                'instructor': 'Amir Jebbeli',
                'duration': '52 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102 & Skyroom',
                'description': 'Comprehensive problem-solving session covering truth tables, logical equivalences, and compound propositions.',
                'video_url': 'https://www.youtube.com/watch?v=1xNsm_0s3x4',
            },
            {
                'number': '02',
                'title': 'Predicates, Quantifiers & Proof Techniques',
                'instructor': 'Kasra Nouri',
                'duration': '1 h 08 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102 & Skyroom',
                'description': 'Direct proofs, proof by contradiction, contrapositive, and nested quantifiers.',
                'video_url': 'https://www.youtube.com/watch?v=wX-bK0l2t7E',
            },
            {
                'number': '03',
                'title': 'Mathematical Induction & Strong Induction',
                'instructor': 'Arta Danesh',
                'duration': '58 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102 & Skyroom',
                'description': 'Weak induction, strong induction, structural induction, and well-ordering principle exercises.',
                'video_url': 'https://www.youtube.com/watch?v=d_kXz9vEwS0',
            },
            {
                'number': '04',
                'title': 'Set Theory, Functions & Pigeonhole Principle',
                'instructor': 'Koosha Majlesi',
                'duration': '47 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #2',
                'description': 'Set operations, bijections, cardinality of infinite sets, and pigeonhole principle proofs.',
                'video_url': 'https://www.youtube.com/watch?v=ROd4o4eZ-g8',
            },
            {
                'number': '05',
                'title': 'Elementary Number Theory & Modular Arithmetic',
                'instructor': 'Arash Amiri',
                'duration': '1 h 02 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #2',
                'description': 'Euclidean algorithm, extended GCD, modular inverses, and Chinese Remainder Theorem.',
                'video_url': 'https://www.youtube.com/watch?v=33Lz-7gKjJg',
            },
            {
                'number': '06',
                'title': 'Counting, Permutations & Combinations',
                'instructor': 'Erfan Taghizadeh',
                'duration': '1 h 15 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Permutations, combinations, inclusion-exclusion principle, and binomial identities.',
                'video_url': 'https://www.youtube.com/watch?v=s80Eshd3R5g',
            },
            {
                'number': '07',
                'title': 'Recurrence Relations & Generating Functions',
                'instructor': 'Iliya Ebrahimi',
                'duration': '55 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Solving linear homogeneous and non-homogeneous recurrence relations with generating functions.',
                'video_url': 'https://www.youtube.com/watch?v=2K7X9_4zYtY',
            },
            {
                'number': '08',
                'title': 'Graph Theory: Paths, Circuits & Planarity',
                'instructor': 'Mahdi Alighardashi',
                'duration': '1 h 10 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #3',
                'description': 'Eulerian paths, Hamiltonian cycles, graph colorings, and planar graph theorems.',
                'video_url': 'https://www.youtube.com/watch?v=tBVzp_H797o',
            },
            {
                'number': '09',
                'title': 'Trees, Spanning Trees & Graph Isomorphisms',
                'instructor': 'Elmira Bekiasai',
                'duration': '49 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #3',
                'description': 'Tree traversal, minimum spanning trees (Kruskal & Prim), and testing graph isomorphism.',
                'video_url': 'https://www.youtube.com/watch?v=wU6D8z3WwS0',
            },
            {
                'number': '10',
                'title': 'Boolean Algebra & Logic Circuit Minimization',
                'instructor': 'Ramin Buzarpur',
                'duration': '50 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Boolean expressions, digital logic gates, Karnaugh maps, and circuit optimization.',
                'video_url': 'https://www.youtube.com/watch?v=0kP0a1z_S00',
            },
        ]

        for r in recitations:
            RecitationClass.objects.update_or_create(
                number=r['number'],
                defaults=r
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(recitations)} RecitationClasses"))

        # Seed Course Files
        files = [
            {
                'title': 'Homework #1: Propositional Logic & Quantifiers',
                'category': 'assignment',
                'description': 'Due Oct 15th at 23:59',
                'file_type': 'PDF',
                'file_size': '1.2 MB',
                'file_url': '/materials/homeworks/hw1_logic.pdf'
            },
            {
                'title': 'Homework #2: Set Theory, Functions & Induction',
                'category': 'assignment',
                'description': 'Due Oct 29th at 23:59',
                'file_type': 'PDF',
                'file_size': '1.4 MB',
                'file_url': '/materials/homeworks/hw2_sets.pdf'
            },
            {
                'title': 'Homework #3: Elementary Number Theory',
                'category': 'assignment',
                'description': 'Due Nov 12th at 23:59',
                'file_type': 'PDF',
                'file_size': '1.1 MB',
                'file_url': '/materials/homeworks/hw3_number_theory.pdf'
            },
            {
                'title': 'Homework #4: Combinatorics & Recurrence Relations',
                'category': 'assignment',
                'description': 'Due Dec 03rd at 23:59',
                'file_type': 'PDF',
                'file_size': '1.5 MB',
                'file_url': '/materials/homeworks/hw4_combinatorics.pdf'
            },
            {
                'title': 'Homework #5: Graph Theory & Trees',
                'category': 'assignment',
                'description': 'Due Dec 24th at 23:59',
                'file_type': 'PDF',
                'file_size': '1.8 MB',
                'file_url': '/materials/homeworks/hw5_graphs.pdf'
            },
            {
                'title': 'Quiz #1: Logic & Truth Tables (Questions & Solutions)',
                'category': 'quiz',
                'description': 'In-class Quiz 1 solved sheet',
                'file_type': 'PDF',
                'file_size': '850 KB',
                'file_url': '/materials/quizzes/quiz1_solutions.pdf'
            },
            {
                'title': 'Quiz #2: Set Theory & Relations (Questions & Solutions)',
                'category': 'quiz',
                'description': 'In-class Quiz 2 solved sheet',
                'file_type': 'PDF',
                'file_size': '920 KB',
                'file_url': '/materials/quizzes/quiz2_solutions.pdf'
            },
            {
                'title': 'Programming Project Phase 1: Automated Graph Algorithms Solver',
                'category': 'project',
                'description': 'Implementation specs for BFS, DFS, Dijkstra, and Kruskal algorithms in Python',
                'file_type': 'ZIP',
                'file_size': '3.2 MB',
                'file_url': '/materials/projects/project_phase1_spec.zip'
            },
            {
                'title': 'Midterm Exam Past Papers (2022 - 2025) with Solutions',
                'category': 'sample_exam',
                'description': 'Collection of past 3 years midterm exams and detailed step-by-step solutions',
                'file_type': 'PDF',
                'file_size': '4.5 MB',
                'file_url': '/materials/exams/midterm_past_papers.pdf'
            },
            {
                'title': 'Final Exam Past Papers (2022 - 2025) with Solutions',
                'category': 'sample_exam',
                'description': 'Collection of past 3 years final exams with answer key',
                'file_type': 'PDF',
                'file_size': '5.2 MB',
                'file_url': '/materials/exams/final_past_papers.pdf'
            },
            {
                'title': 'Lecture Notes Chapter 1: Mathematical Logic & Proof Methods',
                'category': 'lecture_note',
                'description': 'Dr. Tahaei lecture slides for Chapter 1',
                'file_type': 'PDF',
                'file_size': '3.8 MB',
                'file_url': '/materials/notes/chapter1_logic.pdf'
            },
            {
                'title': 'Lecture Notes Chapter 2: Sets, Functions & Relations',
                'category': 'lecture_note',
                'description': 'Dr. Tahaei lecture slides for Chapter 2',
                'file_type': 'PDF',
                'file_size': '4.1 MB',
                'file_url': '/materials/notes/chapter2_sets.pdf'
            },
            {
                'title': 'Lecture Notes Chapter 3: Elementary Number Theory',
                'category': 'lecture_note',
                'description': 'Dr. Tahaei lecture slides for Chapter 3',
                'file_type': 'PDF',
                'file_size': '3.5 MB',
                'file_url': '/materials/notes/chapter3_number_theory.pdf'
            },
            {
                'title': 'Lecture Notes Chapter 4: Advanced Counting & Generating Functions',
                'category': 'lecture_note',
                'description': 'Dr. Tahaei lecture slides for Chapter 4',
                'file_type': 'PDF',
                'file_size': '4.8 MB',
                'file_url': '/materials/notes/chapter4_counting.pdf'
            },
            {
                'title': 'Lecture Notes Chapter 5: Graph Theory & Tree Algorithms',
                'category': 'lecture_note',
                'description': 'Dr. Tahaei lecture slides for Chapter 5',
                'file_type': 'PDF',
                'file_size': '5.5 MB',
                'file_url': '/materials/notes/chapter5_graphs.pdf'
            },
        ]

        for f in files:
            CourseFile.objects.update_or_create(
                title=f['title'],
                defaults=f
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(files)} CourseFiles"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))
