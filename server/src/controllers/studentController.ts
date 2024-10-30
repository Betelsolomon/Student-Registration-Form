import { Request, Response } from "express";
import StudentModel from "../models/studentModel";


export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};


export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = new StudentModel(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
};


export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
};


export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await StudentModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};