const connectToDatabase = require("../dbconfig");
const express = require("express");
const router = express.Router();
router.get("/all",(req,res)=>{
    console.log("API - /get/submissions/all");
    const db = connectToDatabase();
    const newquery = "SELECT * FROM submissions";
    db.query(newquery, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'API called successully', result });
    })
})
module.exports = router