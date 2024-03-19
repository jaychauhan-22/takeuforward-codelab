const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define Routes
app.use("/user",userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
