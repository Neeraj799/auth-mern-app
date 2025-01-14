import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "../backend/routes/auth.routes.js";
import ProductRouter from "../backend/routes/product.routes.js";
import envConfig from "./config/envConfig.js";

dotenv.config();

const app = express();

mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = envConfig.general.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
