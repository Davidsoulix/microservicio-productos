let productos = [
  {
    id: 1,
    nombre: 'Laptop HP Pavilion',
    descripcion: 'Laptop HP 15.6" Intel Core i5 8GB RAM 256GB SSD',
    precio: 800,
    categoriaId: 1,
    stock: 10,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-11-20T14:45:00Z'
  },
  {
    id: 2,
    nombre: 'Camisa Formal',
    descripcion: 'Camisa de algodón 100% talla M',
    precio: 25,
    categoriaId: 2,
    stock: 50,
    createdAt: '2024-02-10T09:15:00Z',
    updatedAt: '2024-11-18T11:20:00Z'
  },
  {
    id: 3,
    nombre: 'Mouse Logitech',
    descripcion: 'Mouse inalámbrico ergonómico',
    precio: 35,
    categoriaId: 1,
    stock: 25,
    createdAt: '2024-03-05T16:00:00Z',
    updatedAt: '2024-11-15T09:30:00Z'
  }
];
let nextProductoId = 4;

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
      stock: parseInt(data.stock) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
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
      id: parseInt(id),
      updatedAt: new Date().toISOString()
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