const ProductoModel = require('../models/producto.model');

class ProductosController {
  static getAll(req, res) {
    try {
      const { categoriaId } = req.query;
      const productos = ProductoModel.getAll(categoriaId);
      res.json({ success: true, data: productos });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static getById(req, res) {
    try {
      const producto = ProductoModel.getById(req.params.id);
      if (!producto) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      res.json({ success: true, data: producto });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static create(req, res) {
    try {
      const { nombre, precio, categoriaId } = req.body;
      if (!nombre || !precio || !categoriaId) {
        return res.status(400).json({
          success: false,
          error: 'Nombre, precio y categoriaId son requeridos'
        });
      }
      const nuevoProducto = ProductoModel.create(req.body);
      res.status(201).json({ success: true, data: nuevoProducto });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static update(req, res) {
    try {
      const productoActualizado = ProductoModel.update(req.params.id, req.body);
      if (!productoActualizado) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      res.json({ success: true, data: productoActualizado });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static delete(req, res) {
    try {
      const eliminado = ProductoModel.delete(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      res.json({ success: true, message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ProductosController;