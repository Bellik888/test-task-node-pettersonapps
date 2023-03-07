import { Types, Document } from 'mongoose'

export interface IUser extends Document {
	name: string
	nickname: string
	email: string
	password: string
	token?: string | null
	friends: string[]
	incomingFriendsRequests: string[]
	outputFriendsRequests: string[]
	isValidPassword(arg: string): Promise<boolean>
	countDocuments(): Promise<number>
}
