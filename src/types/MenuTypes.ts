import type { Pizza } from "./PizzaType";

export interface MenuStoreTypes {
    data: Pizza[] | null;
    filter: string | null;
    name: string | null;
    setData: (data: Pizza[]) => void;
    setFilter: (filter: string) => void;
    setName: (name: string) => void;
}