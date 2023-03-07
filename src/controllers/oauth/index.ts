import { IUser } from './../../types/user'
import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import { HttpCode } from '../../lib/constants'
import authService from '../../service/auth.service'

import Repo from '../../repository'
import User from '../../model/User'

interface Profile {
	email: string
	name: string
}

let userProfile: any
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'secret'
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'secret'
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'secretUrl'

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${GOOGLE_CALLBACK_URL}/oauth/google/callback`,
		},
		async function (accessToken, refreshToken, profile, done) {
			const { email, name } = profile._json as Profile
			try {
				const isUserExist = await authService.isUserExist(email)
				if (!isUserExist) {
					await authService.createUser({
						email,
						name,
						nickname: name,
					})
				}

				const user = await Repo.findOne(User, { email })
				if (!user) return
				const token = await authService.getToken(user)
				await authService.setToken(user.id, token)
				userProfile = { ...profile, token }
				return done(null, userProfile)
			} catch (error) {
				return done(error, null)
			}
		}
	)
)
passport.serializeUser(function (user, cb) {
	cb(null, user)
})

passport.deserializeUser(function (obj: any, cb) {
	cb(null, obj)
})

const authPage = (req: Request, res: Response, next: NextFunction) => {
	res.render('pages/auth')
}

const getSuccessPage = (req: Request, res: Response, next: NextFunction) => {
	res.render('pages/success', { user: userProfile })
}

const getErrorPage = (req: Request, res: Response, next: NextFunction) => {
	res
		.status(HttpCode.UNAUTHORIZED)
		.json({ status: 'error', code: HttpCode.UNAUTHORIZED, message: 'Invalid credentials' })
}

const redirectToSuccess = (req: Request, res: Response, next: NextFunction) => {
	res.redirect('/oauth/success')
}

export { authPage, getSuccessPage, getErrorPage, redirectToSuccess }
