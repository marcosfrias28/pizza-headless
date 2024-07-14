import axios from 'axios'
import useCartStore, { type Item } from '../../stores/CartStore.js'
import MinusIcon from '../Icons/MinusIcon.jsx'
import PlusIcon from '../Icons/PlusIcon.jsx'
import { TrashIcon } from '../Cart/ShoppingCart.jsx'
import LoadingArticle from '../Loading/LoadingArticle.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import type { Pizza } from '../../types/PizzaType.js'
import { useEffect } from 'react'
import { useGetPizzaData } from '../../hooks/useGetPizzaData'
import { useMenuStore } from '../../hooks/useMenuStore'

const queryClient = new QueryClient()
export function PizzaMenu({ limit = 4 }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu limit={limit} />
    </QueryClientProvider>
  )
}


function Menu({ limit }: { limit: number }) {

  const { cart, setCart, handleDecrement, handleIncrement, handleRemove } = useCartStore()
  const { filter, name } = useMenuStore()
  const { pizzas, isLoading, fetchNextPage, refetch } = useGetPizzaData(limit)

  useEffect(() => {
    refetch()
  }, [filter, name])

  function handleAddCartItem(item: Item) {
    setCart([...cart, item])
  }

  isLoading && [...Array(4)].map((_, i) => (
    <LoadingArticle key={i + 10} />
  ))

  return (
    <>
      <section
        id='cards'
        className='w-full min-h-72 gap-6 mx-auto my-14 flex flex-col md:flex-row flex-wrap justify-center items-center max-w-screen-2xl'
      >
        {isLoading && !pizzas && [...Array(limit)].map((_, i) => (
          <LoadingArticle key={i + 10} />
        ))}

        {pizzas &&
          pizzas.map(({ id, cover, name, price, ingredients }: Pizza, index) => {
            const ItemOnCart = cart.find((item) => item.id === id)

            if (limit === 4 && index > 3) return null

            return (
              <article
                key={id}
                id={id}
                className='relative flex flex-col items-center justify-center w-[315px] h-[332px] bg-white/90 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden'
              >
                <div className='h-1/2 relative -top-1/2' >
                  <img src={cover} alt='Immagine del prodotto in questione' />
                </div>
                <div className='mx-4 mb-7'>
                  <div className='flex flex-row flex-nowrap justify-between gap-10'>
                    <>
                      <span className='text-black font-semibold'>
                        {name}
                      </span>
                      <span className='text-red-500 font-semibold'>
                        {price} €
                      </span>
                    </>
                  </div>
                  <div className='text-gray-500 w-full'>
                    <p className='flex flex-wrap max-h-7 h-full gap-2 text-ellipsis text-pretty text-xs'>
                      <span >{ingredients.join(', ')}</span>
                    </p>
                  </div>
                </div>
                {
                  (ItemOnCart != null) && (
                    <div className='flex flex-nowrap relative'>
                      <Button className=' absolute -right-12 inset-y-0 bg-transparent hover:scale-125' variation='none' onClick={() => handleRemove(id)}>
                        <TrashIcon strokeWidth={5} className='h-5 w-5' />
                      </Button>

                      <Button variation='left' onClick={() => handleDecrement(id)}>
                        <MinusIcon strokeWidth={5} className='h-5 w-5' />
                      </Button>

                      <Button variation='center' className='w-18 px-7'>
                        {ItemOnCart?.quantity}
                      </Button>
                      <Button variation='right' onClick={() => handleIncrement(id)}>
                        <PlusIcon strokeWidth={5} className='h-5 w-5' />
                      </Button>
                    </div>
                  )
                } {
                  (ItemOnCart == null) && (<button
                    onClick={() => {
                      handleAddCartItem({ id, name, price, quantity: 1, cover })
                    }} className='text-center rounded-lg px-7 py-3 mx-10 bg-bright-sun-400 text-white justify-self-end font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'
                  >
                    <span>Add to order</span>
                  </button>)
                }

              </article>
            )
          })}
      </section>
      <div className='w-screen flex items-center justify-center py-20'>
        <button onClick={async () => await fetchNextPage()} className={`${limit <= 4 ? 'hidden' : ''} absolute mx-auto flex justify-center items-center gap-2 rounded-lg px-7 py-3 bg-bright-sun-400 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer`}>Load More</button>
      </div>
    </>
  )
}

interface Props {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variation: 'left' | 'right' | 'center' | 'none';
}

function Button({ className, children, onClick, variation }: Props) {

  const fixedClass = ' cursor-pointer bg-bright-sun-400 text-white shadow-lg'

  const variations = {
    left: 'rounded-l-lg' + fixedClass,
    right: 'rounded-r-lg' + fixedClass,
    center: 'rounded-none pointer-events-none cursor-default bg-white',
    none: ''
  }


  return (
    <button className={` ${variations[variation]} px-4 py-3 font-semibold hover:scale-105 transition-all duration-300 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

