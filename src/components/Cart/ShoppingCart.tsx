import { useState, useEffect } from 'react'
import useCartStore from '../../stores/CartStore'
import MinusIcon from '../Icons/MinusIcon'
import PlusIcon from '../Icons/PlusIcon'
import XIcon from '../Icons/XIcon'
import axios from 'axios'

type SVGProps = React.SVGProps<SVGSVGElement>

export default function ShoppingCart () {
  const { cart, isCartOpen, setIsCartOpen, clearCart, handleDecrement, handleIncrement, total, handleRemove } = useCartStore()

  return (
    <>
      <div className={`fixed group ${isCartOpen ? '' : 'hidden'} z-50 min-h-dvh w-screen bg-black/30`}>
        {isCartOpen && (
          <div className='absolute min-h-dvh right-0 max-h-[700px]
          animate-fade-left animate-duration-300
           z-40 mt-2 w-full sm:w-[450px] rounded-s-lg border bg-white shadow-lg'
          >
            <div className='flex flex-col gap-4 p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-medium'>Shopping Cart</h3>
                <div className='flex flex-nowrap gap-4'>
                  <button onClick={clearCart} className={`${cart[0] ? '' : 'pointer-events-none'}`}>
                    <TrashIcon className='h-4 w-4' />
                  </button>
                  <button onClick={() => setIsCartOpen(false)}>
                    <XIcon className='h-5 w-5' />
                  </button>
                </div>

              </div>
              <div className='flex flex-col gap-4 max-h-[600px] overflow-y-scroll px-5'>
                {cart.map((item) => (<div key={item.id} className='flex items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <img src={item.cover} alt={item.name} width={64} height={64} className='rounded-md' />
                    <div>
                      <h4 className='font-medium'>{item.name}</h4>
                      <p className='text-sm text-muted-foreground'>{item.price.toFixed(2)} €</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button onClick={() => handleDecrement(item.id)}>
                      <MinusIcon className='h-4 w-4' />
                    </button>
                    <span className='text-sm font-medium'>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>
                      <PlusIcon className='h-4 w-4' />
                    </button>
                    <button onClick={() => handleRemove(item.id)}>
                      <TrashIcon className='h-4 w-4' />
                    </button>
                  </div>
                </div>
                ))}
              </div>
              <hr />
              <div className='flex items-center justify-between'>
                <p className='text-lg font-medium'>Total:</p>
                <p className='text-lg font-medium'>{total.toFixed(2)} €</p>
              </div>
              <form action="/api/checkout/checkout-session" method='post'>
              <button className='w-full bg-bright-sun-300 py-2 rounded-lg shadow-xl '>Proceed to Checkout</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>

  )
}




export function ShoppingCartIcon (props: SVGProps) {
  return (
    <svg
      {...props}
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
    >
      <path
        d='M0 0.75C0 0.334375 0.337235 0 0.756414 0H2.19045C2.88383 0 3.49842 0.4 3.78522 1H16.7388C17.5677 1 18.1729 1.78125 17.9554 2.575L16.6632 7.33438C16.3953 8.31563 15.497 9 14.4727 9H5.38L5.55019 9.89062C5.61953 10.2438 5.93155 10.5 6.294 10.5H15.3804C15.7996 10.5 16.1368 10.8344 16.1368 11.25C16.1368 11.6656 15.7996 12 15.3804 12H6.294C5.2035 12 4.26744 11.2313 4.06573 10.1719L2.43944 1.70313C2.41737 1.58438 2.31337 1.5 2.19045 1.5H0.756414C0.337235 1.5 0 1.16563 0 0.75ZM4.03421 14.5C4.03421 14.303 4.07334 14.108 4.14937 13.926C4.22539 13.744 4.33683 13.5786 4.47731 13.4393C4.61779 13.3001 4.78456 13.1896 4.9681 13.1142C5.15165 13.0388 5.34837 13 5.54704 13C5.74571 13 5.94243 13.0388 6.12597 13.1142C6.30952 13.1896 6.47629 13.3001 6.61677 13.4393C6.75725 13.5786 6.86868 13.744 6.94471 13.926C7.02074 14.108 7.05987 14.303 7.05987 14.5C7.05987 14.697 7.02074 14.892 6.94471 15.074C6.86868 15.256 6.75725 15.4214 6.61677 15.5607C6.47629 15.6999 6.30952 15.8104 6.12597 15.8858C5.94243 15.9612 5.74571 16 5.54704 16C5.34837 16 5.15165 15.9612 4.9681 15.8858C4.78456 15.8104 4.61779 15.6999 4.47731 15.5607C4.33683 15.4214 4.22539 15.256 4.14937 15.074C4.07334 14.892 4.03421 14.697 4.03421 14.5ZM14.624 13C15.0252 13 15.41 13.158 15.6937 13.4393C15.9775 13.7206 16.1368 14.1022 16.1368 14.5C16.1368 14.8978 15.9775 15.2794 15.6937 15.5607C15.41 15.842 15.0252 16 14.624 16C14.2228 16 13.838 15.842 13.5543 15.5607C13.2706 15.2794 13.1112 14.8978 13.1112 14.5C13.1112 14.1022 13.2706 13.7206 13.5543 13.4393C13.838 13.158 14.2228 13 14.624 13Z'
        fill='black'
      />
    </svg>
  )
}

export function TrashIcon (props: SVGProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M3 6h18' />
      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
    </svg>
  )
}