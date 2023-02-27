import { Router } from 'express'
import { createPost, updatePost, deletePost, getAllFriendsPosts } from '../../controllers/posts'

import guard from '../../middleware/guard'
import { validateCreate, validateID, validateQuery, validateUpdate } from './validation'

const router = Router()

router.post('/create', guard, validateCreate, createPost)
router.put('/update/:id', guard, validateID, validateUpdate, updatePost)
router.delete('/delete/:id', guard, validateID, deletePost)
router.get('/friends-posts', guard, validateQuery, getAllFriendsPosts)

export default router
