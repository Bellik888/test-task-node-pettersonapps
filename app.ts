import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// import contactsRouter from './routes/contacts/index.js';
// import authRouter from './routes/auth/index.js';
// import usersRouter from './routes/users/index.js';
// import petRouter from './routes/pets/index.js';
// import { HttpCode, LIMIT_JSON } from './lib/constants.js';
import helmet from 'helmet';
import { HttpCode, LIMIT_JSON } from './lib/constants';

const app: Express = express();

app.use(helmet());
// app.use(express.static(process.env.FOLDER_FOR_AVATARS)) //if we want to  save files locally
app.use(express.json({ limit: LIMIT_JSON })); //parse JSON with limit 5kb
// app.use(express.urlencoded({ extended: true })) //parse formData
app.use(morgan('tiny')); //logger
app.use(cors());

//multi language

app.use((req, res, next) => {
  app.set('lang', req.acceptsLanguages(['en', 'uk']));
  next();
});

//routing

// app.use('/api/contacts', contactsRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/pet', petRouter);

//error handlers

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: 'Not found',
  });
});

app.use((err: Error, _req: Request, res: Response, _next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: 'fail',
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

export default app;
