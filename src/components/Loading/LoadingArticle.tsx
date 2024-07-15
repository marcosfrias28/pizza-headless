function LoadingArticle({ home }: { home: boolean }) {

  return (
    <main>
      <section
        id='cards'
        className='container w-full min-h-72 gap-6 mx-auto my-14 flex flex-col md:flex-row flex-wrap justify-center items-center'
      >
        {
          [...Array(home ? 4 : 12)].map((_, i) => (
            <article
              key={Math.random() * 199}
              className='relative flex flex-col items-center justify-center w-[315px] h-[332px] bg-white/90 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden'
            >
              <div className='h-1/2 relative -top-1/2' >
                <img src='/placeholder.svg' alt='Immagine del prodotto in questione' />
              </div>
              <div className='mx-4 mb-7'>
                <div className='flex flex-row flex-nowrap justify-between gap-10  animate-pulse'>
                  <span className='text-black font-semibold'>
                  </span>
                  <span className='text-red-500 font-semibold'>
                  </span>
                </div>
                <div className='text-gray-500 w-full'>
                  <p className='flex flex-wrap max-h-7 h-full gap-2 text-ellipsis text-pretty text-xs'>
                  </p>
                </div>
              </div>
              <button className='text-center rounded-lg px-7 py-3 mx-10 bg-slate-300 text-black/30 animate-pulse justify-self-end font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer'
              >
                Loading...
              </button>

            </article>
          ))
        }
      </section>
    </main>
  )
}

export default LoadingArticle
