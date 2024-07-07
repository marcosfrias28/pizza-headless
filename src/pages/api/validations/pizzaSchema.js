import { z } from 'zod'

const pizzaSchema = z.object({
  name: z.string(({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required'
  })),
  ingredients: z.array(z.string()).nonempty(),
  price: z.number().positive().min(4),
  cover: z.string()
})

export function validatePizza (pizza) {
  return pizzaSchema.safeParse(pizza)
}
