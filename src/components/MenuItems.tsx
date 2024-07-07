import type { Pizza } from '../types/PizzaType.js'
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery
} from '@tanstack/react-query'
import axios from 'axios'

const queryClient = new QueryClient()

interface CardsProps {
  perPage?: number
  'client:load': true
}

export function MenuItems ({ perPage = 12 }: CardsProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Cards perPage={perPage} />
    </QueryClientProvider>
  )
}

function LoadingArticle () {
  return (
    <article className='relative flex flex-col animate-pulse w-[315px] h-[332px] bg-white rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7'>
      <div className='h-1/2  flex-grow bg-slate-200' />
      <div className='mx-8 flex-grow'>
        <div className='flex flex-row justify-between gap-10'>
          <span className='font-semibold bg-slate-200' />
          <span className='font-semibold bg-slate-200' />
        </div>
        <div className='text-gray-500 w-full max-w-[300px] text-pretty text-ellipsis overflow-hidden text-xs' />
      </div>

      <button className='flex flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-slate-300 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
        <span />
      </button>
    </article>
  )
}

function Cards ({ perPage }: { perPage: number }) {
  const { data, isPending, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pizzas'],
    queryFn: async ({ pageParam }) => {
      return await axios.get(
        `/api/pizza?page=${pageParam}&perPage=${perPage}`
      ).then(res => res.data)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length : undefined
    }
  })

  const pizzas = data?.pages.flat(Infinity)

  return (
    <section
      id='cards'
      className='w-full min-h-72 gap-6 mx-auto my-14 flex flex-col md:flex-row flex-wrap justify-center items-center max-w-screen-2xl'
    >
      {isPending &&
          [...Array(perPage)].map((_, i) => (
            <LoadingArticle key={i + 10} />
          ))}
      {!isPending && (pizzas != null) &&
           pizzas[0].pizza?.map((p: Pizza) => (
             <article
               key={p.id}
               id={p.id}
               className='relative flex flex-col w-[315px] h-[332px] bg-white/90 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7'
             >
               <div className='h-1/2  flex-grow'>
                 <img src={p.cover} alt='' className='fixed -top-1/2' />
               </div>
               <div className='mx-8 flex-grow'>
                 <div className='flex flex-row justify-between gap-10'>
                   <>
                     <span className='text-black font-semibold'>
                       {p.name}
                     </span>
                     <span className='text-red-500 font-semibold'>
                       {p.price} €
                     </span>
                   </>
                 </div>
                 <div className='text-gray-500 w-full max-w-[300px] text-pretty text-ellipsis overflow-hidden text-xs'>
                   {p.id}
                 </div>
               </div>

               <button className='flex flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-bright-sun-400 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
                 <span>Add to order</span>
               </button>
             </article>
           ))}
      <button onClick={async () => await fetchNextPage()} className={`${perPage <= 4 ? 'hidden' : ''} flex flex-1 flex-grow-0 flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-bright-sun-400 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>Load More</button>
    </section>
  )
}

export default MenuItems
