import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import userRoutes from "./routes/UserRoutes.js"
import express from "express";
import dotenv from "dotenv";

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));

mongoose
    .connect("mongodb+srv://bdhakad886:NdLZIRLtVpzGUHw9@cluster0.odfmqd4.mongodb.net/movix?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB Connetion Successfull .....");
    })
    .catch((err) => {
        console.log(err.message);
    });

dotenv.config();


app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "/Moviesverse-frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Moviesverse-frontend", "dist", "index.html"));
});

app.listen(5000, () => {
    console.log("server started on port 5000 .....");
});
