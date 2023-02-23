import { Router } from 'express'
import {
	getUser,
	sendFriendsRequest,
	confirmFriendsRequest,
	rejectFriendsRequest,
	deleteFriend,
	getFriends,
} from '../../controllers/users/'

import guard from '../../middleware/guard'
import { validateID } from './validation'

const router = Router()

router.get('/', guard, getUser)
router.get('/getAllFriends', guard, getFriends)
router.post('/sendRequest/:id', guard, validateID, sendFriendsRequest)
router.post('/confirmRequest/:id', guard, validateID, confirmFriendsRequest)
router.post('/rejectRequest/:id', guard, validateID, rejectFriendsRequest)
router.delete('/deleteFriend/:id', guard, validateID, deleteFriend)

export default router
