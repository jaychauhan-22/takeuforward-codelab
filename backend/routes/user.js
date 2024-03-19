const connectToDatabase = require("../dbconfig");
const express = require("express");
const router = express.Router();

// Define Routes
router.get("/select", (req, res) => {
    console.log("API - /get/users");
    const db = connectToDatabase();
    const newquery = "SELECT * FROM users";
    db.query(newquery, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'API called successully', result });
    })

});

router.post("/insert",(req,res)=>{
    console.log("API - /put/user");
    const db = connectToDatabase();
    const newquery = "INSERT INTO users SET ?";
    db.query(newquery,req.body,(err,result)=>{
        if(err){
            res.status(500).json({error:err.message});
        }
        res.status(201).json({ message: 'API called successully', result });
    })
})

// Export the route
module.exports = router;