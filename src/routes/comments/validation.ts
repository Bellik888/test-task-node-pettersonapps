import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'

const createSchema = Joi.object({
	comment: Joi.string().min(10).max(150).required(),
	postId: Types.ObjectId,
	authorId: Types.ObjectId,
})

const updateSchema = Joi.object({
	comment: Joi.string().min(10).max(150).required(),
}).or('comment')

export const validateID = async (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' })

	next()
}

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
	} catch (error: any) {
		return res.status(400).json({ message: `Field ${error.message.replace(/"/g, '')}` })
	}
	next()
}
