import { IUser } from './../types/user'
import { IGetUserAuthInfoRequest } from './../types/expressTypes'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpCode } from '../lib/constants'

import repositoryUsers from '../repository/user'

const SECRET_KEY = process.env.JWT_SECRET_KEY || '123'

interface JwtPayload {
	id: string
}

const verifyToken = (token: string) => {
	try {
		if (!token) return false
		const verify = jwt.verify(token, SECRET_KEY)

		return !!verify
	} catch (error) {
		return false
	}
}

const guard = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
	const token = req.get('authorization')?.split(' ')[1]

	if (!token) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Not authorized / Token not found' })
	}

	const isValidToken = verifyToken(token)

	if (!isValidToken) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Not authorized' })
	}

	const payload = jwt.decode(token) as JwtPayload

	const user: IUser | null = await repositoryUsers.findById(payload.id)

	if (!user || user.token !== token) {
		return res
			.status(HttpCode.UNAUTHORIZED)
			.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Not authorized' })
	}

	req.user = user

	next()
}

export default guard
