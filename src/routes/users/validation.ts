import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Joi from 'joi'

const findBySchema = Joi.object({
	name: Joi.string().min(3).max(25).optional(),
	nickname: Joi.string().min(3).max(25).optional(),
})

export const validateID = async (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' })

	next()
}

export const validateFindBy = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await findBySchema.validateAsync(req.body)
	} catch (err: any) {
		return res.status(400).json({ message: `Field ${err.message.replace(/"/g, '')}` })
	}
	next()
}
