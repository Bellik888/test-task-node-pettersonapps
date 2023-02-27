import Comment from '../model/Comment'

const createComment = async (userId: string, postId: string, comment: string) => {
	return await Comment.create({ authorId: userId, postId, comment })
}

const updateComment = async (id: string, comment: string) => {
	return await Comment.findOneAndUpdate({ _id: id }, { comment }, { new: true })
}

const deleteComment = async (id: string) => {
	return await Comment.findOneAndDelete({ _id: id })
}

export default { createComment, updateComment, deleteComment }
