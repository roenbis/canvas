from django.db import models

class Block(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    radius = models.FloatField()

    def __str__(self):
        return f'Block {self.id} at ({self.x}, {self.y})'

