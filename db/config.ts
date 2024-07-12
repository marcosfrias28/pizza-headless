import { defineDb, defineTable, column } from 'astro:db'

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, nullable: false }),
    name: column.text(),
    email: column.text({ unique: true, nullable: false }),
    password: column.text({ unique: true, nullable: false })
  }
})

const Pizza = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true, nullable: false }),
    name: column.text(),
    price: column.number(),
    stripe_price: column.text({default: 'price_1PbgQbBMqLLzMYdCKJZSgubM'}),
    cover: column.text(),
  }
})

const Ingredient = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true, nullable: false }),
    name: column.text({ unique: true, nullable: false })
  }
})

const PizzaIngredient = defineTable({
  columns: {
    pizza_id: column.text({ references: () => Pizza.columns.id }),
    ingredient_id: column.number({ references: () => Ingredient.columns.id })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users, Pizza, Ingredient, PizzaIngredient
  }
})
