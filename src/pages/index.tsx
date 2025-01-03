import { useState, useEffect, useRef } from 'react'
import { useUsers } from '../hooks/useUsers'
import UserCard from '../components/UserCard'
import Modal from '../components/Modal'
import Spinner from '../components/Spinner'
import SearchBar from '../components/SearchBar'

interface UsersPageProps {
  searchKeyword: string
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>
}

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  avatar: string
}

export default function UsersPage({
  searchKeyword,
  setSearchKeyword
}: UsersPageProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useUsers({
    per_page: 3
  })

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const users = data?.pages.flatMap((page) => page.data) || []

  const filteredUsers = users.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()) ||
      user.email.toLowerCase().includes(searchKeyword.toLowerCase())
  )

  const handleOnSave = () => {
    setTimeout(() => {}, 500)
    alert('Data has been saved')

    setSelectedUser(null)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage()
        }
      },
      {
        rootMargin: '100px'
      }
    )

    const currentLoadMoreRef = loadMoreRef.current

    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef)
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef)
      }
    }
  }, [fetchNextPage, hasNextPage, isFetching])

  return (
    <>
      <div className="hidden md:block mb-4">
        <SearchBar onSearch={setSearchKeyword} />
      </div>
      <div className="md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? [...Array(12)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-300 h-48 rounded-md"
              />
            ))
          : filteredUsers.map((user) => (
              <div key={user.id} className="mb-4 md:mb-0">
                <UserCard user={user} onClick={() => setSelectedUser(user)} />
              </div>
            ))}
      </div>

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="my-4">
        {isFetching && <Spinner />}
      </div>

      {selectedUser && (
        <Modal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleOnSave}
        />
      )}
    </>
  )
}
