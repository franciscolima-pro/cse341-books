
import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(router)

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the CSE341 Books API!'
  });
});

export default app;
