import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'
import { SiHiveBlockchain } from 'react-icons/si'
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onExpanded: () => void
  isExpanded: boolean
}

const sidebarVariants = {
  open: { x: 0 },
  closed: { x: '-100%' }
}

const sidebarWidthVariants = {
  expanded: { width: '16rem' },
  collapsed: { width: '4rem' }
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onExpanded,
  isExpanded
}) => {
  return (
    <motion.aside
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 h-full bg-gray-200 shadow-lg z-50 
        md:relative md:translate-x-0`}
    >
      <motion.div
        className="flex flex-col h-full p-4"
        variants={sidebarWidthVariants}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-end items-center gap-2 mb-8 md:hidden">
          <button onClick={onClose}>
            <IoMdCloseCircleOutline size={30} color="purple" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <SiHiveBlockchain />
          <h1
            className={`text-lg font-bold transition-all ${
              !isExpanded ? 'hidden' : 'block'
            }`}
          >
            Reqmi
          </h1>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <FiUsers />
            <span className={`${!isExpanded ? 'hidden' : 'block'}`}>
              Connections
            </span>
          </div>
        </div>

        <motion.button
          className="mt-auto text-sm flex items-center gap-2 hidden md:flex"
          onClick={onExpanded}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
          <div className={!isExpanded ? 'hidden' : 'block'}>
            <p>Hide</p>
          </div>
        </motion.button>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
