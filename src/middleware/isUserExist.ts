import { NextFunction, Response, Request } from 'express'
import { HttpCode } from '../lib/constants'

const isUserExist = async (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user

	if (!user) {
		res.status(HttpCode.UNAUTHORIZED).json({ code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
	}
	next()
}

export default isUserExist
