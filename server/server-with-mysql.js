import { createApp } from "./app.js";
import { PizzaModel } from "./models/mysql/pizza.js";
import { UserModel } from "./models/mysql/user.model.js";

createApp({pizzaModel: PizzaModel, userModel: UserModel})