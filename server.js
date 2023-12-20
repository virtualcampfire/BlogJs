import express from 'express';
import homeRoutes from './routes/homeRouter.js';
import adminRouter from './routes/adminRouter.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import DatabaseController from './database/DatabaseController.js';

const dbc = new DatabaseController();
dbc.migrate();

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/', homeRoutes);

app.use('/', adminRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});