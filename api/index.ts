import app from '../app.js';
import db from '../lib/db.js';

const PORT = process.env.PORT || 8081;

db.then(() => {
  app.listen(PORT, async (err: ) => {
    if (err) console.error('Error server', err);

    console.log(`Server start on port ${PORT}`);
  });
}).catch((err) => console.error('Error not running', err.message));
