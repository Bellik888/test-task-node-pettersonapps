import { Types } from 'mongoose'

export type CreateBody = {
	author?: string
	description?: string
	authorId?: string
	postId?: string
	comment?: string
	email?: string
	name?: string
	nickname?: string
	password?: string
}

export type findOneQuery = {
	[index: string]: string
}
export type FindOptions = {
	[index: string]: string | string[] | FindOptions
}

export type FindManyQuery = {
	skip?: number
	limit?: number
}
