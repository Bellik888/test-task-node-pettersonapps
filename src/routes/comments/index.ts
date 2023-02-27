import { Router } from 'express'
import { createComment, updateComment, deleteComment } from '../../controllers/comments'

import guard from '../../middleware/guard'
import { validateCreate, validateID, validateUpdate } from './validation'

const router = Router()

router.post('/create', guard, validateCreate, createComment)
router.put('/update/:id', guard, validateID, validateUpdate, updateComment)
router.delete('/delete/:id', guard, validateID, deleteComment)

export default router
