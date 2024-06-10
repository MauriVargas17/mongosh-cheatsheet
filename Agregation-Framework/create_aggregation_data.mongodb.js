/********************************************************************
 *                  Creating Data for Aggregation Examples          *
 ********************************************************************/

// Switch to the desired database
use("biblioteca");

// Drop the collection if it already exists (optional)
db.sales.drop();

// Insert the sample data
db.sales.insertMany([
  {
    item: "journal",
    price: 10,
    quantity: 25,
    date: new Date("2021-03-01")
  },
  {
    item: "notebook",
    price: 15,
    quantity: 50,
    date: new Date("2021-03-02")
  },
  {
    item: "paper",
    price: 5,
    quantity: 100,
    date: new Date("2021-03-03")
  },
  {
    item: "planner",
    price: 20,
    quantity: 75,
    date: new Date("2021-03-04")
  },
  {
    item: "planner",
    price: 20,
    quantity: 15,
    date: new Date("2021-03-04")
  },
  {
    item: "postcard",
    price: 3,
    quantity: 150,
    date: new Date("2021-03-05")
  }
]);

// Verify the inserted data
db.sales.find().pretty();
