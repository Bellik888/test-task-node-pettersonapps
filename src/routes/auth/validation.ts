import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { HttpCode } from '../../lib/constants'

const registerSchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().min(3).max(20).required(),
	nickname: Joi.string().min(3).max(20).optional(),
	password: Joi.string().alphanum().min(8).max(15).required(),
})

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})

export const validateRegistration = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await registerSchema.validateAsync(req.body)
	} catch (error: any) {
		return res.status(400).json({ message: `Field ${error.message.replace(/"/g, '')}` })
	}
	next()
}

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await loginSchema.validateAsync(req.body)
	} catch (error: any) {
		const { email, password } = req.body
		if (!email || !password)
			return res.status(HttpCode.UNAUTHORIZED).json({ message: `Field ${error.message.replace(/"/g, '')}` })
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}
	next()
}
