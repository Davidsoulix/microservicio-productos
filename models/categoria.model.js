let categorias = [
    { 
        id: 1, 
        nombre: 'Electrónica', 
        descripcion: 'Productos electrónicos y tecnología',
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-11-20T10:00:00Z'
    },
    { 
        id: 2, 
        nombre: 'Ropa', 
        descripcion: 'Prendas de vestir para todas las edades',
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-11-20T10:00:00Z'
    },
    { 
        id: 3, 
        nombre: 'Hogar', 
        descripcion: 'Artículos para el hogar y decoración',
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-11-20T10:00:00Z'
    }
];
let nextCategoriaId = 4;

class CategoriaModel {
    static getAll() {
        return categorias;
    }

    static getById(id) {
        return categorias.find(cat => cat.id === parseInt(id));
    }

    static create(data) {
        const nuevaCategoria = {
            id: nextCategoriaId++,
            nombre: data.nombre,
            descripcion: data.descripcion || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        categorias.push(nuevaCategoria);
        return nuevaCategoria;
    }

    static update(id, data) {
        const index = categorias.findIndex(cat => cat.id === parseInt(id));
        if (index === -1) return null;

        categorias[index] = {
            ...categorias[index],
            ...data,
            id: parseInt(id),
            updatedAt: new Date().toISOString()
        };
        return categorias[index];
    }

    static delete(id) {
        const index = categorias.findIndex(cat => cat.id === parseInt(id));
        if (index === -1) return false;

        categorias.splice(index, 1);
        return true;
    }
}

module.exports = CategoriaModel;