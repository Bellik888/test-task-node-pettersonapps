import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'
import Comment from '../../model/Comment'
import Repo from '../../repository'

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

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params
	const { user } = res.locals
	const comment = await Repo.findById(Comment, id)

	if (!user._id.equals(comment.authorId)) return res.status(404).json({ message: 'you are not author' })

	next()
}
