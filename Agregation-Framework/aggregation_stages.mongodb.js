/********************************************************************
 *                   Aggregation Stages in MongoDB                  *
 *                 $match, $group, $project, $sort, $limit          *
 ********************************************************************/

use("biblioteca");
// $match: Filter documents
db.sales.aggregate([
    { $match: { quantity: { $gte: 50 } } }
  ]);
  
  // $group: Group documents by a field and perform operations
  db.sales.aggregate([
    { $group: { _id: "$item", avgQuantity: { $avg: "$quantity" } } }
  ]);
  
  // $project: Reshape documents
  db.sales.aggregate([
    { $project: { item: 1, total: { $multiply: ["$price", "$quantity"] } } }
  ]);
  use("biblioteca");
  // $sort: Sort documents by a field
  db.sales.aggregate([
    { $sort: { quantity: -1 } }
  ]);
  use("biblioteca");
  db.sales.find().sort({ quantity: -1 });
  
  // $limit: Limit the number of documents
  db.sales.aggregate([
    { $limit: 3 }
  ]);
  