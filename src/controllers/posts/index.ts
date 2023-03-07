import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../../lib/constants'
import errors from '../../lib/errors'

import postService from '../../service/post.service'

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { post } = req.body

	const result = await postService.createPost(user.id, post)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: { post: result } })
}

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params
	const { post } = req.body

	const result = await postService.updatePost(id, post)

	if (!result) {
		return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: { post: result } })
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const result = await postService.deletePost(id)

	if (!result) {
		return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'DELETED' })
}

const getAllFriendsPosts = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals

	const posts = await postService.getAllFriendsPosts(user, req.query)

	if (!posts) {
		return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })
	}

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: posts })
}

export { createPost, updatePost, deletePost, getAllFriendsPosts }
