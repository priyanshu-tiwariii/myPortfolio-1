import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Import routes
import authRoute from './Routes/auth.routes.js';
import introRoute from './Routes/intro.routes.js';
import educationRoute from './Routes/education.routes.js'
import projectRoute from './Routes/project.routes.js';
import certificateRoute from './Routes/certificate.routes.js';
import experienceRoute from './Routes/experience.routes.js';
import messageRoute from './Routes/message.routes.js';
const app = express();

// Use routes
app.use('/api/auth',authRoute);
app.use('/api/intro',introRoute);
app.use("/api/edu",educationRoute);
app.use("/api/project",projectRoute);
app.use("/api/certificate",certificateRoute);
app.use("/api/experience",experienceRoute);
app.use("/api/message",messageRoute);

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist'))); // Adjust the path if necessary

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

export default app;
