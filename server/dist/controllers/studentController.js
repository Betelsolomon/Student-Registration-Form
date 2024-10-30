"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudents = void 0;
const studentModel_1 = __importDefault(require("../models/studentModel"));
// Get all students
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentModel_1.default.find();
        res.json(students);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});
exports.getStudents = getStudents;
// Create a new student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = new studentModel_1.default(req.body);
        const savedStudent = yield student.save();
        res.status(201).json(savedStudent);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create student" });
    }
});
exports.createStudent = createStudent;
// Update a student by ID
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield studentModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update student" });
    }
});
exports.updateStudent = updateStudent;
// Delete a student by ID
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield studentModel_1.default.findByIdAndDelete(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete student" });
    }
});
exports.deleteStudent = deleteStudent;
