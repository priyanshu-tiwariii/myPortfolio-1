import express from 'express';
import app from './app.js';

import dotenv from 'dotenv';
import connectDB from './DataBase/index.js';
dotenv.config();

connectDB().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on:${process.env.PORT}`);
    }
    );
})
.catch((error)=>{
    console.log('Error in connecting to the database', error);
});



