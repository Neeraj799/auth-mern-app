import { imageUploadHelper } from "../helpers/imageKit.helper.js";

import Modifiers from "../models/modifiers.js";

const createModifier = async (req, res) => {
  const { name, price } = req.body;

  try {
    const folder = "Modifiers";
    let uploadFile;

    if (req.files) {
      console.log(req.files);
      uploadFile = await imageUploadHelper(req.files, folder, "modifier");
    }

    const newModifier = new Modifiers({
      name,
      price,
    });

    if (uploadFile) {
      newModifier.image = uploadFile;
    }

    let data = newModifier.save();

    return res.status(200).json({
      success: true,
      message: "Modifier added successfully",
    });
  } catch (err) {
    return res.json({ message: "Internal Server Error" });
  }
};

const getAllModifiers = async (req, res) => {
  try {
    const modifiers = await Modifiers.find({}).sort({ createdAt: -1 });

    return res.status(200).json(modifiers);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getModifier = async (req, res) => {
  try {
    const { id } = req.params;

    const modifier = await Modifiers.findById(id);

    if (!modifier) {
      return res.status(404).json({ error: "No such modifier found" });
    }

    return res.status(200).json(modifier);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteModifier = async (req, res) => {
  try {
    const { id } = req.params;
    const modifier = await Modifiers.findByIdAndDelete({ _id: id });

    if (!modifier) {
      return res.status(404).json({ error: "Modifier not found" });
    }

    return res.status(200).json({ message: "Modifier deleted successfully" });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

const updateModifier = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, price } = req.body;

    const updatedData = {
      name,
      price,
    };

    if (req.files && req.files.length > 0) {
      const folder = "Modifiers";
      const uploadFile = await imageUploadHelper(req.files, folder, "modifier");
      updatedData.image = uploadFile;
    } else {
      const modifier = await Modifiers.findById(id);
      updatedData.image = modifier.image;
    }

    const updateModifier = await Modifiers.findByIdAndUpdate(
      id,
      {
        $set: updatedData,
      },
      { new: true }
    );

    if (!updateModifier) {
      return res.status(404).json({ error: "Modifier not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Modifier updated Successfully",
      submission: updateModifier,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createModifier,
  getAllModifiers,
  getModifier,
  deleteModifier,
  updateModifier,
};
