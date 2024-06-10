/********************************************************************
 *                   Advanced Aggregation in MongoDB                *
 *               $unwind, $lookup, $facet, $bucket, $graphLookup    *
 ********************************************************************/
use("biblioteca");
// $unwind: Deconstruct an array field
db.sales.insertMany([
    { item: "journal", tags: ["stationery", "writing", "office"] },
    { item: "notebook", tags: ["stationery", "school"] }
  ]);
  use("biblioteca");
  db.sales.aggregate([
    { $unwind: "$tags" }
  ]);
   
  // $lookup: Perform a left outer join
  db.customers.insertMany([
    { _id: 1, name: "John Doe" },
    { _id: 2, name: "Jane Smith" }
  ]);
  use("biblioteca");
  db.orders.insertMany([
    { _id: 54, customerId: 1, item: "journal" },
    { _id: 343, customerId: 2, item: "notebook" }
  ]);
  use("biblioteca");
  db.customers.aggregate([
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customerId",
        as: "orders"
      }
    }
  ]);
  
  // $facet: Process multiple pipelines within a single stage
  db.sales.aggregate([
    {
      $facet: {
        "priceHistogram": [
          { $bucket: { groupBy: "$price", boundaries: [0, 5, 10, 15, 20], default: "Other" } }
        ],
        "quantityHistogram": [
          { $bucket: { groupBy: "$quantity", boundaries: [0, 50, 100, 150], default: "Other" } }
        ]
      }
    }
  ]);
  
  // $bucket and $bucketAuto: Group documents into buckets
  db.sales.aggregate([
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 5, 10, 20],
        default: "Other",
        output: { "count": { $sum: 1 }, "totalQuantity": { $sum: "$quantity" } }
      }
    }
  ]);
  
  // $graphLookup: Perform recursive search
  db.categories.insertMany([
    { _id: "Books", parentCategory: null },
    { _id: "Programming", parentCategory: "Books" },
    { _id: "Databases", parentCategory: "Programming" },
    { _id: "MongoDB", parentCategory: "Databases" }
  ]);
  
  db.categories.aggregate([
    {
      $graphLookup: {
        from: "categories",
        startWith: "$parentCategory",
        connectFromField: "parentCategory",
        connectToField: "_id",
        as: "hierarchy"
      }
    }
  ]);
  