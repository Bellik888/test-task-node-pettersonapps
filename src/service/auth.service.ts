import jwt from 'jsonwebtoken'

import User from '../model/User'
import { IUser } from '../types/user'
import Repo from '../repository'

const SECRET_KEY = process.env.JWT_SECRET_KEY || '123'

type CreateBody = {
	name: string
	email: string
	nickname?: string
	password?: string
}

const isUserExist = async (email: string) => {
	const user = await Repo.findOne(User, { email })
	return !!user
}

const createUser = async (body: CreateBody) => {
	const { id, name, email, friends } = await Repo.create(User, body)

	return {
		id,
		name,
		email,
		friends,
	}
}

const getUser = async (email: string, password: string) => {
	const user = await Repo.findOne(User, { email })

	const isValidPassword = await user?.isValidPassword(password)

	if (!isValidPassword) return null

	return user
}

const getToken = async (user: IUser) => {
	const { id, email } = user
	const payload = { id, email }
	const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

	return token
}

const setToken = async (id: string, token: string) => {
	await Repo.updateOne(User, id, { token })
}

const removeToken = async (id: string) => {
	await Repo.updateOne(User, id, { token: null })
}

export default { createUser, isUserExist, getUser, getToken, setToken, removeToken }
