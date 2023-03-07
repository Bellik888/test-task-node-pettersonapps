import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../../lib/constants'
import errors from '../../lib/errors'

import commentService from '../../service/comment.service'

const createComment = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = res.locals
	const { comment, postId } = req.body

	const result = await commentService.createComment(user.id, postId, comment)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: result })
}

const updateComment = async (req: Request, res: Response, next: NextFunction) => {
	const { comment } = req.body
	const { id } = req.params

	const result = await commentService.updateComment(id, comment)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, data: result })
}

const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params

	const result = await commentService.deleteComment(id)

	if (!result) return res.status(HttpCode.NOT_FOUND).json({ code: HttpCode.NOT_FOUND, message: errors.NOT_FOUND })

	return res.status(HttpCode.OK).json({ code: HttpCode.OK, message: 'DELETED' })
}

export { createComment, updateComment, deleteComment }
