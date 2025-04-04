import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dbConnection from './dbConfig/index.js';

import errorMiddleware from './middleware/errorMiddleware.js';
import router from './routes/index.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8800;

dbConnection();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(router);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
