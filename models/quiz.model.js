import { Schema, model } from "mongoose";

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    questions: [
      {
        questionText: { type: String, required: true },
        isMandatory: { type: Boolean },
        options: [
          {
            text: { type: String, required: true },
          },
        ],
      },
    ],
    outcomes: [
      {
        title: { type: String, required: true },
        description: { type: String },
      },
    ],
    logic: [
      {
        questionID: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        }, // Refers to a question in the quiz
        optionOutcomes: [
          {
            optionID: { type: Schema.Types.ObjectId, required: true }, // Refers to the specific option for a question
            outcomeID: {
              type: Schema.Types.ObjectId,
              ref: "Outcome",
              required: true,
            }, // Refers to the outcome mapped to this option
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
