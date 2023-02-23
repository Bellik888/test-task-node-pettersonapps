import { rateLimit } from 'express-rate-limit'
import { HttpCode } from '../lib/constants'

const limiter = (duration: number, limit: number) => {
	return rateLimit({
		windowMs: duration,
		max: limit,
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		handler: (req, res, next) => {
			return res.status(HttpCode.TOO_MANY_REQUESTS).json({
				status: 'error',
				code: HttpCode.TOO_MANY_REQUESTS,
				message: 'Too many requests, please try again later.',
			})
		},
	})
}

export default limiter
