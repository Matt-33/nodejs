import express from 'express';
import 'dotenv/config';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import mongoose from 'mongoose';
import protect from './middlewares/authMiddleware.js';
import authRouter from './routes/authRouter.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL || '*', 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter);

const firstMiddleware = (request, response, next) => {
  console.log('Welcome to my API');
  next();
};

const secondMiddleware = (request, response, next) => {
  response.send('Hello world');
};

app.get('/', firstMiddleware, secondMiddleware);

app.get('/protected', protect, (req, res) => {
  res.status(200).json({ message: 'Accès autorisé', user: req.user });
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to the database 🟢');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
