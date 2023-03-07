import { CreateBody, FindManyQuery, findOneQuery, FindOptions } from '../types/repository'

const create = async (Model: any, body: CreateBody) => {
	return await Model.create(body)
}

const updateOne = async (Model: any, id: string, body: object) => {
	return await Model.findOneAndUpdate({ _id: id }, body, { new: true })
}

const deleteOne = async (Model: any, id: string) => {
	return await Model.findOneAndDelete({ _id: id })
}

const findOne = async (Model: any, query: findOneQuery) => {
	return await Model.findOne(query)
}

const findById = async (Model: any, id: string) => {
	return await Model.findById(id).select('-password')
}

const findMany = async (Model: any, options: FindOptions, query?: FindManyQuery) => {
	const { skip = 0, limit = 0 } = query || {}
	return await Model.find(options).skip(Number(skip)).limit(Number(limit))
}

const findManyCount = async (Model: any, options: FindOptions) => {
	return await Model.find(options).countDocuments()
}

export default { create, updateOne, deleteOne, findOne, findMany, findManyCount, findById }
