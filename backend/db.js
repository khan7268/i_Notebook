const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/inotebook"; // Replace with your database name

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrl); // Connect to MongoDB without deprecated options
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectToMongo;
