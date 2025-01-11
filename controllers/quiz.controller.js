import { Quiz } from "../models/quiz.model.js";

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([
      {
        $sort: { updatedAt: -1 }, // Sort by most recent update first
      },
      {
        $group: {
          _id: "$quizID", // Group by quizID
          quiz: { $first: "$$ROOT" }, // Select the most recent document in each group
        },
      },
      {
        $replaceRoot: { newRoot: "$quiz" }, // Replace the root with the selected quiz
      },
    ]);

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const playQuiz = async (req, res) => {
  try {
    const { quizID } = req.params;

    // Find the quiz with the "published" status for the given quizID
    const publishedQuiz = await Quiz.findOne({ quizID, status: "published" });

    if (!publishedQuiz) {
      return res.status(404).json({ message: "Published quiz not found" });
    }

    res.status(200).json(publishedQuiz);
  } catch (error) {
    console.error("Error fetching published quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

export const previewQuiz = async (req, res) => {
  try {
    const { quizID } = req.params;

    // Find the quiz with the "draft" status for the given quizID
    const draftQuiz = await Quiz.findOne({ quizID, status: "draft" });

    if (!draftQuiz) {
      return res.status(404).json({ message: "Draft quiz not found" });
    }

    res.status(200).json(draftQuiz);
  } catch (error) {
    console.error("Error fetching draft quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const { quizID } = req.params;

    // Fetch both published and draft quizzes with the same quizID
    const quizzes = await Quiz.find({ quizID: quizID }).sort({ updatedAt: -1 });

    if (!quizzes.length) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Return the latest draft if available; otherwise, return the published quiz
    const latestQuiz =
      quizzes.find((quiz) => quiz.status === "draft") || quizzes[0];
    res.status(200).json(latestQuiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { quizID } = req.params;

    // Log the quizID for debugging
    console.log("quizID:", quizID);

    // Find the existing draft and published quizzes
    const draftQuiz = await Quiz.findOne({ quizID, status: "draft" });
    const publishedQuiz = await Quiz.findOne({ quizID, status: "published" });

    // Sanitize the request payload
    const sanitizedPayload = { ...req.body };
    delete sanitizedPayload._id; // Remove `_id` to prevent errors
    delete sanitizedPayload.createdAt; // Ensure timestamps are not overwritten
    delete sanitizedPayload.updatedAt; // Ensure timestamps are not overwritten

    // Handle draft updates
    if (req.body.status === "draft") {
      if (draftQuiz) {
        // Update the existing draft
        const updatedDraft = await Quiz.findByIdAndUpdate(
          draftQuiz._id,
          sanitizedPayload,
          { new: true } // Return the updated document
        );
        return res.status(200).json(updatedDraft);
      }

      if (publishedQuiz) {
        // Create a new draft based on the published quiz if no draft exists
        const newDraft = await Quiz.create({
          ...publishedQuiz.toObject(), // Copy all fields from the published quiz
          ...sanitizedPayload, // Apply updates from the request
          status: "draft", // Set the status to draft
          _id: undefined, // Remove `_id` to ensure a new one is generated
        });

        return res.status(200).json(newDraft);
      }
    }

    // Handle publish updates
    if (req.body.status === "published") {
      if (publishedQuiz) {
        // Update the published quiz directly
        const updatedPublished = await Quiz.findByIdAndUpdate(
          publishedQuiz._id,
          sanitizedPayload,
          { new: true } // Return the updated document
        );
        return res.status(200).json(updatedPublished);
      }

      if (draftQuiz) {
        // Promote the draft to published
        const updatedPublished = await Quiz.findByIdAndUpdate(
          draftQuiz._id,
          { ...sanitizedPayload, status: "published" }, // Change status to published
          { new: true } // Return the updated document
        );
        return res.status(200).json(updatedPublished);
      }
    }

    // If no matching quiz found
    return res.status(404).json({ message: "Quiz not found" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndDelete(id);
    if (!quiz) {
      res.status(404).json({ message: "quiz not found " });
    }
    res.status(200).json({ message: "quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
