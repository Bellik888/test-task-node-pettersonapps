import { Types, Document } from 'mongoose'

export interface IUser extends Document {
	name: string
	email: string
	password: string
	token?: string | null
	friends: Types.ObjectId[]
	incomingFriendsRequests: Types.ObjectId[]
	outputFriendsRequests: Types.ObjectId[]
	isValidPassword(arg: string): Promise<boolean>
}
