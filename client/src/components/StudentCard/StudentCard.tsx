import React from 'react'
import Student from '../../types'
import { Pencil, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

const StudentCard = ({ 
    student,
    onEdit,
    onDelete 
  }: {
    student: Student
    onEdit: (student: Student) => void
    onDelete: (id: string) => void
  }) => (
    <motion.div
    key={student._id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="group p-4 border-b border-[#052659]/10 relative hover:bg-[#7DA0CA]/10 transition-colors"
  >
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-[#021024]">{student.name}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={() => onEdit(student)}>
            <Pencil className="w-4 h-4 text-[#052659]" />
          </button>
          <button onClick={() => onDelete(student._id)}>
            <Trash2 className="w-4 h-4 text-[#052659]" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-[#052659]">
        <p>Age: {student.age}</p>
        <p>Course: {student.course}</p>
        <p>Email: {student.email}</p>
        <p>Phone: {student.phone}</p>
      </div>
    </div>
  </motion.div>
  )

export default StudentCard