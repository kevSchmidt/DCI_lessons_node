// ========== MongoDB basic commands ===

// See all Databases             --> show dbs
// Create new DB || Switch DB    --> use <name>
// Show the current Database     --> db
// Drop DB                       --> db.dropDatabase()

// Create Collection             --> db.createCollection('<collection-name>')
// Show Collections              --> show collections

// Create one row                --> db.<collection-name>.insert({})
// Create several rows           --> db.<collection-name>.insertMany{[{},{},{},]}
// Show all rows in Collection   --> db.<collection-name>.find()
// Find rows with Criteria       --> db.<collection-name>.find({ key: property })
// Delete row with Criteria      --> db.<collection-name>.remove({ key: property })
// Sorting rows                  --> db.<collection-name>.find().sort({ key: property })

// Make it pretty                --> db.users.find().pretty()

// ========== Example ====

// in terminal
use newTest
db

db.createCollection("users")
show collections

db.users.insert({
  name: 'Kevin',
  age: 27,
  address: 'Berlin',
  hobbies: ['music', 'travel', 'coding'],
  emails: {
    private: 'my-private@email.com',
    work: 'my-personnal@email.com'
  },
  date: Date()
})

db.users.insertMany([
  {
    name: "Paul",
    age: 24,
    address: "Paris",
    date: Date(),
  },
  {
    name: "Toni",
    age: 47,
    address: "Roma",
    date: Date(),
  },
  {
    name: "Alexandra",
    age: 25,
    address: "Moscow",
    date: Date(),
  },
  {
    name: "Yuka",
    age: 36,
    address: "Tokyo",
    date: Date(),
  },
  {
    name: "Maxwell",
    age: 29,
    address: "Toronto",
    date: Date(),
  },
])

db.users.find().pretty()
db.users.find({address:"Berlin"}).pretty()
db.users.remove({name:"Toni"})
db.users.find().pretty()