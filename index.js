import express, { json } from "express";
import { connect } from "mongoose";
import userRoutes from "./routes/quiz.route.js";

const app = express();
app.use(json());
app.use("/api/quiz", userRoutes);

connect(
  "mongodb+srv://magneticquiz:zvD1mjrOcyyagiwd@magneticcluster.ad5u1.mongodb.net/quizbase?retryWrites=true&w=majority&appName=magneticCluster"
).then(() => {
  app.listen(3000, () => {
    console.log("server running at port 3000");
  });
  console.log("Database Connected!");
});
