import React, { useEffect, useState } from 'react';
import llamadosCategorias from '../services/llamadosCategorias';
import 'boxicons';

function Categorias() {

    const [categorias, setCategorias] = useState([]);
    const [nombreCategoria, SetNombreCategoria] = useState('');
    const [nombreCategoriaEdit, SetNombreCategoriaEdit] = useState('');
    const [editandoId, setEditandoId] = useState(null);


    useEffect(() => {
        async function fetchDataCategorias() {
            const datos = await llamadosCategorias.getCategorias();
            setCategorias(datos);
        }
        fetchDataCategorias();
    }, []);


    function nombreC(evento) {
        SetNombreCategoria(evento.target.value)
    }

    function nombreCEdit(evento) {
        SetNombreCategoriaEdit(evento.target.value)
    }


    async function cargarC() { 
        const obj ={
            nombre: nombreCategoria
        }

        await llamadosCategorias.postCategorias(obj)
        const datos = await llamadosCategorias.getCategorias()
        setCategorias(datos)
        SetNombreCategoria('');
    }

    async function eliminarC(id) {
        await llamadosCategorias.deleteCategorias(id)
        const datos = await llamadosCategorias.getCategorias()
        setCategorias(datos)
    }
    
    function editarC(id) {
        const encontrado = categorias.find(categoria => categoria.id===id)
        SetNombreCategoriaEdit(encontrado.nombre);
        setEditandoId(id);
    }

    async function cargarEditC(id) {        
        await llamadosCategorias.updateCategorias(nombreCategoriaEdit,id)
        const datos = await llamadosCategorias.getCategorias()
        setCategorias(datos)
        setEditandoId(null);
    }

    function cancelarEditC(id) {
        setEditandoId(null);
    }


    return (
        <div>
            <div>
                <label htmlFor="nombreCategoria">Nombre:</label>
                <input id='nombreCategoria' onChange={nombreC} value={nombreCategoria} type="text" />

                <input onClick={cargarC} type="button" value="Agregar" />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) =>(
                    <tr key={categoria.id}>
                        <td>{categoria.nombre}</td>
                        <td><box-icon onClick={e=>editarC(categoria.id)} name='pencil'></box-icon></td>
                        <td><box-icon onClick={e=>eliminarC(categoria.id)} name='trash'></box-icon></td>
                    </tr>
                    ))}
                </tbody>
            </table>

            {categorias.map((categoria,index) =>(
            <div key={index}>
                {editandoId === categoria.id && (
                <div className="mostrar">
                    <input onChange={nombreCEdit} value={nombreCategoriaEdit} type="text" />
                    <input onClick={e=>cargarEditC(categoria.id)} type="button" value="Guardar" />
                    <input onClick={e=>cancelarEditC(categoria.id)} type="button" value="Cancelar" />
                </div>
                )}
            </div>
            ))}
        </div>
    )
}

export default Categorias