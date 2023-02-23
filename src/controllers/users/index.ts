import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../../lib/constants'
import { IGetUserAuthInfoRequest } from '../../types/expressTypes'
import userRepository from '../../repository/user'

const getUser = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const { name, friends, incomingFriendsRequests, outputFriendsRequests, id } = req.user || {}
	const user = { name, friends, incomingFriendsRequests, outputFriendsRequests, id }

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { user: user } })
}

const getFriends = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const friends = await userRepository.getFriends(user)

	if (!friends) {
		return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'NOT FOUND' })
	}

	const response = friends.map(friend => {
		const { id, name, friends } = friend
		return { id, name, friends }
	})

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { friends: response } })
}

const sendFriendsRequest = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id: friendId } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}
	const isInField = await userRepository.isFriendAlreadyInField(user.id, friendId, 'friends')
	const isInIncomingRequests = await userRepository.isFriendAlreadyInField(user.id, friendId, 'incomingFriendsRequests')
	const isIOutputRequests = await userRepository.isFriendAlreadyInField(user.id, friendId, 'outputFriendsRequests')

	if (isInField || isInIncomingRequests || isIOutputRequests) {
		return res
			.status(HttpCode.BAD_REQUEST)
			.json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Friend already added' })
	}

	const updatedUser = await userRepository.sendFriendRequest(user.id, friendId)

	if (!updatedUser) {
		return res.status(HttpCode.BAD_REQUEST).json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'success' })
}

const confirmFriendsRequest = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id: friendId } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}
	const isInFriends = await userRepository.isFriendAlreadyInField(user.id, friendId, 'friends')

	if (isInFriends) {
		return res
			.status(HttpCode.BAD_REQUEST)
			.json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Friend already added' })
	}

	const response = await userRepository.confirmFriendsRequest(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.BAD_REQUEST).json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'success' })
}

const rejectFriendsRequest = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id: friendId } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const isInIncomingRequests = await userRepository.isFriendAlreadyInField(user.id, friendId, 'incomingFriendsRequests')

	if (!isInIncomingRequests) {
		return res
			.status(HttpCode.BAD_REQUEST)
			.json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'There are no requests' })
	}

	const response = await userRepository.rejectFriendsRequest(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.BAD_REQUEST).json({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Fail' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'success' })
}
const deleteFriend = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id: friendId } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const isInFriends = await userRepository.isFriendAlreadyInField(user.id, friendId, 'friends')

	if (!isInFriends) {
		return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'NOT FOUND' })
	}

	const response = await userRepository.deleteFriend(user.id, friendId)

	if (!response) {
		return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'NOT FOUND' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'success' })
}

export { getUser, getFriends, confirmFriendsRequest, sendFriendsRequest, rejectFriendsRequest, deleteFriend }
