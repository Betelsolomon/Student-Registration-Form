

const ViewToggle = ({
    activeView,
    onViewChange
  }: {
    activeView: 'register' | 'list'
    onViewChange: (view: 'register' | 'list') => void
  }) => (
    <div className="flex gap-4 justify-center mb-8">
    <button
      onClick={() => onViewChange('register')}
      className={`px-4 py-2 transition-colors duration-300 ${
        activeView === 'register' 
          ? 'text-[#021024] border-b-2 border-[#021024]' 
          : 'text-[#052659] hover:text-[#021024]'
      }`}
    >
      Register
    </button>
    <button
      onClick={() => onViewChange('list')}
      className={`px-4 py-2 transition-colors duration-300 ${
        activeView === 'list' 
          ? 'text-[#021024] border-b-2 border-[#021024]' 
          : 'text-[#052659] hover:text-[#021024]'
      }`}
    >
      Students
    </button>
  </div>
  )

export default ViewToggle