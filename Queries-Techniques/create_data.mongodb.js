/********************************************************************
 *                    Creating Sample Data in MongoDB               *
 ********************************************************************/

// Switch to the desired database
use("biblioteca");

// Drop the collection if it already exists (optional)
db.users.drop();

// Insert the sample data
db.users.insertMany([
  {
    name: "Alice Smith",
    age: 25,
    hobbies: ["reading", "traveling", "cycling"],
    scores: [85, 92, 88]
  },
  {
    name: "Bob Johnson",
    age: 35,
    hobbies: ["swimming", "cycling", "hiking"],
    scores: [75, 81, 79]
  },
  {
    name: "Charlie Brown",
    age: 30,
    hobbies: ["gaming", "reading", "swimming"],
    scores: [90, 87, 91]
  },
  {
    name: "David Johnson",
    address: { city: "New York", state: "NY", zip: 10001 },
    scores: [{ subject: "Math", score: 95 }, { subject: "English", score: 88 }]
  },
  {
    name: "Emma Brown",
    address: { city: "Los Angeles", state: "CA", zip: 90001 },
    scores: [{ subject: "Math", score: 82 }, { subject: "English", score: 91 }]
  }
]);

// Verify the inserted data
db.users.find().pretty();
