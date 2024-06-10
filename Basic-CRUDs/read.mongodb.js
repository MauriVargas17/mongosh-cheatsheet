/********************************************************************
 *                      Reading Documents in MongoDB                *
 *                  find(), query filters, projection,              *
 *                     sorting, and limiting results                *
 ********************************************************************/

// Find all documents in the 'users' collection
db.users.find();

// Find documents with a query filter
db.users.find({ age: { $gt: 30 } });

// Project specific fields (excluding the _id field)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sort documents by age in ascending order
db.users.find().sort({ age: 1 }).limit(5);

// Limit the number of documents returned
db.users.find().limit(5).sort({ age: -1});

db.users.find().pretty();
