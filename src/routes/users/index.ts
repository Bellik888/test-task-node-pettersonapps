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

import isUserExist from '../../middleware/isUserExist'
import {
	validateID,
	validateFindBy,
	validateQuery,
	isUserAlreadyAdded,
	isUserInFriends,
	isInIncoming,
} from './validation'

const router = Router()

router.get('/', guard, isUserExist, getUser)
router.get('/all-friends', guard, isUserExist, validateQuery, getFriends)
router.post('/send-request/:id', [guard, validateID, isUserExist, isUserAlreadyAdded], sendFriendsRequest)
router.post(
	'/confirm-request/:id',
	[guard, validateID, isUserExist, isUserInFriends, isInIncoming],
	confirmFriendsRequest
)
router.post('/reject-request/:id', [guard, validateID, isUserExist, isInIncoming], rejectFriendsRequest)
router.delete('/delete-friend/:id', [guard, validateID, isUserExist, isUserInFriends], deleteFriend)

router.get('/find-by', guard, validateFindBy, isUserExist, findUserBy)

export default router
