import { FindManyQuery } from './../types/repository'
import { IUser } from './../types/user'
import Repo from '../repository'
import User from '../model/User'

type FindByBody = {
	name?: string
	nickname?: string
}

const findById = async (id: string) => {
	return Repo.findById(User, id)
}

const findBy = async (user: IUser, body: FindByBody) => {
	const result = await Repo.findMany(User, { _id: { $ne: user.id }, ...body })
	const total = await Repo.findManyCount(User, { _id: { $ne: user.id }, ...body })

	if (!result) return null

	// please, read about project && select methods
	const users = result.map((friend: IUser) => {
		const { id, name, friends, nickname } = friend
		return { id, name, friends, nickname }
	})
	return { total, users }
}

const getFriends = async (user: IUser, query: FindManyQuery) => {
	const result = await Repo.findMany(User, { _id: { $in: user.friends } }, query)
	const total = await Repo.findManyCount(User, { _id: { $in: user.friends } })

	// result is an array, so you should change check to !result.length
	// But I don't think it is necessary, it is okay to get an empty array if user don't have friends
	if (!result) return null

	// please, read about project && select methods
	const friends = result.map((friend: IUser) => {
		const { id, name, friends } = friend
		return { id, name, friends }
	})

	return { total, friends }
}

const sendFriendRequest = async (userId: string, friendId: string) => {
	try {
		await Repo.updateOne(User, userId, { $addToSet: { outputFriendsRequests: friendId } })
		await Repo.updateOne(User, friendId, { $addToSet: { incomingFriendsRequests: userId } })
		// add a blanc line before return:
		// https://medium.com/swlh/javascript-best-practices-spaces-2abe910f1a60
		return true
	} catch (error: any) {
		return null
	}
}

const confirmFriendsRequest = async (userId: string, friendId: string) => {
	try {
		await Repo.updateOne(User, userId, { $pull: { incomingFriendsRequests: friendId }, $push: { friends: friendId } })
		await Repo.updateOne(User, friendId, { $pull: { outputFriendsRequests: userId }, $push: { friends: userId } })
		return true
	} catch (error: any) {
		return null
	}
}

const rejectFriendsRequest = async (userId: string, friendId: string) => {
	try {
		await Repo.updateOne(User, userId, { $pull: { incomingFriendsRequests: friendId } })
		await Repo.updateOne(User, friendId, { $pull: { outputFriendsRequests: userId } })
		return true
	} catch (error: any) {
		return null
	}
}

const deleteFriend = async (userId: string, friendId: string) => {
	try {
		await Repo.updateOne(User, userId, { $pull: { friends: friendId } })
		await Repo.updateOne(User, friendId, { $pull: { friends: userId } })
		return true
	} catch (error: any) {
		return null
	}
}

export default {
	findBy,
	getFriends,
	sendFriendRequest,
	confirmFriendsRequest,
	rejectFriendsRequest,
	deleteFriend,
	findById,
}
