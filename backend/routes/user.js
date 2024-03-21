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

router.post("/insert", (req, res) => {
    console.log("API - /post/user");
    const db = connectToDatabase();
    let { username, code_language, stdin, sourcecode, timestamp, stdout } = req.body;
    const obj1 = { username };
    const obj2 = { username, code_language, stdin, sourcecode, timestamp, stdout };
    console.log(obj1);
    console.log(obj2);
    // const newquery1 = "INSERT INTO users SET ?";
    const existingusercheck = `SELECT * FROM users where username='${username}'`;
    console.log(existingusercheck);
    db.query(existingusercheck, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        }
        if (result.length == 0) {
            const insert_userquery = "INSERT INTO users SET ?";
            db.query(insert_userquery, obj1, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                }
            })
        } 
        const insert_submissionquery = "INSERT INTO submissions SET ?";
        db.query(insert_submissionquery, obj2, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'API called successully', result });
        })
        // res.status(201).json({ message: 'API called successully', result });
    })
    const newquery1 = "INSERT IGNORE INTO users (username) VALUES(?)";

})

// Export the route
module.exports = router;