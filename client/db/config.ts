import { defineDb, defineTable, column } from 'astro:db';

const Users = defineTable({
  columns: {
    id: column.text({primaryKey: true, unique: true, nullable: false}),
    name: column.text(),
    email: column.text({ unique: true, nullable: false}),
    password: column.text({ unique: true, nullable: false})
  }
})

const Pizza = defineTable({
  columns: {
    id: column.text({primaryKey: true, unique: true, nullable: false}),
    name: column.text(),
    price: column.number(),
    cover: column.text()
  }
})

const Ingredient = defineTable({
  columns: {
    id: column.text({primaryKey: true, unique: true, nullable: false}),
    name: column.text()
  }
})

const PizzaIngredient = defineTable({
  columns: {
    pizza_id: column.text(),
    ingredient_id: column.text()
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users, Pizza, Ingredient, PizzaIngredient
  }
});