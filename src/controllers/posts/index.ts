import { NextFunction, Response } from 'express'
import { HttpCode } from '../../lib/constants'

import postsRepository from '../../repository/posts'
import { IGetUserAuthInfoRequest } from '../../types/expressTypes'

const createPost = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const post = req.body.post

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await postsRepository.createPost(user?.id, post)

	if (!result)
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})

	return res
		.status(HttpCode.OK)
		.json({ status: 'success', code: HttpCode.OK, data: { message: 'success', post: result } })
}

const updatePost = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await postsRepository.updatePost(id, req.body.post)

	if (!result) {
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})
	}

	return res
		.status(HttpCode.OK)
		.json({ status: 'success', code: HttpCode.OK, data: { message: 'success', post: result } })
}

const deletePost = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user
	const { id } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await postsRepository.deletePost(id)

	if (!result) {
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'DELETED' })
}

const getAllFriendsPosts = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const user = req.user

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const posts = await postsRepository.getAllFriendsPosts(user, req.query)

	if (!posts) {
		return res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'NOT FOUND' })
	}

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: posts })
}

export { createPost, updatePost, deletePost, getAllFriendsPosts }
