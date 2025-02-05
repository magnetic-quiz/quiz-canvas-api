import { Router } from "express";
const router = Router();
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  playQuiz,
  previewQuiz,
  getMultipleQuizzes,
} from "../controllers/quiz.controller.js";

router.get("/", getAllQuizzes);
router.get("/:quizID", getQuiz);
router.get("/playQuiz/:quizID", playQuiz);
router.get("/previewQuiz/:quizID", previewQuiz);
router.post("/getMultipleQuizzes", getMultipleQuizzes);
router.post("/", createQuiz);
router.put("/:quizID", updateQuiz);
router.delete("/:quizID", deleteQuiz);

export default router;
