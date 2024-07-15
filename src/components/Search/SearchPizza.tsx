import axios from 'axios';
import { useEffect, useState } from 'react'
import type { Pizza } from '../../types/PizzaType';
import { useMenuStore } from '../../hooks/useMenuStore';

function SearchFormPizza() {
  const [nameList, setNameList] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { filter, setFilter, setName } = useMenuStore()

  useEffect(() => {
    axios.get('api/pizza/ingredients').then(res => setIngredients(res.data?.map((i: { id: string, name: string }) => i.name)));
    axios.get('api/pizza?perPage=50').then(res => setNameList(res.data?.map((p: Pizza) => p.name)));
  }, [])

  return (
    <form className='flex gap-4 mt-14'>
      <label htmlFor='pizza-ingredient-list' className=' sr-only'>Choose a flavor:</label>
      <input
        list={filter === 'ingredients' ? 'pizza-ingredients' : 'pizza-names'}
        id='pizza-ingredient-list'
        name='pizza-ingredient-list'
        placeholder='Search...'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
        className='py-2 px-4 rounded-xl bg-[#dddace] text-neutral-400 min-w-80 min-h-10'
      />
      <datalist id='pizza-ingredients'>
        {
          ingredients[0] && ingredients.map((ingredient: string) => (
            <option key={ingredient}>{ingredient}</option>
          ))
        }
      </datalist>
      <datalist id='pizza-names'>
        {
          nameList[0] && nameList.map((pizzaName: string) => (
            <option key={pizzaName}>{pizzaName}</option>
          ))
        }
      </datalist>
      <select
        required
        id='filter-type'
        name='filter-type'
        className='p-2 rounded-xl bg-[#dddace] text-neutral-400'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.currentTarget.value)}
      >
        <option value='name'>Name</option>
        <option value='ingredients'>Ingredients</option>
      </select>
    </form>
  )
}

export default SearchFormPizza
