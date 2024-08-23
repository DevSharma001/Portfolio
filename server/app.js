const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
// const user = require('../public/assets/module/user');

mongoose.connect('mongodb://127.0.0.1:27017/Portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');  

})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);   

});

// Define a Mongoose schema for your data
const userDataSchema = new mongoose.Schema({
    username: String,
    Email: String,
    Subject:String,
    Message:String,

});
const User = mongoose.model('User', userDataSchema);
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));


// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Route to render HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//form submit
// app.get("/submit", (req, res)=> {
//     res.send("Done");
//     console.log("Done")
//     let {username} = req.body;
//     console.log(username)
// })

//res after req submition
app.post("/submit", async(req, res)=> {
    res.sendFile(path.join(__dirname, "../public",  "tshirt.html"));
    const {username, Email, Subject, Message} = req.body;

    //  // Create a new User document
    //  const newUser = new User({
    //     username,
    //     Email,
    //     Subject,
    //     Message
    // });

    try {
        // Create a new User document
        const newUser = new User({
            username,
            Email,
            Subject,
            Message,
        });

        // Save the document to the database asynchronously
        await newUser.save();

        console.log('Data saved to database successfully');
        // res.json({ message: 'Data submitted successfully' });
    } catch (err) {
        console.error('Error saving data to database:', err);
        res.status(500).json({ error: 'Error occurred while saving data' });
    }
});
app.post("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public",  "index.html"));
});
// Example API route
app.get('/api/data', (req, res) => {
    res.json({ message: "Hello from the backend!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
