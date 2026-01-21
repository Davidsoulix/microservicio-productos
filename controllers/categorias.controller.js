const CategoriaModel = require('../models/categoria.model');

class CategoriasController {
    static healthCheck(req, res) {
        try {
            const categorias = CategoriaModel.getAll();
            res.json({
                success: true,
                message: 'Servicio de categorías funcionando correctamente',
                timestamp: new Date().toISOString(),
                categoriasLoaded: categorias.length
            });
        } catch (error) {
            console.error('Error en healthCheck categorías:', error);
            res.status(500).json({ success: false, error: 'Error en health check' });
        }
    }

    static getAll(req, res) {
        try {
            const categorias = CategoriaModel.getAll();
            res.json({ 
                success: true, 
                count: categorias.length,
                data: categorias 
            });
        } catch (error) {
            console.error('Error en getAll categorías:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static getById(req, res) {
        try {
            const categoria = CategoriaModel.getById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
            }
            res.json({ success: true, data: categoria });
        } catch (error) {
            console.error('Error en getById categoría:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static create(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) {
                return res.status(400).json({ success: false, error: 'El nombre es requerido' });
            }
            const nuevaCategoria = CategoriaModel.create(req.body);
            res.status(201).json({ 
                success: true, 
                message: 'Categoría creada exitosamente como una prueba de webhook',
                data: nuevaCategoria 
            });
        } catch (error) {
            console.error('Error en create categoría:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static update(req, res) {
        try {
            const categoriaActualizada = CategoriaModel.update(req.params.id, req.body);
            if (!categoriaActualizada) {
                return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
            }
            res.json({ 
                success: true, 
                message: 'Categoría actualizada exitosamente',
                data: categoriaActualizada 
            });
        } catch (error) {
            console.error('Error en update categoría:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static delete(req, res) {
        try {
            const eliminado = CategoriaModel.delete(req.params.id);
            if (!eliminado) {
                return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
            }
            res.json({ success: true, message: 'Categoría eliminada correctamente' });
        } catch (error) {
            console.error('Error en delete categoría:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = CategoriasController;