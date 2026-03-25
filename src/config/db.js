const { open } = require("sqlite"); 
const sqlite3 = require("sqlite3"); 
const path = require("path"); 
const dbPath = path.join(__dirname, "userDatabase.db"); 

let db;  

const openDB = async () => {
 db = await open({
    filename: dbPath, 
    driver: sqlite3.Database
  })

  // Initialize Table
  await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER CHECK(age>=18),
        status TEXT DEFAULT 'active'
      )
    `)

  return db; 
}

const getDb = () => db; 

module.exports = {openDB, getDb}