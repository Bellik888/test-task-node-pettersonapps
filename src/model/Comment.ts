import { Types, Schema, model, SchemaTypes } from 'mongoose'

interface IComment {
	comment: string
	postId: Types.ObjectId
	authorId: Types.ObjectId
}

const commentSchema = new Schema<IComment>(
	{
		comment: { type: String, default: '', required: true },
		postId: { type: SchemaTypes.ObjectId, required: true },
		authorId: { type: SchemaTypes.ObjectId, required: true },
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

const Comment = model('comment', commentSchema)

export default Comment
