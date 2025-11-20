const CategoriaModel = require('../models/categoria.model');

class CategoriasController {
    static getAll(req, res) {
        try {
            const categorias = CategoriaModel.getAll();
            res.json({ success: true, data: categorias });
        } catch (error) {
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
            res.status(201).json({ success: true, data: nuevaCategoria });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    static update(req, res) {
        try {
            const categoriaActualizada = CategoriaModel.update(req.params.id, req.body);
            if (!categoriaActualizada) {
                return res.status(404).json({ success: false, error: 'Categoría no encontrada' });
            }
            res.json({ success: true, data: categoriaActualizada });
        } catch (error) {
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
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = CategoriasController;