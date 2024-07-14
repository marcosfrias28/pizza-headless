import { MenuStore } from "../stores/MenuStore";
import type { MenuStoreTypes } from "../types/MenuTypes";

export const useMenuStore = () => {
    const data = MenuStore((state: MenuStoreTypes) => state.data);
    const setData = MenuStore((state: MenuStoreTypes) => state.setData);
    const filter = MenuStore((state: MenuStoreTypes) => state.filter);
    const setFilter = MenuStore((state: MenuStoreTypes) => state.setFilter);
    const name = MenuStore((state: MenuStoreTypes) => state.name);
    const setName = MenuStore((state: MenuStoreTypes) => state.setName);

    return { data, setData, filter, setFilter, name, setName };
};