import express from "express";
import {
  updateStudentData,
  addStudentData,
  deleteStudentData,
  getStudentData,
  getStudentDataById,
} from "../controllers/admin.controller.js";

const router =  express.Router();
router.post("/add-student-data", addStudentData);
router.get("/student-data", getStudentData);
router.get("/student-data/:id", getStudentDataById);
router.put("/update-student-data/:id", updateStudentData);
router.delete("/delete-student-data/:id", deleteStudentData);

export default router;