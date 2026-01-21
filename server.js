const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Helmet para seguridad HTTP
app.use(helmet());

// CORS habilitado para cualquier origen
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: false
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de 100 solicitudes por IP
});
app.use(limiter);

// Rutas
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/productos', require('./routes/productos.routes'));

// Ruta principal con documentación
app.get('/', (req, res) => {
    res.json({
        message: 'API de Categorías y Productos funcionando',
        version: '1.0.0',
        endpoints: {
            categorias: 'GET/POST/PUT/DELETE /api/categorias',
            productos: 'GET/POST/PUT/DELETE /api/productos',
            health: 'GET /api/health'
        }
    });
});

// Ruta de health check (opcional pero recomendada)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal!' });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});