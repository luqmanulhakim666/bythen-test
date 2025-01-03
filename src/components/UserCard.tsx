import Image from 'next/image'
interface User {
  avatar: string
  first_name: string
  last_name: string
  email: string
}

export default function UserCard({
  user,
  onClick
}: {
  user: User
  onClick: () => void
}) {
  return (
    <div className="p-4 border border-gray-200 rounded bg-gray-100 flex flex-col items-center">
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-center mt-2">
        <p className="font-bold">
          {user.first_name} {user.last_name}
        </p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Edit
      </button>
    </div>
  )
}
