/********************************************************************
 *           Adding and Removing Elements from Arrays in MongoDB    *
 *           Updating Specific Array Elements                       *
 ********************************************************************/

// Adding an element to an array (same as $push)
db.users.updateOne(
    { name: "Charlie Brown" },
    { $push: { favoriteFoods: "pizza" } }
  );
  
  // Removing an element from an array (same as $pull)
  db.users.updateOne(
    { name: "Charlie Brown" },
    { $pull: { favoriteFoods: "pizza" } }
  );
  
  // Updating a specific array element
  db.users.updateOne(
    { name: "Charlie Brown", "favoriteFoods": "burger" },
    { $set: { "favoriteFoods.$": "veggie burger" } }
  );
  