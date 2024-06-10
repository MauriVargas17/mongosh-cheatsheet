/********************************************************************
 *                 Creating Data for Count Examples                 *
 ********************************************************************/

// Switch to the desired database
use("biblioteca");

// Drop the collection if it already exists (optional)
db.products.drop();

// Insert the sample data
db.products.insertMany([
  { name: "Apple", category: "Fruit", price: 1, quantity: 100 },
  { name: "Banana", category: "Fruit", price: 1, quantity: 150 },
  { name: "Carrot", category: "Vegetable", price: 0.5, quantity: 200 },
  { name: "Lettuce", category: "Vegetable", price: 0.75, quantity: 120 },
  { name: "Orange", category: "Fruit", price: 1.25, quantity: 180 },
  { name: "Tomato", category: "Vegetable", price: 0.8, quantity: 160 }
]);

// Verify the inserted data
db.products.find().pretty();


/********************************************************************
 *                     Using the $count Stage                       *
 *                  Counting Documents in MongoDB                   *
 ********************************************************************/
use("biblioteca");
// Count the total number of documents in the collection
db.products.aggregate([
    { $count: "totalProducts" }
  ]);

db.products.find().count();
  
  // Example Output:
  // { "totalProducts": 6 }
  
  // Count the number of products in the "Fruit" category
  db.products.aggregate([
    { $match: { category: "Fruit" } },
    { $count: "totalFruits" }
  ]);
  
  // Example Output:
  // { "totalFruits": 3 }
  
  // Count the number of products with a price greater than 1
  db.products.aggregate([
    { $match: { price: { $gt: 1 } } },
    { $count: "expensiveProducts" }
  ]);
  
  // Example Output:
  // { "expensiveProducts": 2 }
  use("biblioteca");
  // Count the number of products grouped by category
  db.products.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  
  // Example Output:
  // { "_id": "Fruit", "count": 3 }
  // { "_id": "Vegetable", "count": 3 }
  use("biblioteca");
  // Count the number of products grouped by price range
  db.products.aggregate([
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 1, 2],
        default: "Other",
        output: { count: { $sum: 1 } }
      }
    }
  ]);
  
  // Example Output:
  // { "_id": 0, "count": 2 }
  // { "_id": 1, "count": 4 }
  