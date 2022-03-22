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


class HomePage(models.Model):
    imageHomeOne = models.ImageField(upload_to='doula/', null=True)
    imageHomeTwo = models.ImageField(upload_to='doula/', null=True)
    imageHomeThree = models.ImageField(upload_to='doula/', null=True)
    imageHomeFour = models.ImageField(upload_to='doula/', null=True)
    imageHomeFive = models.ImageField(upload_to='doula/', null=True)
    banner = models.ImageField(upload_to='doula/', null=True)
    logo = models.ImageField(upload_to='doula/', null=True)
