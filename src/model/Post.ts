import pkg, { Types } from 'mongoose'
const { Schema, model, SchemaTypes } = pkg

interface IPost {
	description: string
	author: Types.ObjectId
}

const postSchema = new Schema<IPost>(
	{
		description: { type: String, default: '', required: true },
		author: { type: SchemaTypes.ObjectId, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret._id

				return ret
			},
		},
		toObject: {},
	}
)

const Post = model('post', postSchema)

export default Post
