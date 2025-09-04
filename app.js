import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies`

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to PawCare API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});