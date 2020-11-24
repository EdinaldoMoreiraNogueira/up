import express from 'express';
import LinksRouter from './routes/links';

const app = express();

app.use(express.json());
app.use(LinksRouter);

export default app;