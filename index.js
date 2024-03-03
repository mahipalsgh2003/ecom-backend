import { MongoClient } from "mongodb"; 
import express from "express"; 
 
const app = express(); 
const uri = "mongodb+srv://rishabh281:goDgr2PObi4Bfx3V@cluster0.u4mbvpi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
const client = new MongoClient(uri); 
const db = client.db("ecom"); 
const product = db.collection("products") 
 
app.get('/products', async (req, res) => { 
    try { 
        await client.connect(); 
        let data = await product.findOne({}); 
        res.send(data); 
    } catch (error) { 
        console.error(error); 
        res.status(500).send("Internal server error"); 
    } finally { 
        await client.close(); 
    } 
}) 
 
const PORT = 3000; 
 
app.listen(PORT, () => { console.log(`Server is running at http://localhost:${PORT}`) })