import { Router } from 'express'
import { createPost, updatePost, deletePost, getAllFriendsPosts } from '../../controllers/posts'

import guard from '../../middleware/guard'
import isUserExist from '../../middleware/isUserExist'
import { isAuthor, validateCreate, validateID, validateQuery, validateUpdate } from './validation'

const router = Router()

router.post('/create', guard, isUserExist, validateCreate, createPost)
router.put('/update/:id', guard, isUserExist, isAuthor, validateID, validateUpdate, updatePost)
router.delete('/delete/:id', guard, isUserExist, isAuthor, validateID, deletePost)
router.get('/friends-posts', guard, isUserExist, validateQuery, getAllFriendsPosts)

export default router
