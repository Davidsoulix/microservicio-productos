let categorias = [
    { id: 1, nombre: 'Electrónica', descripcion: 'Productos electrónicos' },
    { id: 2, nombre: 'Ropa', descripcion: 'Prendas de vestir' }
];
let nextCategoriaId = 3;

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
            descripcion: data.descripcion || ''
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
            id: parseInt(id)
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