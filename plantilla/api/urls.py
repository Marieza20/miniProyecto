from django.urls import path
from .views import CategoriasDetailView,CategoriasListCreateView,ProductosDetailView,ProductosListCreateView

urlpatterns = [
     path('categorias/', CategoriasListCreateView.as_view(), name='categorias-list-create'),
     path('categorias/<int:pk>/', CategoriasDetailView.as_view(), name='categorias-editar-actualizar'),
     path('productos/', ProductosListCreateView.as_view(), name='productos-list-create'),
     path('productos/<int:pk>/', ProductosDetailView.as_view(), name='productos-editar-actualizar'),
]
