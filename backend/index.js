// Code  for mongoose config in backend
// Filename - backend/index.js

// To connect with your mongoDB database
/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'FlightDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('Connected to FlightDB database'));
*/

const mongoose = require('mongoose');
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://chzbrgrs:L2tMFEsDvF8SrLiU@flightdb.0adq5.mongodb.net/', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        try {
            await mongoose.connect('mongodb+srv://koi:c1BNM5nfxOP610l4@flightdb.0adq5.mongodb.net/', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
        } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        }
    };
}

connectToDatabase();

// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://localhost:5000
    
});

///*
app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong");
    }
});
//*/
app.listen(5000);
