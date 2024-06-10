/********************************************************************
 *                      Aggregation Framework Basics                *
 ********************************************************************/
use("biblioteca");
// Basic aggregation pipeline
db.sales.aggregate([
    { $match: { price: { $gte: 10 } } },  // Stage 1: Match documents with price >= 10
    { $group: { _id: "$item", totalQuantity: { $sum: "$quantity" } } }  // Stage 2: Group by item and sum the quantities
  ]);
  
  // Example Output:
  // { "_id": "journal", "totalQuantity": 25 }
  // { "_id": "notebook", "totalQuantity": 50 }
  // { "_id": "planner", "totalQuantity": 75 }
  