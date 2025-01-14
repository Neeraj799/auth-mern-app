import express from "express";
import multer from "multer";
import { userAuthCheck } from "../middlewares/Auth.js";
import {
  createModifier,
  deleteModifier,
  getAllModifiers,
  getModifier,
  updateModifier,
} from "../controllers/modifier.controller.js";
const upload = multer({ dest: "uploads/" });

const router = express.Router();
router.post("/create", userAuthCheck, upload.any(), createModifier);
router.get("/", userAuthCheck, getAllModifiers);
router.get("/modifier/:id", getModifier);
router.delete("/modifier/:id", deleteModifier);
router.patch("/modifier/:id", upload.any(), updateModifier);

export default router;
