import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from 'react'
import { InputField, ViewToggle } from '../components'
import { motion, AnimatePresence } from 'framer-motion'
import Student from "../types";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: yupResolver(schema),
    mode: "onTouched" // or "onChange"
  });
  

  const onSubmit = (data: Student) => {
    console.log(data)
  };
  

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
              className="max-w-2xl mx-auto"
            >
              <h1>Students</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LandingPage