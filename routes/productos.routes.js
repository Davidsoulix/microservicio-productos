const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productos.controller');

// Health check
router.get('/health', ProductosController.healthCheck);

// Rutas de productos
router.get('/', ProductosController.getAll);
router.get('/:id', ProductosController.getById);
router.post('/', ProductosController.create);
router.put('/:id', ProductosController.update);
router.delete('/:id', ProductosController.delete);

module.exports = router;