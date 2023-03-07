import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import Joi from 'joi'

const querySchema = Joi.object({
	limit: Joi.number().min(0).max(1000).optional(),
	skip: Joi.number().min(0).optional(),
})

export const validateID = async (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' })

	next()
}

export const validateFindBy = async (req: Request, res: Response, next: NextFunction) => {
	const { name, nickname } = req.body || {}
	if (name && nickname) {
		return res.status(HttpCode.BAD_REQUEST).json({ code: HttpCode.BAD_REQUEST, message: 'Only name or nickname' })
	}
	if (!name && !nickname) {
		return res
			.status(HttpCode.BAD_REQUEST)
			.json({ code: HttpCode.BAD_REQUEST, message: 'Name or nickname is required' })
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

export const isUserAlreadyAdded = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { id: friendId } = req.params
	if (
		user.friends.includes(friendId) ||
		user.incomingFriendsRequests.includes(friendId) ||
		user.outputFriendsRequests.includes(friendId)
	) {
		return res.status(HttpCode.CONFLICT).json({ code: HttpCode.CONFLICT, message: 'Friend already added' })
	}
	if (user.id === friendId)
		return res
			.status(HttpCode.BAD_REQUEST)
			.json({ code: HttpCode.BAD_REQUEST, message: "Can't sent request to yourself" })
	next()
}

export const isUserInFriends = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { id: friendId } = req.params
	if (user.friends.includes(friendId)) {
		return res.status(HttpCode.CONFLICT).json({ code: HttpCode.CONFLICT, message: 'Friend already added' })
	}
	next()
}

export const isInIncoming = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { id: friendId } = req.params
	if (user.incomingFriendsRequests.includes(friendId)) {
		return res.status(HttpCode.CONFLICT).json({ code: HttpCode.CONFLICT, message: 'Friend already added' })
	}
	next()
}
