import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { inProduction } from './config/env.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDB } from './config/db.js';
import userRouter from './routes/user.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config({
  path: path.join(process.cwd(), '.env.local'),
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/user', userRouter);

if (inProduction) {
  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((e) => {
    console.log(
      'An orror has occured while connecting to mongodb : ',
      e.message
    );
  });
