import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/category";
import circleRoutes from "./routes/circle";
import postRoutes from "./routes/post";
import userCircleRoutes from "./routes/userCircle";
import userRoutes from "./routes/users";
import commentRoutes from "./routes/comment";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Inner Circle API is running!" });
});

app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/circles", circleRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user-circles", userCircleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Redo på den externa servern på: ${port}`);
});
