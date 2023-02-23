import { Request } from 'express'
import { IUser } from './user'

export interface IGetUserAuthInfoRequest extends Request {
	user?: IUser
}
