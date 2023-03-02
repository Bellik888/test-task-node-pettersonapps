import { Router } from 'express'
import {
	getUser,
	sendFriendsRequest,
	confirmFriendsRequest,
	rejectFriendsRequest,
	deleteFriend,
	getFriends,
	findUserBy,
} from '../../controllers/users/'

import guard from '../../middleware/guard'
import { validateID, validateFindBy } from './validation'

const router = Router()

router.get('/', guard, getUser)
// router.get('/all-friends', guard, getFriends)
// router.post('/send-request/:id', guard, validateID, sendFriendsRequest)
// router.post('/confirm-request/:id', guard, validateID, confirmFriendsRequest)
// router.post('/reject-request/:id', guard, validateID, rejectFriendsRequest)
// router.delete('/delete-friend/:id', guard, validateID, deleteFriend)

// router.get('/find-by', guard, validateFindBy, findUserBy)

export default router
