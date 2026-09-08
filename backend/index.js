import express from "express"
import { configDotenv } from "dotenv"
import formRoute from "./routes/FormRotue.js";
import cors from "cors"

configDotenv()

const app = express()

app.use(cors());

app.use(express.json()); 
app.use('/api/form', formRoute); 

app.get('/api/data', (req, res) => {
  res.json({ message: "DATA is NOT AVAILABLE!" });
});

app.listen(process.env.PORT,()=>{
    console.log("server is running.... (on port 3000).")
})