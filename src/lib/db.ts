import pkg from 'mongoose'
const { connect, connection, set } = pkg

set('strictQuery', false)

const uri = process.env.URI_DB || ''

const db = connect(uri, {})

connection.on('connected', () => {
	console.log('Mongoose connected to DB')
})

connection.on('err', err => {
	console.log(`Mongoose connection error: ${err.message}`)
})

connection.on('disconnected', () => {
	console.log('Mongoose disconnected from DB')
})

process.on('SIGINT', async () => {
	connection.close()
	console.log('Connection DB Close')
	process.exit(1)
})

export default db
