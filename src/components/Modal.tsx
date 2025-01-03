import { motion } from 'framer-motion'
import { useState } from 'react'

// Define the user type
interface User {
  id: number
  first_name: string
  last_name: string
  email: string
}

interface ModalProps {
  user: User
  onClose: () => void
  onSave: (updatedUser: User) => void
}

export default function Modal({ user, onClose, onSave }: ModalProps) {
  const [firstName, setFirstName] = useState(user.first_name)
  const [lastName, setLastName] = useState(user.last_name)

  const handleSave = () => {
    const updatedUser: User = {
      ...user,
      first_name: firstName,
      last_name: lastName
    }

    onSave(updatedUser)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
      {/* Modal Animation */}
      <motion.div
        className="bg-white p-6 rounded-lg w-full max-w-md relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          X
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">
          Edit User Details
        </h2>

        {/* User Info Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Last Name"
          />
          <input
            type="email"
            value={user.email}
            className="border p-2 rounded w-full bg-gray-200"
            placeholder="Email"
            disabled
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-4"
        >
          Save
        </button>
      </motion.div>
    </div>
  )
}
