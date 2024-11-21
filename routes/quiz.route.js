import { Router } from "express";
const router = Router();
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  playQuiz,
} from "../controllers/quiz.controller.js";

router.get("/", getAllQuizzes);
router.get("/:quizID", getQuiz);
router.get("/playQuiz/:quizID", playQuiz);
router.post("/", createQuiz);
router.put("/:quizID", updateQuiz);
router.delete("/:id", deleteQuiz);

export default router;
