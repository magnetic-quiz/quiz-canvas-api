import { Schema, model } from "mongoose";

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    quizType: {
      type: String,
      enum: ["personality", "productRecommendation", "assessment"],
      required: true,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        isMandatory: { type: Boolean },
        options: [
          {
            text: { type: String, required: true },
            points: { type: Number, default: 0 },
          },
        ],
      },
    ],
    outcomes: [
      {
        title: { type: String },
        description: { type: String },
      },
    ],
    logic: [
      {
        questionID: {
          type: Schema.Types.ObjectId,
          ref: "Question",
        }, // Refers to a question in the quiz
        optionOutcomes: [
          {
            optionID: { type: Schema.Types.ObjectId }, // Refers to the specific option for a question
            outcomeID: {
              type: Schema.Types.ObjectId,
              ref: "Outcome",
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
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", QuizSchema);
