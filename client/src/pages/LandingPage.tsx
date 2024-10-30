import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from 'react'
import { InputField, Modal, StudentCard, ViewToggle } from '../components'
import { motion, AnimatePresence } from 'framer-motion'
import Student from "../types";
import { createStudent, deleteStudent, fetchStudents, updateStudent } from "../hooks/apiHooks";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please fill in your name"),
  age: yup.number()
  .nullable()
  .transform((value, originalValue) =>
    originalValue.trim() === "" ? null : value,
  ).required("Please fill in your age"),
  course: yup.string().required("Please fill in your course"),
  email: yup
  .string()
  .email("Please use a correct email format")
  .required("Please fill in your email"),
  phone: yup.string().required("Please fill in your phone number")
});

function LandingPage() {
  const [activeView, setActiveView] = useState<'register' | 'list'>('register')
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 19,
      course: 'Computer Science',
      email: 'sarah.j@example.com',
      phone: '1234567890'
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 21,
      course: 'Business Administration',
      email: 'michael.c@example.com',
      phone: '2345678901'
    },
    {
      id: '3',
      name: 'Emma Davis',
      age: 20,
      course: 'Graphic Design',
      email: 'emma.d@example.com',
      phone: '3456789012'
    }
  ])

  const {
    register,
    handleSubmit,
    formState: { errors }
    ,reset 
  } = useForm<Student>({
    resolver: yupResolver(schema),
    mode: "onTouched" // or "onChange"
  });
  

  const onSubmit = async (data: Student) => {
    const newStudent = await createStudent(data);
    setStudents((prev) => [...prev, newStudent]);
    reset();
  };
  
  const onUpdate = async (data: Student) => {
    const updatedStudent = await updateStudent(data);
    setStudents((prev) => prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    reset();
  };

  const onDelete = async (id: string) => {
    await deleteStudent(id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  useEffect(() => {
    const loadStudents = async () => {
      const studentList = await fetchStudents();
      setStudents(studentList);
    };
    loadStudents();
  }, [ ]);
  return (
    <div className="min-h-screen bg-[#C1E8FF] p-4 md:p-6">
      <div className="max-w-md mx-auto mb-8">
        <ViewToggle
          activeView={activeView}
          onViewChange={setActiveView}
        />
        <AnimatePresence mode="wait">
          {activeView === 'register' ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                  name="name"
                  register={register}
                  type="text"
                  placeholder="Name"
                  error={errors.name}
                />
                <InputField
                  name="age"
                  register={register}
                  type="number"
                  placeholder="Age"
                  error={errors.age}
                />
                <InputField
                  name="course"
                  register={register}
                  placeholder="Course"
                  error={errors.course}
                />
                <InputField
                  name="email"
                  register={register}
                  type="email"
                  placeholder="Email"
                  error={errors.email}
                />
                <InputField
                  name="phone"
                  register={register}
                  type="text"
                  placeholder="Phone"
                  error={errors.phone}
                />
                <button
                  type="submit"
                  className="w-full mt-6 py-2 border border-[#052659] text-[#052659] hover:bg-[#052659] hover:text-[#C1E8FF] transition-colors duration-300"
                >
                  Register
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-8">
                {students.length === 0 ? (
                  <p className="text-center text-[#052659]/40 py-8">No students registered yet.</p>
                ) : (
                  students.map((student) => (
                    <StudentCard
                      key={student.id}
                      student={student}
                      onEdit={setEditingStudent}
                      onDelete={onDelete}
                    />
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Modal
        isOpen={!!editingStudent}
        onClose={() => setEditingStudent(null)}
        title="Edit Student"
      >
        {editingStudent && (
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <InputField
            name="name"
            register={register}
            type="text"
            placeholder="Name"
            error={errors.name}
          />
          <InputField
            name="age"
            register={register}
            type="number"
            placeholder="Age"
            error={errors.age}
          />
          <InputField
            name="course"
            register={register}
            placeholder="Course"
            error={errors.course}
          />
          <InputField
            name="email"
            register={register}
            type="email"
            placeholder="Email"
            error={errors.email}
          />
          <InputField
            name="phone"
            register={register}
            type="text"
            placeholder="Phone"
            error={errors.phone}
          />
          <button
            type="submit"
            className="w-full mt-6 py-2 border border-[#052659] text-[#052659] hover:bg-[#052659] hover:text-[#C1E8FF] transition-colors duration-300"
          >
            Register
          </button>
        </form>
        )}
      </Modal>
    </div>
  )
}

export default LandingPage