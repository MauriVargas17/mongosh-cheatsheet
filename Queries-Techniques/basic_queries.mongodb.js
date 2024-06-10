/********************************************************************
 *                         Basic Queries in MongoDB                 *
 *               Comparison Operators and Logical Operators         *
 ********************************************************************/

// Comparison Operators
// Find documents where age is equal to 30
db.users.find({ age: { $eq: 30 } });

// Find documents where age is not equal to 30
db.users.find({ age: { $ne: 30 } });

// Find documents where age is greater than 30
db.users.find({ age: { $gt: 30 } });

// Find documents where age is less than or equal to 30
db.users.find({ age: { $lte: 30 } });
use( "biblioteca");
// Logical Operators
// Find documents where age is either 25 or 30
db.users.find({ $or: [{ age: 25 }, { age: 30 }] });

// Find documents where age is not 30
db.users.find({ age: { $not: { $eq: 30 } } });
use( "biblioteca");
// Find documents where age is 25 and name is "Alice Smith"
db.users.find({ $and: [{ age: 25 }, { name: { $regex: /Alice Smith/, $options: "i" } }] });

// Find documents where age is not 25 nor 30
db.users.find({ $nor: [{ age: 25 }, { age: 30 }] });
