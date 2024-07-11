function LoadingArticle ({error} : {error?: string}) {
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

export default LoadingArticle
