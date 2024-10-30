import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Modal = ({
    isOpen,
    onClose,
    title,
    children
  }: {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
  }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#021024]/20 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-[#C1E8FF] p-6 rounded-lg shadow-lg w-full max-w-md relative"
        >
            <button
              onClick={onClose}
              className="absolute right-8 top-8"
            >
              <X className="w-5 h-5 text-[#052659]/60 hover:text-[#052659]" />
            </button>
            <h2 className="text-lg font-medium text-[#052659] mb-8">{title}</h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

export default Modal