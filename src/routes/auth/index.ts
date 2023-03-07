import { Router } from 'express'
import { registration, login, logout } from '../../controllers/auth'
import guard from '../../middleware/guard'
import isUserExist from '../../middleware/isUserExist'
import limiter from '../../middleware/rate-limiter'
import { validateRegistration, validateLogin } from './validation'

const router = Router()

router.post('/registration', limiter(15 * 60 * 1000, 10), validateRegistration, registration)
router.post('/login', validateLogin, login)
router.post('/logout', guard, isUserExist, logout)

export default router
