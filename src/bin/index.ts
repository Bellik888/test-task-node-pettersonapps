import app from '../app'
import db from '../lib/db'

const PORT = process.env.PORT || 8081

db.then(() => {
	app.listen(PORT, async () => {
		console.log(`Server start on port ${PORT}`)
	})
}).catch(err => console.error('Error not running', err.message))
