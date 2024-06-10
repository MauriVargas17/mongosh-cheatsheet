/********************************************************************
 *                        MongoDB Shell Basics                      *
 *       Connecting to a database and basic Shell commands          *
 ********************************************************************/

// Connecting to a MongoDB database
// Replace <dbname> with your database name
use('biblioteca');

// List all collections in the database
db.getCollectionNames();

// Display the current database
db;
