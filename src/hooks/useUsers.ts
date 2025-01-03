// src/hooks/useUsers.ts
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useUsers = (initialParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['users', initialParams],
    queryFn: async ({ pageParam = 1, queryKey }) => {
      const [params] = queryKey

      const response = await axios.get('https://reqres.in/api/users', {
        params: { ...params, page: pageParam }
      })

      return response.data
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1
  })
}
