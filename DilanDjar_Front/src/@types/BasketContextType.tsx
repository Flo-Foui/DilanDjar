import {PlantType} from "./PlantType";

interface BasketContextType {
    basket: PlantType[];
    addToBasket: (product: PlantType) => void;
    removeFromBasket: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearBasket: () => void;
}