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

// Use filter param E.g:
// isUserExist(filter: User): Promise<User>...
// isUserExist({ email: 'some.email@com', id })
// the same for getUser
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

// This function checks if user password is valid
// I'd recommend change name to authUser(or smth like) OR create separate functions
// for get user and auth user
// P.S getUser should use filter as param getUser(filter: User)
// authUser can use email/password
const getUser = async (email: string, password: string) => {
	const user = await Repo.findOne(User, { email })

	const isValidPassword = await user?.isValidPassword(password)

	if (!isValidPassword) return null

	return user
}

const getToken = async (user: IUser) => {
	return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
}

// I'd recommend return Repo.updateOne(...) OR
// create variable res = Repo.updateOn(...) and return res.acknowledged
const setToken = async (id: string, token: string) => {
	await Repo.updateOne(User, id, { token })
}

const removeToken = async (id: string) => {
	await Repo.updateOne(User, id, { token: null })
}

export default { createUser, isUserExist, getUser, getToken, setToken, removeToken }
