const Prompt = require('../models/prompts.models')
const generateTags = require('../Services/ai.service')

// 1. Create a new prompt
async function createPrompt (req, res){
  try {
    const { title, content, description, isPublic } = req.body;
    const tags = await generateTags(title, content);

    const prompt = await Prompt.create({
      title,
      content,
      description,
      tags,
      isPublic,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Prompt created successfully",
      prompt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create prompt",
      error: error.message,
    });
  }
};


// 2. Get all prompts
async function getPrompts (req, res){
  try {

    const {tags} = req.query;
    let filter = {}

    if(tags){
        filter.tags = {
            $regex: tags,
            $options: "i"
        }
    }
    const prompts = await Prompt.find(filter)
      .populate("createdBy", "fullname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Prompts fetched successfully",
      prompts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch prompts",
      error: error.message,
    });
  }
};


// 3. Get a single prompt
async function getPromptById(req, res){
  try {
    const { id } = req.params;

    const prompt = await Prompt.findById(id)
      .populate("createdBy", "name email");

    if (!prompt) {
      return res.status(404).json({
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      message: "Prompt fetched successfully",
      prompt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch prompt",
      error: error.message,
    });
  }
};


// 4. Update a prompt
async function updatePrompt(req, res){
  try {
    const { id } = req.params;

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return res.status(404).json({
        message: "Prompt not found",
      });
    }

    // Make sure the user owns this prompt
    if (prompt.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this prompt",
      });
    }

    const updatedPrompt = await Prompt.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Prompt updated successfully",
      prompt: updatedPrompt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update prompt",
      error: error.message,
    });
  }
};

async function deletePrompt (req, res){
  try {
    const { id } = req.params;

    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return res.status(404).json({
        message: "Prompt not found",
      });
    }

    // Make sure the user owns this prompt
    if (prompt.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this prompt",
      });
    }

    await Prompt.findByIdAndDelete(id);

    res.status(200).json({
      message: "Prompt deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete prompt",
      error: error.message,
    });
  }
};

module.exports = {
    createPrompt,
    getPrompts,
    getPromptById,
    updatePrompt,
    deletePrompt
}