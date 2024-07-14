import type { Pizza } from "./PizzaType";

export interface MenuStoreTypes {
    data: Pizza[] | null;
    filter: string;
    name: string;
    setData: (data: Pizza[]) => void;
    setFilter: (filter: string) => void;
    setName: (name: string) => void;
}