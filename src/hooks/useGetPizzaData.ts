import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import { useMenuStore } from "./useMenuStore"

export function useGetPizzaData(limit: number = 12) {
    const { filter, name } = useMenuStore()
    const { data, isLoading, fetchNextPage, isError, refetch } = useInfiniteQuery({
        queryKey: ['pizzas'],
        queryFn: async ({ pageParam }) => {
            return await axios.get(
                `/api/pizza?page=${pageParam}&perPage=${limit}${filter ? `&${filter}=${name}` : ''}`
            ).then(res => res.data)
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length ? allPages.length : undefined
        }
    })

    const pizzas = data?.pages.flat(Infinity)

    return { pizzas, isLoading, fetchNextPage, isError, refetch }
}