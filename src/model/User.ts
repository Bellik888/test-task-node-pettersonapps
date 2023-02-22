import { Role } from '../lib/constants'
import pkg, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
const { Schema, model } = pkg

export interface IUser {
	name: string
	email: string
	password: string
	token: string | null
	friends: Types.ObjectId[]
	incomingFriendsRequests: Types.ObjectId[]
	outputFriendsRequests: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, default: 'Guest' },
		email: {
			type: String,
			require: [true, 'Set email for user'],
			unique: true,
			validate(value: String) {
				const re = /\S+@\S+\.\S+/

				return re.test(String(value).trim().toLocaleLowerCase())
			},
		},
		password: { type: String, require: [true, 'Set password for user'] },
		token: { type: String, default: null },
		friends: { type: [Types.ObjectId], default: [] },
		incomingFriendsRequests: { type: [Types.ObjectId], default: [] },
		outputFriendsRequests: { type: [Types.ObjectId], default: [] },
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

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		const salt = await bcrypt.genSalt(6)
		this.password = await bcrypt.hash(this.password, salt)
	}
	next()
})

//  custom method

userSchema.methods.isValidPassword = async function (password: string) {
	return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

export default User
