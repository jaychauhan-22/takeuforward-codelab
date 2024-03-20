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
    let {username,code_language,stdin,sourcecode,timestamp,stdout} = req.body;
    const obj1 = {username};
    const newDate = new Date();
    timestamp = newDate.getDate()+"/"+ (newDate.getMonth()+1) +"/"+newDate.getFullYear()+" ";
    timestamp += newDate.getHours()+":";
    timestamp += newDate.getMinutes()+":";
    timestamp += newDate.getSeconds();
    const obj2 = {username,code_language,stdin,sourcecode,timestamp,stdout};
    console.log(obj1);
    console.log(obj2);
    const newquery1 = "INSERT INTO users SET ?";
    const newquery2 = "INSERT INTO submissions SET ?";
    // db.query(newquery1,req.body,(err,result)=>{
    //     if(err){
    //         res.status(500).json({error:err.message});
    //     }
    //     res.status(201).json({ message: 'API called successully', result });
    // })
        res.status(201).json({ message: 'API called successully'});
})

// Export the route
module.exports = router;