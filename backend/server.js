import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DB.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/categories", categoryRouter);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
