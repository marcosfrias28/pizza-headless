import { createConnection, createPool } from "mysql2/promise";
import MYSQL_CONFIG from "../../config/sql.config";
import type { Pizza } from "../../../../types/PizzaType";

const connection = createPool({
  ...MYSQL_CONFIG as any,
});

type id = { id: string | undefined };

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

    const [count] = (await connection.query(
      "SELECT COUNT(*) as count FROM Pizza"
    )) as any[];
    const pizzaCount = count[0]["count"];
    const totalPages = Math.ceil(pizzaCount / (perPage || limit));
    if (page < totalPages) {
      try {
        const [pizza]: any[] = await connection.query(
          "SELECT BIN_TO_UUID(id) id, name, price, cover FROM Pizza ORDER BY name LIMIT ? OFFSET ?;",
          [limit, offset]
        );
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
    const [allNames] = await connection.query("SELECT name FROM Pizza");
    return allNames;
  }
  static async getById({ id }: id) {
    try {
      const [pizzaById] = (await connection.query(
        "SELECT BIN_TO_UUID(id) id, name, price, cover FROM Pizza WHERE ID = UUID_TO_BIN(?)",
        [id]
      )) as any[];
      if (pizzaById.lemght === 0) return { error: "Pizza not found" };
      return pizzaById[0];
    } catch {
      return { error: "Pizza not found" };
    }
  }
  static async create({ name, price, cover, ingredients }: Pizza) {
    const id = crypto.randomUUID();
    try {
      await connection.query(
        "INSERT INTO Pizza (id, name, price, cover) VALUES (UUID_TO_BIN(?), ?, ?, ?)",
        [id, name, price, cover]
      );
    } catch {
      return { error: "Something went wrong creating the pizza" };
    }
    try {
      ingredients.forEach(async (ingredient) => {
        const [result] = (await connection.query(
          "SELECT id FROM Ingredient WHERE name = ?",
          [ingredient]
        )) as any[];
        const ingredient_id = result[0]?.id;
        if (ingredient_id) {
          console.log(ingredient_id);
          await connection.query(
            "INSERT INTO PizzaIngredient (pizza_id, ingredient_id) VALUES (UUID_TO_BIN(?), ?)",
            [id, ingredient_id]
          );
        } else {
          const [result] = (await connection.query(
            "INSERT INTO Ingredient (name) VALUES (?)",
            [ingredient]
          )) as any[];
          const ingredient_id = result[0]?.insertId;
          await connection.query(
            "INSERT INTO PizzaIngredient (pizza_id, ingredient_id) VALUES (UUID_TO_BIN(?), ?)",
            [id, ingredient_id]
          );
        }
      });
    } catch (error) {
      return { error: "Something went wrong handling the ingredients" };
    }
    return {
      success: "Pizza, Ingredients, and PizzaIngredients created successfully",
    };
  }
  static async delete({ id }: id) {
    try {
      await connection.query("DELETE FROM Pizza WHERE ID = UUID_TO_BIN(?)", [
        id,
      ]);
      return { success: "Pizza deleted" };
    } catch {
      return { error: "Pizza not found" };
    }
  }
  static async update({ id, input }: { id: id; input: any }) {}
}
