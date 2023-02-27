import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

const createSchema = Joi.object({
	post: Joi.string().min(10).max(300).required(),
})

const updateSchema = Joi.object({
	post: Joi.string().min(10).max(300).required(),
}).or('post')

export const validateID = async (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' })

	next()
}

const querySchema = Joi.object({
	limit: Joi.number().min(5).max(100).optional(),
	skip: Joi.number().min(0).optional(),
})

export const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await createSchema.validateAsync(req.body)
	} catch (error: any) {
		return res.status(HttpCode.BAD_REQUEST).json({ message: `Field ${error.message.replace(/"/g, '')}` })
	}
	next()
}

export const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await updateSchema.validateAsync(req.body)
	} catch (err: any) {
		return res.status(400).json({ message: err.message })
	}
	next()
}

export const validateQuery = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await querySchema.validateAsync(req.query)
	} catch (err: any) {
		return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
	}
	next()
}
