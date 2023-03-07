import Post from '../model/Post'
import Repo from '../repository'
import { FindManyQuery } from '../types/repository'
import { IUser } from '../types/user'

const createPost = async (userId: string, post: string) => {
	return await Repo.create(Post, { author: userId, description: post })
}

const updatePost = async (postId: string, post: string) => {
	return await Repo.updateOne(Post, postId, { description: post })
}

const deletePost = async (postId: string) => {
	return await Repo.deleteOne(Post, postId)
}

const getAllFriendsPosts = async (user: IUser, query: FindManyQuery) => {
	const result = await Repo.findMany(Post, { author: { $in: user.friends } }, query)
	const total = await Repo.findManyCount(Post, { author: { $in: user.friends } })

	return { total, result }
}

export default { createPost, updatePost, deletePost, getAllFriendsPosts }
