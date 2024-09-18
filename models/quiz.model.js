import { Schema, model } from "mongoose";

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creatorId: {
      type: String,
      ref: "User",
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        questionType: {
          type: String,
          enum: ["text", "multiple_choice", "opinion_scale"],
          required: true,
        },
        options: [String],
        required: { type: Boolean, default: true },
      },
    ],
    globalSettings: {
      primaryColor: String,
      logoUrl: String,
      introMessage: { type: String },
      completionMessage: { type: String },
    },
    isPublished: { type: Boolean, default: false },
    publishedUrl: { type: String },
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", QuizSchema);
