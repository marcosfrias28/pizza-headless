import { create } from "zustand";
import type { MenuStoreTypes} from "../types/MenuTypes";

export const MenuStore = create<MenuStoreTypes>((set) => ({
    data: null,
    filter: null,
    name: null,
    setData: (data) => set(() => ({ data })),
    setFilter: (filter) => set(() => ({ filter })),
    setName: (name) => set(() => ({ name}))
}));


