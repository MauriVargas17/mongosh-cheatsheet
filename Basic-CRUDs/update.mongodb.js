/********************************************************************
 *                     Updating Documents in MongoDB                *
 *               updateOne(), updateMany(), and update operators    *
 ********************************************************************/

// Update a single document
db.users.updateOne(
    { name: "John Doe", age: 99},
    { $set: { age: 31 } }
  );
  
  // Update multiple documents
  db.users.updateMany(
    { age: { $gt: 30 } },
    { $inc: { age: -2 } }
  );
  
  // Rename a field in all documents
  db.users.updateMany(
    { },
    { $rename: { "email": "contact_email" } }
  );
  
  // Unset a field (remove a field from the document)
  db.users.updateMany(
    {},
    { $unset: { age: "" } }
  );
  
  // Replace a document
  db.users.replaceOne(
    { name: "John Doe" },
    { name: "John Doe", age: 32, contact_email: "john.doe@example.com" }
  );

  // Upsert a document (Replace if exists else insert)

  db.users.updateOne(
    { name: "John DDD" },
    { $set: { age: 31 } },
    { upsert: true }
  );

  


