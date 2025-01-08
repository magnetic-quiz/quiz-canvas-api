import { Schema, model } from "mongoose";

const QuizSchema = new Schema(
  {
    quizID: { type: String, required: true, unique: true }, // Store UUID
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
        description: { type: String },
        isMandatory: { type: Boolean },
        isMultipleChoice: { type: Boolean },
        image: { type: String },
        deskTopLayout: {
          type: String,
          enum: [
            "imageBackground",
            "textOnly",
            "leftImage",
            "rightImage",
            "leftFullImage",
            "rightFullImage",
          ],
          default: "rightImage",
          required: true,
        },
        mobileLayout: {
          type: String,
          enum: ["imageBackground", "textOnly", "topImage"],
          default: "topImage",
          required: true,
        },
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
        image: { type: String },
        ctaHeadline: { type: String },
        ctaButtonText: { type: String },
        ctaButtonURL: { type: String },
        isCTASectionVisbile: { type: Boolean },
        isAboutSectionVisible: { type: Boolean },
        bioTitle: { type: String },
        bioDescription: { type: String },
        bioImage: { type: String },
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
        image: { type: String },
        startButtonText: { type: String, required: true },
        enableLeadGen: { type: Boolean },
        deskTopLayout: {
          type: String,
          enum: [
            "imageBackground",
            "textOnly",
            "leftImage",
            "rightImage",
            "leftFullImage",
            "rightFullImage",
          ],
          default: "rightImage",
          required: true,
        },
        mobileLayout: {
          type: String,
          enum: ["imageBackground", "textOnly", "topImage"],
          default: "topImage",
          required: true,
        },
      },
    ],
    resultPage: [
      {
        headline: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    theme: {
      themeType: { type: String },
      placement: { type: String },
      colors: {
        question: { type: String },
        answer: { type: String },
        button: { type: String },
        button_content: { type: String },
        background: { type: String },
      },
      font_size: { type: String },
      font: { type: String },
    },
    leadName: [
      {
        nameCallout: { type: String },
        isMandatory: { type: Boolean },
        image: { type: String },
        deskTopLayout: {
          type: String,
          enum: [
            "imageBackground",
            "textOnly",
            "leftImage",
            "rightImage",
            "leftFullImage",
            "rightFullImage",
          ],
          default: "rightImage",
          required: true,
        },
        mobileLayout: {
          type: String,
          enum: ["imageBackground", "textOnly", "topImage"],
          default: "topImage",
          required: true,
        },
      },
    ],
    leadEmail: [
      {
        emailCallout: { type: String },
        isMandatory: { type: Boolean },
        image: { type: String },
        Description: { type: String },
        deskTopLayout: {
          type: String,
          enum: [
            "imageBackground",
            "textOnly",
            "leftImage",
            "rightImage",
            "leftFullImage",
            "rightFullImage",
          ],
          default: "rightImage",
          required: true,
        },
        mobileLayout: {
          type: String,
          enum: ["imageBackground", "textOnly", "topImage"],
          default: "topImage",
          required: true,
        },
      },
    ],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", QuizSchema);
