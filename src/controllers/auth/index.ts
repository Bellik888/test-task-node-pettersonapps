import { NextFunction, Request, Response } from 'express'
import authService from '../../service/auth.service'
import { HttpCode } from '../../lib/constants'

const registration = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body
		const isUserExist = await authService.isUserExist(email)

		if (isUserExist) {
			return res
				.status(HttpCode.CONFLICT)
				.json({ status: 'error', code: HttpCode.CONFLICT, message: 'Email os already exist' })
		}
		const data = await authService.createUser(req.body)

		res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.CREATED, data })
	} catch (error) {
		next(error)
	}
}

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body
		const user = await authService.getUser(email, password)

		if (!user) {
			return res
				.status(HttpCode.UNAUTHORIZED)
				.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
		}

		const token = await authService.getToken(user)
		if (token) await authService.setToken(user.id, token)

		res.status(HttpCode.OK).json({
			status: 'success',
			code: HttpCode.OK,
			data: {
				token,
			},
		})
	} catch (error) {
		next(error)
	}
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body
		const user = await authService.getUser(email, password)

		if (!user) {
			return res
				.status(HttpCode.UNAUTHORIZED)
				.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
		}
		await authService.removeToken(user.id)

		res.status(HttpCode.OK).json({
			status: 'success',
			code: HttpCode.OK,
			message: 'SUCCESS',
		})
	} catch (error) {
		next(error)
	}
}

export { registration, login, logout }
