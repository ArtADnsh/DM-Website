from django.db import models

class RecitationClass(models.Model):
    number = models.CharField(max_length=10, blank=True, help_text="e.g. 01, 02")
    title = models.CharField(max_length=200, help_text="e.g. Recitation 1: Logic & Induction")
    instructor = models.CharField(max_length=150, blank=True, help_text="e.g. Amir Jebbeli")
    duration = models.CharField(max_length=50, blank=True, help_text="e.g. 52 min")
    date_time = models.CharField(max_length=150, blank=True, help_text="e.g. Mondays, 14:00 - 16:00")
    location_or_link = models.CharField(max_length=300, blank=True, help_text="Classroom number or online meeting link")
    description = models.TextField(blank=True, help_text="Session details or topics covered")
    video_file = models.FileField(upload_to='recitation_videos/', blank=True, null=True, help_text="Upload video file directly from your computer")
    video_url = models.URLField(blank=True, null=True, help_text="External video link (YouTube, Aparat, Skyroom)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['id']
        verbose_name = "Recitation Class"
        verbose_name_plural = "Recitation Classes"

    def __str__(self):
        return f"{self.title} ({self.instructor or 'TA'})"

    @property
    def get_url(self):
        if self.video_file:
            return self.video_file.url
        return self.video_url or '#'


class CourseFile(models.Model):
    CATEGORY_CHOICES = [
        ('assignment', 'Assignments / Homeworks'),
        ('quiz', 'Quizzes'),
        ('project', 'Projects'),
        ('sample_exam', 'Sample Exams'),
        ('lecture_note', 'Lecture Notes'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=300, blank=True, help_text="e.g. Due Oct 20th at 23:59")
    file = models.FileField(upload_to='course_files/', blank=True, null=True, help_text="Upload file directly from your computer")
    file_type = models.CharField(max_length=20, default='PDF', blank=True, help_text="e.g. PDF, ZIP")
    file_size = models.CharField(max_length=20, blank=True, help_text="Auto-calculated if file is uploaded")
    file_url = models.CharField(max_length=500, blank=True, help_text="External link or fallback path")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Course File"
        verbose_name_plural = "Course Files"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"

    def save(self, *args, **kwargs):
        if self.file:
            import os
            ext = os.path.splitext(self.file.name)[1].lstrip('.').upper()
            if ext:
                self.file_type = ext
            try:
                size_bytes = self.file.size
                if size_bytes < 1024 * 1024:
                    self.file_size = f"{round(size_bytes / 1024, 1)} KB"
                else:
                    self.file_size = f"{round(size_bytes / (1024 * 1024), 1)} MB"
            except Exception:
                pass
        super().save(*args, **kwargs)

    @property
    def get_url(self):
        if self.file:
            return self.file.url
        return self.file_url or '#'


