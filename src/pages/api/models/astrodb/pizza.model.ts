import { createConnection, createPool } from "mysql2/promise";
import type { Pizza } from "../../../../types/PizzaType";
import { db, column, Pizza as PizzaTable, PizzaIngredient, eq, count as Counter } from "astro:db";

type id = { id: string};

interface PizzaParams {
  name: string | undefined;
  ingredients: string | undefined;
  page: number;
  perPage: number | undefined;
}

export class PizzaModel {
  static async getAllPizzas({ page, perPage, name, ingredients }: PizzaParams) {
    let limit = 12;
    let offset = 0;

    //Calculate limit and offset
    perPage ? limit = perPage : limit; // if perPage is defined, limit = perPage, else limit = 12
    page ? page = page : page = 0; // if page is defined, page = page, else page = 0
    offset = page * limit;
    //-------------------------
    const pizzaCount = await db.select({
      count: Counter(),
    }).from(PizzaTable);

    const totalPages = Math.ceil(Number(pizzaCount) / (perPage || limit));
    if (page < totalPages) {
      try {
        const pizza = await db.select({
          id: PizzaTable.id,
          name: PizzaTable.name,
          price: PizzaTable.price,
          cover: PizzaTable.cover,
        }).from(PizzaTable).orderBy(PizzaTable.name).limit(limit).offset(offset);

        if (name) {
          const pizzaName = pizza.filter((p: any) =>
            p.name.toLowerCase().includes(name.toLowerCase())
          );
          return pizzaName;
        }
        return {pizza, totalPages};
      } catch {
        return { error: "Something went wrong getting the pizzas" };
      }
    } else {
      return { error: "No more results" };
    }
  }
  static async getAllNames() {
    const allNames = await db.select({
      name: PizzaTable.name,
    }).from(PizzaTable);

    return allNames;
  }
  static async getById({ id }: id) {
    try {
      const pizzaById = await db.select({
        id: PizzaTable.id,
        name: PizzaTable.name,
        price: PizzaTable.price,
        cover: PizzaTable.cover,
      }).from(PizzaTable).where(eq(PizzaTable.id, id));

      if (pizzaById.length === 0) return { error: "Pizza not found" };
      return pizzaById[0];
    } catch {
      return { error: "Pizza not found" };
    }
  }
}
