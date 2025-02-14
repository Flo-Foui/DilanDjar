export type BasketAction =
    | { type: "ADD_TO_BASKET"; payload: { id: number; name: string; price: number; quantity: number } }
    | { type: "REMOVE_FROM_BASKET"; payload: { id: number } }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_BASKET" };
