import express, { type Application } from 'express';
import cors from 'cors';
import { errorHandler, notFoundErrorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.route.js';
import tasksRouter from './routes/tasks.route.js';

const app: Application = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.use(notFoundErrorHandler);
app.use(errorHandler);

export default app;