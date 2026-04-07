import 'dotenv/config';
import express, { type Express} from 'express';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

export default app;