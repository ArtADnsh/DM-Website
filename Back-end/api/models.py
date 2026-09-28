from django.db import models

class CourseMaterial(models.Model):
    CATEGORY_CHOICES = [
        ('lecture_notes', 'Lecture Notes'),
        ('assignment', 'Assignments'),
        ('quiz', 'Quizzes'),
        ('recitation', 'Recitation Classes'),
        ('project', 'Projects'),
        ('sample_exam', 'Sample Exams'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    file_url = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.category}] {self.title}"
