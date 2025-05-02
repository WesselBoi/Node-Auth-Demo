const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const cors = require("cors")

const connectToMongoDb = require("./connection");
const userRoute = require("./routes/user")

dotenv.config();

PORT = process.env.PORT;
MONGO_URL = process.env.MONGO_URL;

const app = express();

connectToMongoDb(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.get("/", (_, res) => {
  return res.end("Hello from backend :)");
});

app.use("/api/user" , userRoute)

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
