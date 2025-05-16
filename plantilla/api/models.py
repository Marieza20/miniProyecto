from django.db import models


class Categorias(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre 

class Productos (models.Model):
    nombre = models.CharField(max_length=100, null=True)
    precio = models.DecimalField(decimal_places = 2, max_digits = 10)
    cantidad = models.IntegerField()
    categoria = models.ForeignKey(Categorias,on_delete=models.CASCADE, related_name='Productos')
    
    def __str__(self):
        return self.nombre
    