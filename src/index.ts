import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import helmet from 'helmet'
import { HttpCode, LIMIT_JSON } from './lib/constants'

import authRouter from './routes/auth'
import usersRouter from './routes/users'
import postsRouter from './routes/posts'
import commentsRouter from './routes/comments'

const app = express()

app.use(helmet())
app.use(express.json({ limit: LIMIT_JSON }))
app.use(morgan('tiny'))
app.use(cors())

//routing

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/post', postsRouter)
app.use('/api/comment', commentsRouter)

//error handlers

app.use((req, res) => {
	res.status(HttpCode.NOT_FOUND).json({
		status: 'error',
		code: HttpCode.NOT_FOUND,
		message: 'Not found',
	})
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
	res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
		status: 'fail',
		code: HttpCode.INTERNAL_SERVER_ERROR,
		message: err.message,
	})
})

export default app
