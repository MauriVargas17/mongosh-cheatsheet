/********************************************************************
 *                 Querying Embedded Documents in MongoDB           *
 *                        Dot Notation for Querying                 *
 ********************************************************************/

// Example data with embedded documents
db.users.insertMany([
    {
      name: "David Johnson",
      address: { city: "New York", state: "NY", zip: 10001 },
      scores: [{ subject: "Math", score: 95 }, { subject: "English", score: 88 }]
    },
    {
      name: "Emma Brown",
      address: { city: "Los Angeles", state: "CA", zip: 90001 },
      scores: [{ subject: "Math", score: 82 }, { subject: "English", score: 91 }]
    }
  ]);
  
  // Query embedded documents using dot notation
  // Find documents where the city is "New York"
  db.users.find({ "address.city": "New York" });
  
  // Find documents where the Math score is greater than 90
  db.users.find({ "scores.subject": "Math", "scores.score": { $gt: 90 } });
  
  // Find documents where the zip code is either 10001 or 90001
  use("biblioteca");
  db.users.find({ "address.zip": { $in: [10001, 90001] } });

  
  // Find all users to see the changes
db.users.find().pretty();