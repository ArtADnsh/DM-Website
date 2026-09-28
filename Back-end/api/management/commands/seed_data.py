from django.core.management.base import BaseCommand
from api.models import CourseInfo, ClassroomPhoto, CourseMaterial, TeachingAssistant

class Command(BaseCommand):
    help = "Seed database with initial sample course data"

    def handle(self, *args, **options):
        # Course Info
        CourseInfo.objects.get_or_create(
            id=1,
            defaults={
                'term': 'نیمسال پاییز ۱۴۰۵ (Fall 2026)',
                'description': 'درس ریاضیات گسسته و مبانی داده ورزی دانشکده مهندسی کامپیوتر - زیر نظر دکتر طاهایی',
                'characteristics': 'مباحث شامل منطق ریاضی، نظریه مجموعه‌ها، نظریه گراف، روابط بازگشتی، ترکیبیات و الگوریتم‌های گسسته.',
                'telegram_channel': 'https://t.me/dm_tahaei_channel',
                'telegram_group': 'https://t.me/dm_tahaei_group',
                'bale_link': 'https://bale.ai/dm_tahaei'
            }
        )

        # Classroom Photos
        photos_data = [
            {'title': 'کلاس درس دکتر طاهایی - جلسه اول', 'image_url': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80', 'caption': 'معرفی سرفصل‌های جدید درس ریاضیات گسسته', 'order': 1},
            {'title': 'کارگاه حل تمرین', 'image_url': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', 'caption': 'جلسه رفع اشکال و رفع ابهام پروژه', 'order': 2},
            {'title': 'محیط دانشگاه و کلاس', 'image_url': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', 'caption': 'برگزاری کوییز حضوری', 'order': 3},
            {'title': 'جلسه گروهی دستیاران آموزشی', 'image_url': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', 'caption': 'هماهنگی و طراحی تمرین‌های سری جدید', 'order': 4},
        ]
        for item in photos_data:
            ClassroomPhoto.objects.get_or_create(title=item['title'], defaults=item)

        # TAs
        tas_data = [
            {'name': 'امیر جبلی', 'role': 'سر دستیار آموزشی (Head TA)', 'email': 'amir.jebbeli@univ.ac.ir', 'telegram_id': '@amir_jebbeli', 'gender': 'male', 'order': 1},
            {'name': 'سارا احمدی', 'role': 'مسئول کوییزها و تمرین‌ها', 'email': 'sara.ahmadi@univ.ac.ir', 'telegram_id': '@sara_ahmadi_ta', 'gender': 'female', 'order': 2},
            {'name': 'علی محمدی', 'role': 'مسئول پروژه‌های برنامه‌نویسی', 'email': 'ali.mohammadi@univ.ac.ir', 'telegram_id': '@ali_m_ta', 'gender': 'male', 'order': 3},
        ]
        for item in tas_data:
            TeachingAssistant.objects.get_or_create(name=item['name'], defaults=item)

        # Materials
        materials_data = [
            {'title': 'جزوه فصل اول: منطق ریاضی و گزاره‌ها', 'category': 'lecture_notes', 'description': 'فایل PDF اسلایدهای فصل اول درس', 'file_url': '/media/materials/notes_ch1.pdf'},
            {'title': 'تمرین سری اول (نظریه مجموعه‌ها)', 'category': 'assignment', 'description': 'مهلت تحویل: جمعه ۱۴ مهرماه', 'file_url': '/media/materials/hw1.pdf'},
            {'title': 'کوییز شماره ۱ (گزاره‌ها و استنتاج)', 'category': 'quiz', 'description': 'صورت سوالات و پاسخنامه تشریحی کوییز اول', 'file_url': '/media/materials/quiz1_solved.pdf'},
            {'title': 'ویدیو کلاس تمرین ۱: کاربردهای الگوریتم الگویابی', 'category': 'recitation', 'description': 'ضبط شده در اسکای‌روم کلاس رفع اشکال', 'file_url': 'https://lms.univ.ac.ir/recitation1'},
            {'title': 'صورت پروژه فاز اول: پیاده‌سازی الگوریتم‌های گراف', 'category': 'project', 'description': 'توضیحات ورودی و خروجی پروژه پایتون', 'file_url': '/media/materials/project_phase1.pdf'},
            {'title': 'نمونه سوالات امتحانی میان‌ترم سال‌های گذشته', 'category': 'sample_exam', 'description': 'مجموعه آزمون‌های میان‌ترم سه ترم اخیر همراه پاسخنامه', 'file_url': '/media/materials/midterm_samples.pdf'},
        ]
        for item in materials_data:
            CourseMaterial.objects.get_or_create(title=item['title'], defaults=item)

        self.stdout.write(self.style.SUCCESS("Database seeded successfully with initial course data!"))
