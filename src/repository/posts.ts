import { FRIENDS_POSTS_LIMIT, FRIENDS_POSTS_SKIP } from '../lib/constants'
import Post from '../model/Post'
import { IUser } from '../types/user'

const createPost = async (userId: string, text: string) => {
	return await Post.create({ author: userId, description: text })
}

const updatePost = async (id: string, text: string) => {
	return await Post.findOneAndUpdate({ _id: id }, { description: text }, { new: true })
}

const deletePost = async (id: string) => {
	return await Post.findOneAndDelete({ _id: id })
}

const getAllFriendsPosts = async (user: IUser, { limit = FRIENDS_POSTS_LIMIT, skip = FRIENDS_POSTS_SKIP }) => {
	let result = await Post.find({ author: { $in: user.friends } })
		.skip(Number(skip))
		.limit(Number(limit))

	const total = await Post.find({ author: { $in: user.friends } }).countDocuments()

	return { total, posts: result }
}

export default { createPost, updatePost, deletePost, getAllFriendsPosts }
