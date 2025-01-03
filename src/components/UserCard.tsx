export default function UserCard({
  user,
  onClick
}: {
  user: any
  onClick: () => void
}) {
  return (
    <div className="p-4 border border-gray-200 rounded bg-gray-100 flex flex-col items-center">
      <img
        src={user.avatar}
        alt={user.first_name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="text-center">
        <p className="font-bold">
          {user.first_name} {user.last_name}
        </p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Edit
      </button>
    </div>
  )
}
