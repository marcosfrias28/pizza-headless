import type { Pizza } from "../types/PizzaType.js";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

export function HeroCards() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cards />
    </QueryClientProvider>
  );
}

function LoadingArticle() {
  return (
    <article className="relative flex flex-col animate-pulse w-[315px] h-[332px] bg-white rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7">
      <div className="h-1/2  flex-grow bg-slate-200"></div>
      <div className="mx-8 flex-grow">
        <div className="flex flex-row justify-between gap-10">
          <span className="font-semibold bg-slate-200"></span>
          <span className="font-semibold bg-slate-200"></span>
        </div>
        <div className="text-gray-500 w-full max-w-[300px] text-pretty text-ellipsis overflow-hidden text-xs"></div>
      </div>

      <button className="flex flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-slate-300 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
        <span></span>
      </button>
    </article>
  );
}

function Cards() {
  const {
    data: pizzas,
    error,
    isPending,
  } = useQuery({
    queryKey: ["pizzas"],
    queryFn: async () => {
      const res = await axios.get(`/api/pizza?page=0&perPage=4`);
      const data = await res.data;
      return data;
    },
  });

  return (
    <section
      id="cards"
      className="w-full min-h-72 gap-6 mx-auto mt-14 flex flex-col md:flex-row flex-wrap justify-center items-center"
    >
      {isPending &&
        [...Array(4)].map((_, i) => <LoadingArticle key={i}></LoadingArticle>)}
      {!isPending &&
        pizzas &&
        pizzas?.data?.map((pizza: Pizza, i: number) => {
          if (i > 3) return;
          return (
            <article
              key={pizza.id}
              id={pizza.id}
              className="relative flex flex-col w-[315px] h-[332px] bg-white/90 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7"
            >
              <div className="h-1/2  flex-grow">
                <img src={pizza.cover} alt="" className="fixed -top-1/2" />
              </div>
              <div className="mx-8 flex-grow">
                <div className="flex flex-row justify-between gap-10">
                  <>
                    <span className="text-black font-semibold">
                      {pizza.name}
                    </span>
                    <span className="text-red-500 font-semibold">
                      {pizza.price} €
                    </span>
                  </>
                </div>
                <div className="text-gray-500 w-full max-w-[300px] text-pretty text-ellipsis overflow-hidden text-xs">
                  {pizza.id}
                </div>
              </div>

              <button className="flex flex-row flex-nowrap justify-center items-center gap-2 rounded-lg px-7 py-3 mx-14 bg-bright-sun-400 text-white mt-8 font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <>
                  <span>Add to order</span>
                </>
              </button>
            </article>
          );
        })}
    </section>
  );
}

export default HeroCards;
