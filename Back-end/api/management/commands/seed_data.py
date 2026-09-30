from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import RecitationClass, RecitationFile, RecitationVideo, CourseFile

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
                'files': [
                    {
                        'title': 'Recitation 01 Worksheet & Problems',
                        'description': 'Practice problems on truth tables & logical equivalences',
                        'file_type': 'PDF',
                        'file_size': '1.2 MB',
                        'file_url': '/materials/notes/Propositional_Logic.pdf'
                    },
                    {
                        'title': 'Recitation 01 Solved Answer Key',
                        'description': 'Step-by-step solutions by Amir Jebbeli',
                        'file_type': 'PDF',
                        'file_size': '1.5 MB',
                        'file_url': '/materials/notes/Propositional_Logic.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 01 Live Recording (Full Session)',
                        'description': 'Skyroom recording of Amir Jebbeli recitation',
                        'video_url': 'https://www.youtube.com/watch?v=1xNsm_0s3x4',
                        'duration': '52 min'
                    }
                ]
            },
            {
                'number': '02',
                'title': 'Predicates, Quantifiers & Proof Techniques',
                'instructor': 'Kasra Nouri',
                'duration': '1 h 08 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102 & Skyroom',
                'description': 'Direct proofs, proof by contradiction, contrapositive, and nested quantifiers.',
                'files': [
                    {
                        'title': 'Recitation 02 Worksheet & Solution Sheet',
                        'description': 'Predicate logic & proof techniques exercises',
                        'file_type': 'PDF',
                        'file_size': '1.8 MB',
                        'file_url': '/materials/notes/Predicate_Logic.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 02 Live Class Video',
                        'description': 'Full video tutorial by Kasra Nouri',
                        'video_url': 'https://www.youtube.com/watch?v=wX-bK0l2t7E',
                        'duration': '1 h 08 min'
                    }
                ]
            },
            {
                'number': '03',
                'title': 'Mathematical Induction & Strong Induction',
                'instructor': 'Arta Danesh',
                'duration': '58 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102 & Skyroom',
                'description': 'Weak induction, strong induction, structural induction, and well-ordering principle exercises.',
                'files': [
                    {
                        'title': 'Recitation 03 Problem Set',
                        'description': 'Inductive proofs & well-ordering exercises',
                        'file_type': 'PDF',
                        'file_size': '1.4 MB',
                        'file_url': '/materials/notes/Mathematical_Induction.pdf'
                    },
                    {
                        'title': 'Recitation 03 Handwritten Solutions',
                        'description': 'Arta Danesh live whiteboard solution key',
                        'file_type': 'PDF',
                        'file_size': '2.1 MB',
                        'file_url': '/materials/notes/Mathematical_Induction.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 03 Live Video Recording',
                        'description': 'Complete induction tutorial recording by Arta Danesh',
                        'video_url': 'https://www.youtube.com/watch?v=d_kXz9vEwS0',
                        'duration': '58 min'
                    }
                ]
            },
            {
                'number': '04',
                'title': 'Set Theory, Functions & Pigeonhole Principle',
                'instructor': 'Koosha Majlesi',
                'duration': '47 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #2',
                'description': 'Set operations, bijections, cardinality of infinite sets, and pigeonhole principle proofs.',
                'files': [
                    {
                        'title': 'Recitation 04 Sets & Functions Worksheet',
                        'description': 'Bijective proofs & Pigeonhole Principle sheet',
                        'file_type': 'PDF',
                        'file_size': '1.6 MB',
                        'file_url': '/materials/notes/Sets_Functions_Sequences.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 04 Skyroom Recording',
                        'description': 'Koosha Majlesi recitation tutorial',
                        'video_url': 'https://www.youtube.com/watch?v=ROd4o4eZ-g8',
                        'duration': '47 min'
                    }
                ]
            },
            {
                'number': '05',
                'title': 'Elementary Number Theory & Modular Arithmetic',
                'instructor': 'Arash Amiri',
                'duration': '1 h 02 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #2',
                'description': 'Euclidean algorithm, extended GCD, modular inverses, and Chinese Remainder Theorem.',
                'files': [
                    {
                        'title': 'Recitation 05 Number Theory Worksheet',
                        'description': 'Euclidean GCD & Modular Arithmetic problems',
                        'file_type': 'PDF',
                        'file_size': '1.3 MB',
                        'file_url': '/materials/notes/Elementary_Number_Theory.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 05 Recording',
                        'description': 'Arash Amiri video session',
                        'video_url': 'https://www.youtube.com/watch?v=33Lz-7gKjJg',
                        'duration': '1 h 02 min'
                    }
                ]
            },
            {
                'number': '06',
                'title': 'Counting, Permutations & Combinations',
                'instructor': 'Erfan Taghizadeh',
                'duration': '1 h 15 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Permutations, combinations, inclusion-exclusion principle, and binomial identities.',
                'files': [
                    {
                        'title': 'Recitation 06 Combinatorics Exercises',
                        'description': 'Permutations & Inclusion-Exclusion problems',
                        'file_type': 'PDF',
                        'file_size': '1.7 MB',
                        'file_url': '/materials/notes/Combinatorics_Counting.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 06 Class Video',
                        'description': 'Erfan Taghizadeh recitation session',
                        'video_url': 'https://www.youtube.com/watch?v=s80Eshd3R5g',
                        'duration': '1 h 15 min'
                    }
                ]
            },
            {
                'number': '07',
                'title': 'Recurrence Relations & Generating Functions',
                'instructor': 'Iliya Ebrahimi',
                'duration': '55 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Solving linear homogeneous and non-homogeneous recurrence relations with generating functions.',
                'files': [
                    {
                        'title': 'Recitation 07 Recurrence Relations Sheet',
                        'description': 'Solving characteristic equations & power series',
                        'file_type': 'PDF',
                        'file_size': '1.5 MB',
                        'file_url': '/materials/notes/Combinatorics_Counting.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 07 Session Recording',
                        'description': 'Iliya Ebrahimi tutorial recording',
                        'video_url': 'https://www.youtube.com/watch?v=2K7X9_4zYtY',
                        'duration': '55 min'
                    }
                ]
            },
            {
                'number': '08',
                'title': 'Graph Theory: Paths, Circuits & Planarity',
                'instructor': 'Mahdi Alighardashi',
                'duration': '1 h 10 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #3',
                'description': 'Eulerian paths, Hamiltonian cycles, graph colorings, and planar graph theorems.',
                'files': [
                    {
                        'title': 'Recitation 08 Graph Theory Worksheet',
                        'description': 'Eulerian circuits & graph coloring exercises',
                        'file_type': 'PDF',
                        'file_size': '1.9 MB',
                        'file_url': '/materials/notes/Graph_Theory.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 08 Live Video',
                        'description': 'Mahdi Alighardashi graph tutorial recording',
                        'video_url': 'https://www.youtube.com/watch?v=tBVzp_H797o',
                        'duration': '1 h 10 min'
                    }
                ]
            },
            {
                'number': '09',
                'title': 'Trees, Spanning Trees & Graph Isomorphisms',
                'instructor': 'Elmira Bekiasai',
                'duration': '49 min',
                'date_time': 'Wednesdays, 16:00 - 18:00',
                'location_or_link': 'Skyroom Room #3',
                'description': 'Tree traversal, minimum spanning trees (Kruskal & Prim), and testing graph isomorphism.',
                'files': [
                    {
                        'title': 'Recitation 09 Trees & MST Worksheet',
                        'description': 'Spanning trees & Kruskal algorithm problems',
                        'file_type': 'PDF',
                        'file_size': '1.4 MB',
                        'file_url': '/materials/notes/Graph_Theory.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 09 Video Recording',
                        'description': 'Elmira Bekiasai tutorial session',
                        'video_url': 'https://www.youtube.com/watch?v=wU6D8z3WwS0',
                        'duration': '49 min'
                    }
                ]
            },
            {
                'number': '10',
                'title': 'Boolean Algebra & Logic Circuit Minimization',
                'instructor': 'Ramin Buzarpur',
                'duration': '50 min',
                'date_time': 'Mondays, 14:00 - 16:00',
                'location_or_link': 'Classroom 102',
                'description': 'Boolean expressions, digital logic gates, Karnaugh maps, and circuit optimization.',
                'files': [
                    {
                        'title': 'Recitation 10 Boolean Logic Worksheet',
                        'description': 'Karnaugh maps & gate optimization exercises',
                        'file_type': 'PDF',
                        'file_size': '1.3 MB',
                        'file_url': '/materials/notes/Propositional_Logic.pdf'
                    }
                ],
                'videos': [
                    {
                        'title': 'Recitation 10 Live Recording',
                        'description': 'Ramin Buzarpur video recording',
                        'video_url': 'https://www.youtube.com/watch?v=0kP0a1z_S00',
                        'duration': '50 min'
                    }
                ]
            }
        ]

        for r_data in recitations:
            files_data = r_data.pop('files', [])
            videos_data = r_data.pop('videos', [])
            rec, _ = RecitationClass.objects.update_or_create(
                number=r_data['number'],
                defaults=r_data
            )
            for f in files_data:
                RecitationFile.objects.update_or_create(
                    recitation=rec,
                    title=f['title'],
                    defaults=f
                )
            for v in videos_data:
                RecitationVideo.objects.update_or_create(
                    recitation=rec,
                    title=v['title'],
                    defaults=v
                )

        self.stdout.write(self.style.SUCCESS(f"Seeded {len(recitations)} RecitationClasses with nested files & videos"))

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
                'title': 'Discrete Mathematics and Its Applications (8th Edition - Kenneth H. Rosen)',
                'category': 'lecture_note',
                'description': 'Main Textbook Reference for CS-201',
                'file_type': 'PDF',
                'file_size': '35.2 MB',
                'file_url': '/materials/notes/Discrete_Mathematics_and_Its_Applications.pdf'
            },
            {
                'title': 'Slide 00: Course Introduction & Overview',
                'category': 'lecture_note',
                'description': 'Introduction, Course Logistics & Grading Policy',
                'file_type': 'PDF',
                'file_size': '841.1 KB',
                'file_url': '/materials/notes/Introduction.pdf'
            },
            {
                'title': 'Slide 01: Propositional Logic',
                'category': 'lecture_note',
                'description': 'Propositions, Logical Operators, Truth Tables & Equivalences',
                'file_type': 'PDF',
                'file_size': '26.7 MB',
                'file_url': '/materials/notes/Propositional_Logic.pdf'
            },
            {
                'title': 'Slide 02: Predicate Logic & Quantifiers',
                'category': 'lecture_note',
                'description': 'Predicates, Universal & Existential Quantifiers, Nested Quantifiers',
                'file_type': 'PDF',
                'file_size': '22.3 MB',
                'file_url': '/materials/notes/Predicate_Logic.pdf'
            },
            {
                'title': 'Slide 03: Proof Techniques & Methods',
                'category': 'lecture_note',
                'description': 'Direct Proofs, Proof by Contraposition, Contradiction & Cases',
                'file_type': 'PDF',
                'file_size': '43.6 MB',
                'file_url': '/materials/notes/Proof_Techniques.pdf'
            },
            {
                'title': 'Slide 04: Mathematical Induction',
                'category': 'lecture_note',
                'description': 'Mathematical Induction, Strong Induction & Well-Ordering Principle',
                'file_type': 'PDF',
                'file_size': '12.1 MB',
                'file_url': '/materials/notes/Mathematical_Induction.pdf'
            },
            {
                'title': 'Slide 05: Sets, Functions & Sequences',
                'category': 'lecture_note',
                'description': 'Set Operations, Functions, Sequences & Summations',
                'file_type': 'PDF',
                'file_size': '45.5 MB',
                'file_url': '/materials/notes/Sets_Functions_Sequences.pdf'
            },
            {
                'title': 'Slide 06: Countable & Uncountable Sets',
                'category': 'lecture_note',
                'description': "Cardinality of Sets, Countability & Cantor's Diagonalization",
                'file_type': 'PDF',
                'file_size': '1.6 MB',
                'file_url': '/materials/notes/Countable_Sets.pdf'
            },
            {
                'title': 'Slide 07: Pigeonhole Principle',
                'category': 'lecture_note',
                'description': 'Basic & Generalized Pigeonhole Principle with Proof Applications',
                'file_type': 'PDF',
                'file_size': '1.1 MB',
                'file_url': '/materials/notes/Pigeonhole_Principle.pdf'
            },
            {
                'title': 'Slide 08: Elementary Number Theory',
                'category': 'lecture_note',
                'description': 'Divisibility, Primes, Modular Arithmetic, GCD & Cryptography',
                'file_type': 'PDF',
                'file_size': '4.1 MB',
                'file_url': '/materials/notes/Elementary_Number_Theory.pdf'
            },
            {
                'title': 'Slide 09: Combinatorics & Counting',
                'category': 'lecture_note',
                'description': 'Permutations, Combinations, Binomial Coefficients & Inclusion-Exclusion',
                'file_type': 'PDF',
                'file_size': '2.7 MB',
                'file_url': '/materials/notes/Combinatorics_Counting.pdf'
            },
            {
                'title': 'Slide 10: Graph Theory',
                'category': 'lecture_note',
                'description': 'Graph Terminology, Paths, Circuits, Trees & Connectivity',
                'file_type': 'PDF',
                'file_size': '2.1 MB',
                'file_url': '/materials/notes/Graph_Theory.pdf'
            },
        ]

        for f in files:
            CourseFile.objects.get_or_create(
                title=f['title'],
                defaults=f
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(files)} CourseFiles"))

        # Seed Course Announcement (Singleton)
        from api.models import CourseAnnouncement
        CourseAnnouncement.objects.get_or_create(
            pk=1,
            defaults={
                'title': '📌 Next Recitation Class',
                'message': 'Propositional Logic & Truth Tables\nMondays, 14:00 - 16:00 | Classroom 102 & Skyroom',
                'link': '/recitations/1',
                'link_text': 'Join Meeting / Watch Video',
                'is_active': True
            }
        )
        self.stdout.write(self.style.SUCCESS("Seeded CourseAnnouncement Singleton"))

        self.stdout.write(self.style.SUCCESS("Database seeding completed successfully!"))

