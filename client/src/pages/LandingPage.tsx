import React, { useState } from 'react'
import { ViewToggle } from '../components'

function LandingPage() {
  const [activeView, setActiveView] = useState<'register' | 'list'>('register')

  return (
    <div className="min-h-screen bg-[#C1E8FF] p-4 md:p-6">
      <div className="max-w-md mx-auto mb-8">
        <ViewToggle
          activeView={activeView}
          onViewChange={setActiveView}
        />
      </div>
    </div>
  )
}

export default LandingPage