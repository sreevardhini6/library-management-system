import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { mainRouter } from './routes';
dotenv.config()

const app = express()
const PORT = process.env.PORT;
const dbUrl = process.env.MONGO_URL as string;

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's origin
  credentials: true // Enable the server to accept cookies from the frontend
}));



app.use('/api/v1',mainRouter)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connect(dbUrl)
.then(() => console.log(`Database connected ${dbUrl}`))
.catch((err) => console.log(err))

app.listen(PORT , () => console.log(`serve started at ${PORT}`));
