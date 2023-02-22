import { Role } from '../lib/constants'
import pkg, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from './User'
const { Schema, model, SchemaTypes } = pkg

interface IPost {
	description: string
	owner: IUser
}

const postSchema = new Schema<IPost>(
	{
		description: { type: String, default: '' },
		owner: {
			type: SchemaTypes.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{
		versionKey: false,
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret._id
				delete ret.owner

				return ret
			},
		},
		toObject: {},
	}
)

const Post = model('post', postSchema)

export default Post
