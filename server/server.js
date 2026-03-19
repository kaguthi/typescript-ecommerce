import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import useRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import orderRoute from './routes/orderRoute.js';
import countRoute from './routes/countRoute.js';
import mpesaRoute from './routes/mpesaRoute.js';
import fs from 'fs';
import { createStream } from 'rotating-file-stream';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerSpec from './utils/swagger.js';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
}); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

morgan.token('rt', (req, res) => res.getHeader('X-Response-Time') ?? '-');

const devFormat = (tokens, req, res) => {
  return [
    chalk.blue(tokens.method(req, res)),
    chalk.yellow(tokens.url(req, res)),
    chalk.green(tokens.status(req, res)),
    chalk.magenta(tokens.res(req, res, 'content-length') || '0') + ' bytes',
    '-',
    chalk.cyan(tokens['response-time'](req, res) + ' ms'),
  ].join(' ');
};

const format =
process.env.NODE_ENV === 'production'
? 'combined'
: devFormat;

app.use(morgan(format));  

if (process.env.NODE_ENV === 'production') {
  const logDirectory = path.join(__dirname, 'logs');
  
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
  
  const accessLogStream = createStream('access.log', {
    interval: '1d', 
    path: logDirectory
  });
  
  app.use(morgan(format, { stream: accessLogStream }));
}
app.use(helmet());
app.set('trust proxy', 1);
app.use(limiter);

app.use(cors({ 
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
  credentials: true 
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('✅ Connected to the database'))
  .catch(err => console.error('❌ DB connection error:', err.message));

app.use('/', useRoute);
app.use('/products', productRoute);
app.use('/category', categoryRoute);
app.use('/order', orderRoute);
app.use('/count', countRoute);
app.use('/payment', mpesaRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
