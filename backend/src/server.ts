
import app from "./app"
import database from "./database";

database
.sync()
.then(() => 'Database connection established')
.catch((err) =>
    console.log(`An error occurred while connection to database: ${err}`),
  );
console.log('Database running at 3306')

app.listen(3001);

console.log('Server running at 3001');
