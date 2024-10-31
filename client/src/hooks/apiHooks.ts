import axios from "axios";
import Student from "../types"; 

const apiUrl = "http://localhost:5000/api/students"; 


export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>(apiUrl);
  return response.data;
};


export const createStudent = async (student: Omit<Student, "id">): Promise<Student> => {
  const response = await axios.post<Student>(apiUrl, student);
  return response.data;
};


export const updateStudent = async (student: Student): Promise<Student> => {
  const response = await axios.put<Student>(`${apiUrl}/${student._id}`, student);
  return response.data;
};


export const deleteStudent = async (id: string): Promise<void> => {
  await axios.delete(`${apiUrl}/${id}`);
};