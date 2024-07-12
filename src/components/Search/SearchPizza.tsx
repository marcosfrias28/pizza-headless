import axios from 'axios';
import { useEffect, useState, type SetStateAction } from 'react'
import type { string } from 'zod';
import type { Pizza } from '../../types/PizzaType';

function SearchFormPizza () {
  const [filter, setFilter] = useState(null)
  // const [name, setName] = useState('Name')
  const [nameList, setNameList] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);

  useEffect(() => {
    axios.get('api/pizza/ingredients').then(res => setIngredients(res.data?.map((i : {id: string, name: string}) => i.name)));
    axios.get('api/pizza?perPage=50').then(res => setNameList(res.data?.map((p : Pizza) => p.name)));
  }, [])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e.currentTarget.children[0])
  }

  return (
    <form onSubmit={handleSubmit} method='GET' className='flex gap-4 mt-14'>
      <label htmlFor='pizza-ingredient-list' className=' sr-only'>Choose a flavor:</label>
      <input
        list={filter === 'Ingredients' ? 'pizza-ingredients' : 'pizza-names'}
        id='pizza-ingredient-list'
        name='pizza-ingredient-list'
        placeholder='Search...'
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
                    nameList && nameList.map((pizzaName: string) => (
                      <option key={pizzaName}>{pizzaName}</option>
                    ))
                }
      </datalist>
      <select
        required
        id='filter-type'
        className='p-2 rounded-xl bg-[#dddace] text-neutral-400'
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.currentTarget.value as SetStateAction<any>)}
      >
        <option value='Name'>Name</option>
        <option value='Ingredients'>Ingredients</option>
      </select>
    </form>
  )
}

export default SearchFormPizza
