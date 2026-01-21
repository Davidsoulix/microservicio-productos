const ProductoModel = require('../models/producto.model');

class ProductosController {
  static healthCheck(req, res) {
    try {
      const productos = ProductoModel.getAll();
      res.json({
        success: true,
        message: 'Servicio de productos funcionando correctamente',
        timestamp: new Date().toISOString(),
        productosLoaded: productos.length
      });
    } catch (error) {
      console.error('Error en healthCheck productos:', error);
      res.status(500).json({ success: false, error: 'Error en health check' });
    }
  }

  static getAll(req, res) {
    try {
      const { categoriaId } = req.query;
      const productos = ProductoModel.getAll(categoriaId);
      res.json({
        success: true,
        count: productos.length,
        data: productos
      });
    } catch (error) {
      console.error('Error en getAll productos:', error);
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
      console.error('Error en getById producto:', error);
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
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: nuevoProducto
      });
    } catch (error) {
      console.error('Error en create producto:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  static update(req, res) {
    try {
      const productoActualizado = ProductoModel.update(req.params.id, req.body);
      if (!productoActualizado) {
        return res.status(404).json({ success: false, error: 'Producto no encontrado' });
      }
      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: productoActualizado
      });
    } catch (error) {
      console.error('Error en update producto:', error);
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
      console.error('Error en delete producto:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ProductosController;