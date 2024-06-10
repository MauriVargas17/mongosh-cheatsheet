/********************************************************************
 *                     Deleting Documents in MongoDB                *
 *                     deleteOne() and deleteMany()                 *
 ********************************************************************/

// Delete a single document
db.users.deleteOne({ name: "John Doe" });

// Delete multiple documents
db.users.deleteMany({ age: { $gt: 30 } });
