/********************************************************************
 *                      Querying Arrays in MongoDB                  *
 *          $all, $elemMatch, $size, $in, and $nin Operators        *
 ********************************************************************/
use("biblioteca");
// $all: Match arrays that contain all specified elements
db.users.find({ hobbies: { $all: ["reading", "traveling"] } });
use("biblioteca");
// $elemMatch: Match documents that contain an array with at least one element matching all the specified conditions
db.users.find({ scores: { $elemMatch: { $gt: 90, $lt: 100 } } });
use("biblioteca");
db.users.find( { hobbies: { $elemMatch: { $lt: "reading" } } } );
// $size: Match arrays with the specified number of elements
db.users.find({ hobbies: { $size: 3 } });

// $in: Match arrays that contain at least one element in the specified array
// OR
db.users.find({ hobbies: { $in: ["reading", "cycling"] } });

// $nin: Match arrays that do not contain any of the elements in the specified array
// NOR
db.users.find({ hobbies: { $nin: ["swimming", "hiking"] } });
