import express from 'express';
import LinksRouter from './routes/links';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(LinksRouter);

export default app;