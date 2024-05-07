const dbConnect = require('./mongodb')
const express = require('express');
const app = express();
app.use(express.json())

//get api
app.get('/', async (req, res) => {
    try {
        let result = await dbConnect();
        let data = await result.find().toArray();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });  // Send error response
    }
});

app.post('/', async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.insertOne(req.body);
        res.send("data inserted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });  // Send error response
    }
});

//put api 
app.put('/:name', async (req, res) => {
    try {
        let result = await dbConnect();  // Connect to the database
        await result.updateOne({ name: req.params.name }, { $set: req.body });
        res.status(200).send("data updated successfully");  // HTTP 200 for successful update
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete('/:name', async (req, res) => {
    try {
        const result = await dbConnect();  // Connect to the MongoDB collection
        const query = { name: req.params.name };  // Use the 'name' parameter for the query
        const deletionResult = await result.deleteOne(query);  // Delete one document matching the query

        if (deletionResult.deletedCount > 0) {  // Check if a document was deleted
            res.status(200).send("Data deleted successfully.");  // Return success
        } else {
            res.status(404).send({ error: "Record not found." });  // No document to delete
        }
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).send({ error: "Internal Server Error" });  // Return 500 on error
    }
});

app.listen(5000);