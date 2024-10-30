import React, { useState } from 'react'
import { ViewToggle } from '../components'
import { motion, AnimatePresence } from 'framer-motion'

function LandingPage() {
  const [activeView, setActiveView] = useState<'register' | 'list'>('register')

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
              <h1>register</h1>
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