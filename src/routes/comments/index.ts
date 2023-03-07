import { Router } from 'express'
import { createComment, updateComment, deleteComment } from '../../controllers/comments'

import guard from '../../middleware/guard'
import isUserExist from '../../middleware/isUserExist'
import { isAuthor, validateCreate, validateID, validateUpdate } from './validation'

const router = Router()

router.post('/create', [guard, isUserExist, validateCreate], createComment)
router.put('/update/:id', [guard, isUserExist, isAuthor, validateID, validateUpdate], updateComment)
router.delete('/delete/:id', [guard, isUserExist, isAuthor, validateID], deleteComment)

export default router
