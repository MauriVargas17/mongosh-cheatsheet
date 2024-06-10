/********************************************************************
 *                  Array Update Operators in MongoDB               *
 *                 $push, $pull, $addToSet, $pop, $pullAll           *
 ********************************************************************/

// $push: Add an element to an array
db.users.updateOne(
    { name: "Alice Smith" },
    { $push: { hobbies: "reading" } }
  );
  use("biblioteca");
db.users.updateOne(
    { name: "Alice Smith" },
    { $push: { hobbies: { $each: ["dancing", "yapping"] } } })

  // $pull: Remove an element from an array
  db.users.updateOne(
    { name: "Alice Smith" },
    { $pull: { hobbies: "reading" } }
  );
  
  // $addToSet: Add an element to an array if it doesn't already exist
  db.users.updateOne(
    { name: "Alice Smith" },
    { $addToSet: { hobbies: "traveling" } }
  );
  
  // $pop: Remove the first or last element from an array
  // Remove the last element
  db.users.updateOne(
    { name: "Alice Smith" },
    { $pop: { hobbies: 1 } }
  );
  
  // Remove the first element
  db.users.updateOne(
    { name: "Alice Smith" },
    { $pop: { hobbies: -1 } }
  );
  
  // $pullAll: Remove all matching values from an array
  db.users.updateOne(
    { name: "Alice Smith" },
    { $pullAll: { hobbies: ["reading", "traveling"] } }
  );
  