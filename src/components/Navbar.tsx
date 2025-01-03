import { useState } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import SearchBar from './SearchBar'
import { motion } from 'framer-motion'

interface NavbarProps {
  onSearch: (keyword: string) => void
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Navbar({ onSearch, setSidebarOpen }: NavbarProps) {
  const [isSearchVisible, setSearchVisible] = useState(false)

  const toggleSearch = () => {
    setSearchVisible((prevState) => !prevState)
  }

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState)
  }

  return (
    <div className="flex justify-between items-center w-full bg-purple-500 p-4">
      <button onClick={toggleSidebar} className="p-4 bg-gray-200 mr-4">
        <IoMdMenu />
      </button>

      <motion.div
        className="flex-1 mx-4"
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isSearchVisible ? 1 : 0,
          width: isSearchVisible ? '100%' : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        {isSearchVisible && <SearchBar onSearch={onSearch} />}
      </motion.div>

      <button onClick={toggleSearch} className="p-4 bg-gray-200">
        {isSearchVisible ? <IoMdClose /> : <CiSearch />}
      </button>
    </div>
  )
}
