import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import authRoute from './Routes/auth.routes.js';
import introRoute from './Routes/intro.routes.js';
const app = express();

app.use(express.json());
// The express.json() middleware parses incoming requests with JSON payloads.
//parses means it takes a string and converts it into a JavaScript object.

// The express.urlencoded() middleware parses incoming requests with URL-encoded payloads.
//url encoded payload means that the data will be sent in the URL itself.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use('/api/auth',authRoute);
app.use('/api/intro',introRoute);
app.use((err,req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;