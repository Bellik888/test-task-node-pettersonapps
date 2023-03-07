import Comment from '../model/Comment'
import Repo from '../repository'

const createComment = async (userId: string, postId: string, comment: string) => {
	return await Repo.create(Comment, { authorId: userId, postId, comment })
}

const updateComment = async (id: string, comment: string) => {
	return await Repo.updateOne(Comment, id, { comment })
}

const deleteComment = async (id: string) => {
	return await Repo.deleteOne(Comment, id)
}

export default { createComment, updateComment, deleteComment }
