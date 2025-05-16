import React, { useState, useEffect } from 'react'
import llamadosCategorias from '../services/llamadosCategorias';
import llamadosProductos from '../services/llamadosProductos';
import 'boxicons';

function Productos() {
    const [categorias, setCategorias]=useState([]);
    const [productos, setProductos]=useState([]);
    const [nombreProducto, SetNombreProducto]=useState('');
    const [precioProducto, SetPrecioProducto]=useState('');
    const [cantidadProducto, SetCantidadProducto]=useState('');
    const [categoriaProducto, SetCategoriaProducto]=useState('');
    const [nombreProductoEdit, SetNombreProductoEdit]=useState('');
    const [precioProductoEdit, SetPrecioProductoEdit]=useState('');
    const [cantidadProductoEdit, SetCantidadProductoEdit]=useState('');
    const [categoriaProductoEdit, SetCategoriaProductoEdit]=useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        async function fetchDataCategorias() {
            const datos = await llamadosCategorias.getCategorias();
            setCategorias(datos);
        }
        fetchDataCategorias();
    }, []);

    useEffect(() => {
        async function fetchDataProductos(){
            const datos = await llamadosProductos.getProductos()
            setProductos(datos)
        };
        fetchDataProductos();
    },[]);


    function nombre(evento) {
        SetNombreProducto(evento.target.value)
    }
    
    function precio(evento) {
        SetPrecioProducto(evento.target.value)
    }
    
    function cantidad(evento) {
        SetCantidadProducto(evento.target.value)
    }

    function categoriaP(evento) {
        SetCategoriaProducto(evento.target.value)
    }
    
    function nombreEdit(evento) {
        SetNombreProductoEdit(evento.target.value)
    }

    function precioEdit(evento) {
        SetPrecioProductoEdit(evento.target.value)
    }

    function cantidadEdit(evento) {
        SetCantidadProductoEdit(evento.target.value)
    }

    function categoriaPEdit(evento) {
        SetCategoriaProductoEdit(evento.target.value)
    }

    async function cargar() { 
        const obj ={
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: cantidadProducto,
            categoria: categoriaProducto
        }

        const respuestaServer = await llamadosProductos.postProductos(obj)
        const datos = await llamadosProductos.getProductos()
        setProductos(datos)

        SetNombreProducto('');
        SetPrecioProducto('');
        SetCantidadProducto('');
        SetCategoriaProducto('');
    }
  
    async function eliminar(id) {
        await llamadosProductos.deleteProductos(id)
        const datos = await llamadosProductos.getProductos()
        setProductos(datos)
    }
    
    function editar(id) {
        const encontrado = productos.find(producto => producto.id===id)
        SetNombreProductoEdit(encontrado.nombre);
        SetPrecioProductoEdit(encontrado.precio);
        SetCantidadProductoEdit(encontrado.cantidad);
        SetCategoriaProductoEdit(encontrado.categoria);
        setEditandoId(id);
    }

    async function cargarEdit(id) {        
        await llamadosProductos.updateProductos(nombreProductoEdit,precioProductoEdit,cantidadProductoEdit,categoriaProductoEdit,id)
        const datos = await llamadosProductos.getProductos()
        setProductos(datos)
        setEditandoId(null);
    }

    function cancelarEdit(id) {
        setEditandoId(null);
    }


  return (
    <div>
        <div id='CrearProducto'>
            <label htmlFor="nombreProducto">Nombre:</label>
            <input id='nombreProducto' onChange={nombre} value={nombreProducto} type="text" />

            <label htmlFor="precioProducto">Precio:</label>
            <input id="precioProducto" onChange={precio} value={precioProducto} type="number" />

            <label htmlFor="cantidadProducto">Cantidad:</label>
            <input id="cantidadProducto" onChange={cantidad} value={cantidadProducto} type="number" />

            <label htmlFor="categoriaProducto">Categoria</label>
            <select id="categoriaProducto" onChange={categoriaP} value={categoriaProducto}>
                <option value="">Elige el tipo</option>
                {categorias.map((categoria) =>(
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                ))}
            </select>

            <input onClick={cargar} type="button" value="Agregar" />
        </div>


        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Categoria</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) =>(
                <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.categoria}</td>
                    <td><box-icon onClick={e=>editar(producto.id)} name='pencil'></box-icon></td>
                    <td><box-icon onClick={e=>eliminar(producto.id)} name='trash'></box-icon></td>
                </tr>
                ))}
            </tbody>
        </table>


        {productos.map((producto,index) =>(
        <div key={index}>
            {editandoId === producto.id && (
            <div className="mostrar">
                <input onChange={nombreEdit} value={nombreProductoEdit} type="text" />
                <input onChange={precioEdit} value={precioProductoEdit} type="text" />
                <input onChange={cantidadEdit} value={cantidadProductoEdit} type="text" />
                <select onChange={categoriaPEdit} value={categoriaProductoEdit}>
                    <option value="">Elige el tipo</option>
                    {categorias.map((categoria) =>(
                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                    ))}
                </select>
                <input onClick={e=>cargarEdit(producto.id)} type="button" value="Guardar" />
                <input onClick={e=>cancelarEdit(producto.id)} type="button" value="Cancelar" />
            </div>
            )}
        </div>
        ))}
    </div>
  )
}

export default Productos