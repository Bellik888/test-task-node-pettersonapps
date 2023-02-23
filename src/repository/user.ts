import { IUser } from './../types/user'
import { Types } from 'mongoose'
import User from '../model/User'

const findByEmail = async (email: string) => {
	return await User.findOne({ email })
}
const findById = async (id: string) => {
	return await User.findById(id).select('-password')
}

const updateToken = async (id: string, token: string) => {
	return await User.updateOne({ _id: id }, { token })
}

const isFriendAlreadyInField = async (userId: string, friendId: string, field: string) => {
	const user = await User.findOne({ _id: userId })
	if (user?.get(field)?.includes(friendId)) {
		return true
	}
}

const getFriends = async (user: IUser) => {
	return await User.find({ _id: { $in: user.friends } })
}

const sendFriendRequest = async (userId: string, friendId: string) => {
	try {
		await User.updateOne({ _id: userId }, { $addToSet: { outputFriendsRequests: friendId } }, { new: true })
		await User.updateOne({ _id: friendId }, { $addToSet: { incomingFriendsRequests: userId } }, { new: true })
		return true
	} catch (error: any) {
		return null
	}
}

const confirmFriendsRequest = async (userId: string, friendId: string) => {
	try {
		await User.updateOne(
			{ _id: userId },
			{ $pull: { incomingFriendsRequests: friendId }, $push: { friends: friendId } },
			{ new: true }
		)
		await User.updateOne(
			{ _id: friendId },
			{ $pull: { outputFriendsRequests: userId }, $push: { friends: userId } },
			{ new: true }
		)
		return true
	} catch (error: any) {
		throw new Error(error)
	}
}

const rejectFriendsRequest = async (userId: string, friendId: string) => {
	try {
		await User.updateOne({ _id: userId }, { $pull: { incomingFriendsRequests: friendId } }, { new: true })
		await User.updateOne({ _id: friendId }, { $pull: { outputFriendsRequests: userId } }, { new: true })
		return true
	} catch (error: any) {
		throw new Error(error)
	}
}

const deleteFriend = async (userId: string, friendId: string) => {
	try {
		await User.updateOne({ _id: userId }, { $pull: { friends: friendId } }, { new: true })
		await User.updateOne({ _id: friendId }, { $pull: { friends: userId } }, { new: true })
		return true
	} catch (error: any) {
		throw new Error(error)
	}
}

export default {
	findByEmail,
	updateToken,
	findById,
	getFriends,
	sendFriendRequest,
	confirmFriendsRequest,
	isFriendAlreadyInField,
	rejectFriendsRequest,
	deleteFriend,
}
