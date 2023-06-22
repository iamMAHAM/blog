import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { inProduction } from './config/env.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../dist')));

if (inProduction) {
  app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
