import { Router } from 'express'
import passport from 'passport'
import { authPage, getSuccessPage, getErrorPage, redirectToSuccess } from '../../controllers/oauth'

const router = Router()

router.get('/', authPage)
router.get('/success', getSuccessPage)
router.get('/error', getErrorPage)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/oauth/error', session: false }),
	redirectToSuccess
)

export default router
