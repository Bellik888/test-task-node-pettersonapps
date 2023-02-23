import { Role } from '../lib/constants'
import { Types, Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser } from '../types/user'

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: [true, 'Set  user name'] },
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
		friends: { type: [String], default: [] },
		incomingFriendsRequests: { type: [String], default: [] },
		outputFriendsRequests: { type: [String], default: [] },
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

userSchema.method('isValidPassword', function isValidPassword(password: string) {
	return bcrypt.compare(password, this.password)
})

const User = model<IUser>('user', userSchema)

export default User
