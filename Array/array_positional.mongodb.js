/********************************************************************
 *               Array Positional Operators in MongoDB              *
 *                         $, $[], $[<identifier>]                  *
 ********************************************************************/

// $: Update the first matching array element
db.users.updateOne(
    { name: "Bob Johnson", "hobbies": "cycling" },
    { $set: { "hobbies.$": "mountain biking" } }
  );
  
  // $[]: Update all elements in an array
  db.users.updateMany(
    { "hobbies": { $exists: true } },
    { $set: { "hobbies.$[]": "updated hobby" } }
  );
  
  // $[<identifier>]: Update specific elements based on a condition
  db.users.updateMany(
    { "hobbies": { $exists: true } },
    { $set: { "hobbies.$[element]": "updated hobby" } },
    { arrayFilters: [{ "element": { $eq: "old hobby" } }] }
  );
  

  /********************************************************************
 *                  Positional Operators Examples                   *
 *                     $, $[], $[<identifier>]                      *
 ********************************************************************/
// Dummy data for the example
db.users.drop();
db.users.insertMany([
    {
      name: "Alice Smith",
      hobbies: ["reading", "traveling", "cycling"],
      scores: [85, 92, 88]
    },
    {
      name: "Bob Johnson",
      hobbies: ["swimming", "cycling", "hiking"],
      scores: [75, 81, 79]
    },
    {
      name: "Charlie Brown",
      hobbies: ["gaming", "reading", "swimming"],
      scores: [90, 87, 91]
    }
  ]);
  
// $: Update the first matching element in the 'hobbies' array
db.users.updateOne(
    { name: "Alice Smith", hobbies: "cycling" },
    { $set: { "hobbies.$": "mountain biking" } }
  );
  
  // Result: Alice's hobbies array will be ["reading", "traveling", "mountain biking"]
  
  // $[]: Update all elements in the 'scores' array for all users
  db.users.updateMany(
    { scores: { $exists: true } },
    { $set: { "scores.$[]": 100 } }
  );
  
  // Result: All users' scores arrays will be [100, 100, 100]
  
  // $[<identifier>]: Update specific elements based on a condition
  db.users.updateMany(
    { hobbies: { $exists: true } },
    { $set: { "hobbies.$[element]": "updated hobby" } },
    { arrayFilters: [{ "element": { $eq: "reading" } }] }
  );
  
  // Result: All occurrences of "reading" in hobbies arrays will be updated to "updated hobby"
  
  // Combining multiple array filters
  db.users.updateMany(
    { scores: { $exists: true } },
    { 
      $set: { 
        "scores.$[highScore]": 95, 
        "scores.$[lowScore]": 65 
      } 
    },
    {
      arrayFilters: [
        { "highScore": { $gt: 90 } },
        { "lowScore": { $lt: 80 } }
      ]
    }
  );
  
  // Result: 
  // Alice's scores will be [85, 95, 88]
  // Bob's scores will be [65, 81, 79]
  // Charlie's scores will be [90, 87, 91]
  
  db.users.find().pretty();