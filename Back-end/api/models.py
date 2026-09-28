from django.db import models

class RecitationClass(models.Model):
    title = models.CharField(max_length=200, help_text="e.g. Recitation 1: Logic & Induction")
    date_time = models.CharField(max_length=150, help_text="e.g. Mondays, 14:00 - 16:00")
    location_or_link = models.CharField(max_length=300, help_text="Classroom number or online meeting link")
    description = models.TextField(blank=True, help_text="Session details or topics covered")
    video_url = models.URLField(blank=True, null=True, help_text="Recording link if available")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Recitation Class"
        verbose_name_plural = "Recitation Classes"

    def __str__(self):
        return f"{self.title} ({self.date_time})"


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
    file_url = models.CharField(max_length=500, help_text="Direct link or path for single-click download")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Course File"
        verbose_name_plural = "Course Files"

    def __str__(self):
        return f"[{self.get_category_display()}] {self.title}"
