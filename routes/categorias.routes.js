const express = require('express');
const router = express.Router();
const CategoriasController = require('../controllers/categorias.controller');

// Health check
router.get('/health', CategoriasController.healthCheck);

// Rutas de categorías
router.get('/', CategoriasController.getAll);
router.get('/:id', CategoriasController.getById);
router.post('/', CategoriasController.create);
router.put('/:id', CategoriasController.update);
router.delete('/:id', CategoriasController.delete);

module.exports = router;
