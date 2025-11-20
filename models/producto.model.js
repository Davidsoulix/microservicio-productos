let productos = [
  { id: 1, nombre: 'Laptop', descripcion: 'Laptop HP', precio: 800, categoriaId: 1, stock: 10 },
  { id: 2, nombre: 'Camisa', descripcion: 'Camisa de algodón', precio: 25, categoriaId: 2, stock: 50 }
];
let nextProductoId = 3;

class ProductoModel {
  static getAll(categoriaId = null) {
    if (categoriaId) {
      return productos.filter(p => p.categoriaId === parseInt(categoriaId));
    }
    return productos;
  }

  static getById(id) {
    return productos.find(prod => prod.id === parseInt(id));
  }

  static create(data) {
    const nuevoProducto = {
      id: nextProductoId++,
      nombre: data.nombre,
      descripcion: data.descripcion || '',
      precio: parseFloat(data.precio),
      categoriaId: parseInt(data.categoriaId),
      stock: parseInt(data.stock) || 0
    };
    productos.push(nuevoProducto);
    return nuevoProducto;
  }

  static update(id, data) {
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    if (index === -1) return null;

    productos[index] = {
      ...productos[index],
      ...data,
      id: parseInt(id)
    };
    return productos[index];
  }

  static delete(id) {
    const index = productos.findIndex(prod => prod.id === parseInt(id));
    if (index === -1) return false;

    productos.splice(index, 1);
    return true;
  }
}

module.exports = ProductoModel;
