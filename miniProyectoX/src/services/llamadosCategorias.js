async function getCategorias() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/categorias/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching categorias');
        }

        const categorias = await response.json();
        return categorias;
    } catch (error) {
        console.error('Error fetching categorias:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function postCategorias(obj) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/categorias/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
     
        if (!response.ok) {
            throw new Error('Error fetching categorias');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error posting categoria:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function updateCategorias(nombre,id) 
{
    try {

        const categoriaData = { 
            nombre
        };

        const response = await fetch(`http://127.0.0.1:8000/api/categorias/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoriaData)
        });

        if (!response.ok) {
            throw new Error('Error fetching categorias');
        }

        return await response.json();
    } catch (error) {
        console.error('Error update categoria:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deleteCategorias(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/categorias/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting categoria with id ${id}`);
        }

        return { message: `Categoria with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting categoria:', error);
        throw error;
    }
}

export default { getCategorias, postCategorias, updateCategorias, deleteCategorias };