import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";  
import connectDB from "./config/db";
import studentRoutes from "./routes/studentRoutes";

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use(morgan("dev")); 


app.use("/api/students", studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});