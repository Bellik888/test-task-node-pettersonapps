import jwt from 'jsonwebtoken'

import User from '../model/User'
import repositoryUsers from '../repository/user'
import { IUser } from '../types/user'

const SECRET_KEY = process.env.JWT_SECRET_KEY || '123'

const isUserExist = async (email: string) => {
	const user = await repositoryUsers.findByEmail(email)
	return !!user
}

const createUser = async (body: IUser) => {
	const { id, name, email, friends } = await User.create(body)

	return {
		id,
		name,
		email,
		friends,
	}
}

const getUser = async (email: string, password: string) => {
	const user = await repositoryUsers.findByEmail(email)

	const isValidPassword = await user?.isValidPassword(password)

	if (!isValidPassword) return null

	return user
}

const getToken = async (user: IUser) => {
	const { id, email } = user
	const payload = { id, email }
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' })

	return token
}

const setToken = async (id: string, token: string) => {
	await repositoryUsers.updateToken(id, token)
}

export default { createUser, isUserExist, getUser, getToken, setToken }
