import { HttpCode } from './../../lib/constants'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { Types } from 'mongoose'
// import { HttpCode } from '../../lib/constants'

export const validateID = async (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(HttpCode.BAD_REQUEST).json({ message: 'Invalid ObjectId' })

	next()
}
