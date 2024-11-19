import { Router } from "express";
const router = Router();
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quiz.controller.js";

router.get("/", getAllQuizzes);
router.get("/:id", getQuiz);
router.post("/", createQuiz);
router.put("/:quizID", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
