import type { Pizza as PizzaType } from '../../../../types/PizzaType'
import { db, eq, Pizza, count, Ingredient, PizzaIngredient } from 'astro:db'

type id = `${string}-${string}-${string}-${string}-${string}`

interface PizzaParams {
  name: string | undefined
  ingredients: string | undefined
  page: number
  perPage: number | undefined
}

export class PizzaModel {
  static async getAllPizzas({ page, perPage, name, ingredients }: PizzaParams) {

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

  static async getAllNames() {
    const allNames = await db.select({ name: Pizza.name }).from(Pizza)
    return allNames
  }

  static async getById({ id }: { id: id }) {
    try {
      const pizzaById = await db.select().from(Pizza).where(eq(Pizza.id, id))
      if (pizzaById.length === 0) return { error: 'Pizza not found' }
      return pizzaById[0]
    } catch {
      return { error: 'Pizza not found' }
    }
  }

  static async create({ name, price, cover, ingredients }: PizzaType) {

    /*
      SOME LOGIC TO ADD PIZZA, INGREDIENTS AND PIZZAINGREDIENTS TO ASTRODB,
      AstroDB uses a SQL-like syntax to interact with the database, especificly Drizzle Query Language (DQL).

      To interact with the database, we use the db object imported from 'astro:db'
    */


    let pizza_id: id;
    try {
      //try to select pizza by name
      const result = await db.select({ id: Pizza.id }).from(Pizza).where(eq(Pizza.name, name))

      /// Check if pizza has already been added
      if (result[0]) return { error: 'Pizza already exists' }

      //Generate new id
      pizza_id = crypto.randomUUID()

      //Add pizza if it doesn't exist
      await db.insert(Pizza)
        .values({
          id: pizza_id,
          name,
          price,
          cover
        })
    } catch {
      return { error: 'Pizza not added' }
    }
    ingredients.map(async (ingredient: string) => {
      try {
        await db.insert(Ingredient).values({
          name: ingredient
        }).onConflictDoNothing()

        const [{ id: ingredient_id }] = await db.select({ id: Ingredient.id }).from(Ingredient).where(eq(Ingredient.name, ingredient))

        await db.insert(PizzaIngredient).values({
          pizza_id,
          ingredient_id
        })
      } catch {
        return { error: 'Ingredient not added' }
      }
    })
    return {
      success: 'Pizza, Ingredients, and PizzaIngredients added successfully'
    }
  }

  static async delete({ id }: { id: id }) {
    try {
      await db.delete(Pizza).where(eq(Pizza.id, id))
      return { success: 'Pizza deleted' }
    } catch {
      return { error: 'Pizza not found' }
    }
  }

  static async update({ id, input }: { id: id, input: any }) {
    console.log(id, input, 'Working on progress')
    return { success: 'Pizza updated' }
  }
}
