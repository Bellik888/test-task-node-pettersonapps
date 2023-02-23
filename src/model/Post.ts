import { Role } from '../lib/constants'
import pkg, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema, model, SchemaTypes } = pkg

interface IPost {
	description: string
	author: Types.ObjectId
}

const postSchema = new Schema<IPost>(
	{
		description: { type: String, default: '' },
		author: { type: SchemaTypes.ObjectId, required: true },
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
