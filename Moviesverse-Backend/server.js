import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js"
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:5000", "http://localhost:5173", "https://www.moviesverse.studio"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(express.json({ limit: "15mb" }));

const dbHOST = process.env.MONGO_DB_URL;

mongoose
    .connect(dbHOST, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull .....");
    })
    .catch((err) => {
        console.log(err.message);
    });

app.get('/', (req, res) => {
    res.send('products api running new deploy');
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
    console.log("server started on port 5000 .....");
});
