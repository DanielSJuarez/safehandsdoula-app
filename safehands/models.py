from django.db import models

# Create your models here.

class Article(models.Model):
    INFOTYPE = (
        ('HOW', 'how'),
        ('WHY', 'Why'),
        ('WHT', 'What')
    )

    title = models.CharField(max_length=255, null=True)
    text = models.TextField(blank=True)
    image = models.ImageField(upload_to='doula/', null=True)
    catagory = models.CharField(max_length=3, choices=INFOTYPE, default='HOW')


    def __str__(self):
        return self.title
