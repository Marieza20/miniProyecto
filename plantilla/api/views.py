from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Categorias, Productos
from .serializers import CategoriasSerializer, ProductosSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated


class CategoriasListCreateView(ListCreateAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class CategoriasDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Categorias.objects.all()
    serializer_class = CategoriasSerializer


class ProductosListCreateView(ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer


class ProductosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductosSerializer
