import { useEffect, useState, type SetStateAction } from 'react'
import { ingredients } from '../../utlis/ingredients'

function SearchFormPizza () {
  const [filter, setFilter] = useState(null)
  // const [name, setName] = useState('Name')
  const [nameList] = useState(undefined as any)

  useEffect(() => {
    // fetch('https://pizza-api.up.railway.app/pizza/names')
    //     .then(res => res.json())
    //     .then(data => {
    //         setNameList(data.map((n: any) => n.name));
    //     })
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
                    ingredients.map((ingredient: string) => (
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
