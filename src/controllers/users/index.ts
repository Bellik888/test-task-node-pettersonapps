import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../../lib/constants'
import errors from '../../lib/errors'

import userService from '../../service/user.service'

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	const { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname } = res.locals.user
	const user = { name, friends, incomingFriendsRequests, outputFriendsRequests, id, nickname }

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: { user: user } })
}

const findUserBy = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals

	const result = await userService.findBy(user, req.body)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: result })
}

const getFriends = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals

	const result = await userService.getFriends(user, req.query)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: result })
}

const sendFriendsRequest = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { id: friendId } = req.params

	const result = await userService.sendFriendRequest(user.id, friendId)

	if (!result) {
		return res.status(HttpCode.BAD_REQUEST).json({ code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'success' })
}

const confirmFriendsRequest = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { id: friendId } = req.params

	const response = await userService.confirmFriendsRequest(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.BAD_REQUEST).json({ code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'success' })
}

const rejectFriendsRequest = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user
	const { id: friendId } = req.params

	const response = await userService.rejectFriendsRequest(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.BAD_REQUEST).json({ code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'success' })
}

const deleteFriend = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user
	const { id: friendId } = req.params

	const response = await userService.deleteFriend(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'success' })
}

export {
	getUser,
	getFriends,
	confirmFriendsRequest,
	sendFriendsRequest,
	rejectFriendsRequest,
	deleteFriend,
	findUserBy,
}
