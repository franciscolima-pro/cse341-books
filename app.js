
import express from 'express';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Welcome to the CSE341 Books API!'
  });
});

export default app;
