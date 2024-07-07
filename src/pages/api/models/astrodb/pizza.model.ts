import type { Pizza as PizzaType } from '../../../../types/PizzaType'
import { db, eq, Pizza, count, Ingredient, PizzaIngredient } from 'astro:db'

interface id { id: string }

interface PizzaParams {
  name: string | undefined
  ingredients: string | undefined
  page: number
  perPage: number | undefined
}

export class PizzaModel {
  static async getAllPizzas ({ page, perPage, name, ingredients }: PizzaParams) {
    let limit = 12
    let offset = 0

    // Calculate limit and offset
    perPage ? (limit = perPage) : limit // if perPage is defined, limit = perPage, else limit = 12
    page ? (page = page) : (page = 0) // if page is defined, page = page, else page = 0
    offset = page * limit
    // -------------------------

    const result = await db.select({ count: count() }).from(Pizza)
    const totalResults = result[0].count
    const totalPages = Math.ceil(totalResults / (perPage || limit))
    if (page < totalPages) {
      try {
        const pizza = await db.select({
          id: Pizza.id,
          name: Pizza.name,
          price: Pizza.price,
          cover: Pizza.cover
        }).from(Pizza).orderBy(Pizza.name).limit(limit).offset(offset)

        if (name) {
          const pizzaName = pizza.filter((p: any) =>
            p.name.toLowerCase().includes(name.toLowerCase())
          )
          return pizzaName
        }
        if (ingredients) {
          const pizzaIngredients = pizza.filter((p: any) =>
            p.ingredients.toLowerCase().includes(ingredients.toLowerCase())
          )
          return pizzaIngredients
        }
        return pizza
      } catch {
        return { error: 'Something went wrong getting the pizzas' }
      }
    } else {
      return { error: 'No more results' }
    }
  }

  static async getAllNames () {
    const allNames = await db.select({ name: Pizza.name }).from(Pizza)
    return allNames
  }

  static async getById ({ id }: id) {
    try {
      const pizzaById = await db.select().from(Pizza).where(eq(Pizza.id, id))
      console.log(pizzaById)
      if (pizzaById.length === 0) return { error: 'Pizza not found' }
      return pizzaById[0]
    } catch {
      return { error: 'Pizza not found' }
    }
  }

  static async create ({ name, price, cover, ingredients }: PizzaType) {
    const id = crypto.randomUUID()
    try {
      const result = await db.select({
        name: Pizza.name
      }).from(Pizza).where(eq(Pizza.name, name))
      if (result.length > 0) return { error: 'Pizza already exists' }
      await db.insert(Pizza)
        .values({
          id,
          name,
          price,
          cover
        })
    } catch (error) {
      return { error: 'There was an error adding this pizza, try with another name.', errorSQL: error }
    }
    try {
      console.log('Entered')
      ingredients.forEach(async (ingredient) => {
        const result = await db
          .select({ id: Ingredient.id })
          .from(Ingredient)
          .where(eq(Ingredient.name, ingredient))
        console.log(result)
        if (result.length > 0) {
          const ingredient_id = result[0]?.id
          console.log(ingredient_id)
          await db.insert(PizzaIngredient).values({
            pizza_id: id,
            ingredient_id
          })
        } else {
          console.log('Entered else')
          const result = await db.insert(Ingredient).values({
            id: crypto.randomUUID(),
            name: ingredient
          })
          console.log(result)

          const ingredient_id = result.lastInsertRowid
          console.log(ingredient_id)
          await db.insert(PizzaIngredient).values({
            pizza_id: id as string,
            ingredient_id: ingredient_id as unknown as string
          })
        }
      })
    } catch (error) {
      return { error: 'Something went wrong handling the ingredients' }
    }
    return {
      success: 'Pizza, Ingredients, and PizzaIngredients created successfully'
    }
  }

  static async delete ({ id }: id) {
    try {
      await db.delete(Pizza).where(eq(Pizza.id, id))
      return { success: 'Pizza deleted' }
    } catch {
      return { error: 'Pizza not found' }
    }
  }

  static async update ({ id, input }: { id: id, input: any }) {
    console.log(id, input, 'Working on progress') // TODO: Update the pizza
    return { success: 'Pizza updated' }
  }
}
