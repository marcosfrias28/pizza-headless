import type { Pizza } from "../types/PizzaType.js";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";


const queryClient = new QueryClient();

export function HeroCards() {
  return (
    <QueryClientProvider client={queryClient}>
      <Cards />
    </QueryClientProvider>
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
      const res = await axios.get(`https://pizza-api.up.railway.app/pizza`);
      const data = await res.data;
      return data;
    },
  });

  return (
    <section
      id="cards"
      className="w-full min-h-72 gap-6 mx-auto mt-14 flex flex-col md:flex-row flex-wrap justify-center items-center"
    >
      {isPending && (
        <div className=" border-t-8 border-b-8 rounded-full animate-spin border-yellow-600 h-72 w-72 "></div>
      )}
      {error && <div className="text-red-500 text-2xl">Error</div>}
      {!isPending && pizzas &&
        pizzas.map((pizza: Pizza, i: number) => {
          if (i > 3) return;
          return (
            <article
              key={pizza.id}
              style={{ viewTransitionName: `ariticle-${i}` }}
              id={pizza.id}
              className="relative flex flex-col w-[315px] h-[332px] bg-white/70 rounded-xl backdrop-blur-lg shadow-black/25 shadow-lg overflow-hidden pb-7"
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
