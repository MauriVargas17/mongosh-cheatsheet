/********************************************************************
 *                  Aggregation Operators in MongoDB                *
 *           $sum, $avg, $min, $max, $push, $addToSet, $first, $last,
 *                           $switch, $cond                         *
 ********************************************************************/
use("biblioteca");
// $sum: Sum of numerical values
db.sales.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$price" } } }
  ]);
  
  // $avg: Average of numerical values
  db.sales.aggregate([
    { $group: { _id: null, avgQuantity: { $avg: "$quantity" } } }
  ]);
  
  // $min and $max: Minimum and maximum values
  db.sales.aggregate([
    { $group: { _id: null, minPrice: { $min: "$price" }, maxPrice: { $max: "$price" } } }
  ]);
  
  use("biblioteca");
  // $push: Append values to an array
  db.sales.aggregate([
    { $group: { _id: "$item", quantities: { $push: "$quantity" } } }
  ]);
  
  // $addToSet: Add unique values to an array
  db.sales.aggregate([
    { $group: { _id: "$item", uniqueQuantities: { $addToSet: "$quantity" } } }
  ]);
  
  // $first and $last: First and last values
  db.sales.aggregate([
    { $sort: { date: 1 } },  // Sort by date to define order
    { $group: { _id: "$item", firstSale: { $first: "$date" }, lastSale: { $last: "$date" } } }
  ]);
  
  // $switch: Conditional logic
  db.sales.aggregate([
    {
      $project: {
        item: 1,
        priceCategory: {
          $switch: {
            branches: [
              { case: { $lt: ["$price", 10] }, then: "Cheap" },
              { case: { $gte: ["$price", 10], $lt: ["$price", 20] }, then: "Moderate" }
            ],
            default: "Expensive"
          }
        }
      }
    }
  ]);
  
  // $cond: Conditional logic
  db.sales.aggregate([
    {
      $project: {
        item: 1,
        isExpensive: {
          $cond: { if: { $gte: ["$price", 20] }, then: true, else: false }
        }
      }
    }
  ]);
  