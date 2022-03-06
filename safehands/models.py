from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255, null=True)
    text = models.TextField(blank=True)
    image = models.ImageField(upload_to='doula/', null=True)

    def __str__(self):
        return self.title
