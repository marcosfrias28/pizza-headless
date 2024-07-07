import type { Pizza } from '../types/PizzaType.js'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function HomeMenu () {
  const [data, setData] = useState<Pizza[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/pizza').then((res) => {
      setLoading(true)
      setData(res.data)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <section
      id='cards'
      className='w-full min-h-72 gap-6 mx-auto my-14 flex flex-col md:flex-row flex-wrap justify-center items-center max-w-screen-2xl'
    >
      {loading || !data &&
          [...Array(4)].map((_, i) => (
            <LoadingArticle key={i + 10} />
          ))}
      {!loading && data &&
           data.slice(0, 4).map(({ id, cover, name, price }) => (
             <article
               key={id}
               id={id}
               className='relative flex flex-col w-[315px] h-[332px] bg-white/90 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7'
             >
               <div className='h-1/2  flex-grow'>
                 <img src={cover} alt='' className='fixed -top-1/2' />
               </div>
               <div className='mx-8 flex-grow'>
                 <div className='flex flex-row justify-between gap-10'>
                   <>
                     <span className='text-black font-semibold'>
                       {name}
                     </span>
                     <span className='text-red-500 font-semibold'>
                       {price} €
                     </span>
                   </>
                 </div>
                 <div className='text-gray-500 w-full max-w-[300px] text-pretty text-ellipsis overflow-hidden text-xs'>
                   {id}
                 </div>
               </div>

               <button className='flex flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-bright-sun-400 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'>
                 <span>Add to order</span>
               </button>
             </article>
           ))}
    </section>
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
