import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config();

import connectDB from './db/connectDB.db.js';
import urlRoutes from './routes/urlRoutes.routes.js'
import redirectRoute from './routes/redirectRoute.routes.js'

const PORT = process.env.PORT
const app = express();

// MiddleWares
app.use(cors({
    origin: 'https://url-shortner-react.onrender.com', 
    credentials: true 
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))


//Routes
app.use('/api', urlRoutes);
app.use('/', redirectRoute);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on PORT: ${PORT}`);
    });
});
