import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../../lib/constants'

import commentRepository from '../../repository/comments'

const createComment = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user
	const { comment, postId } = req.body

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await commentRepository.createComment(user?.id, postId, comment)

	if (!result)
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: result })
}

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user
	const { comment } = req.body
	const { id } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await commentRepository.updateComment(id, comment)

	if (!result)
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: result })
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user
	const { id } = req.params

	if (!user) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}

	const result = await commentRepository.deleteComment(id)

	if (!result)
		return res.status(HttpCode.NOT_FOUND).json({
			status: 'error',
			code: HttpCode.NOT_FOUND,
			message: 'Not found',
		})

	return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, message: 'DELETED' })
}

export { createComment, updateComment, deleteComment }
