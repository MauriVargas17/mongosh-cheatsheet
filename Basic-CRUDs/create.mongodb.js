/********************************************************************
 *                      Creating Documents in MongoDB               *
 *                  insertOne() and insertMany() examples           *
 ********************************************************************/
use("biblioteca");
// Insert a single document into the 'users' collection
db.users.drop();
db.users.insertOne({
    name: "John Doe",
    fullName: {name: "John", surname: "Doe"},
    age: 99,
    email: "john.doe@example.com",
    favorites: ["books", "movies", "music"]
  });


db.users.insertOne({
  name: "Andrea Cuevas",
  fullName: {name: "Andrea", surname: "Cuevas"},
  age: 756,
  email: "dea@an.com",
  favorites: ["comer"]
});

  db.users.find({'fullName.name': 'John'}).pretty();
  // Insert multiple documents into the 'users' collection
  db.users.insertMany([
    { name: "Alice Smith", age: 25, email: "alice.smith@example.com" },
    { name: "Bob Johnson", age: 35, email: "bob.johnson@example.com" }
  ]);


  