import { Schema, model } from "mongoose";

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [
          {
            text: { type: String, required: true },
          },
        ],
      },
    ],
    welcomePage: [
      {
        headline: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    resultPage: [
      {
        headline: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    isPublished: { type: Boolean, default: false },
    publishedUrl: { type: String },
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", QuizSchema);
