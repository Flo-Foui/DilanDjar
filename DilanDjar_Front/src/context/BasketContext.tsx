import {createContext, ReactNode, useContext, useReducer} from "react";

interface BasketState {
    items: { id: number; name: string; price: number; quantity: number }[];
}

type BasketAction =
    | { type: "ADD_TO_BASKET"; payload: { id: number; name: string; price: number; quantity: number } }
    | { type: "REMOVE_FROM_BASKET"; payload: { id: number } }
    | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
    | { type: "CLEAR_BASKET" };

const basketReducer = (state: BasketState, action: BasketAction): BasketState => {
    switch (action.type) {
        case "ADD_TO_BASKET":
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? {...item, quantity: item.quantity + action.payload.quantity}
                            : item
                    ),
                };
            } else {
                return {...state, items: [...state.items, action.payload]};
            }
        case "REMOVE_FROM_BASKET":
            return {...state, items: state.items.filter(item => item.id !== action.payload.id)};
        case "CLEAR_BASKET":
            return {...state, items: []};
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? {...item, quantity: action.payload.quantity}
                        : item
                )
            };
        default:
            return state;
    }
};

const BasketContext = createContext<{
    state: BasketState;
    dispatch: React.Dispatch<BasketAction>
} | undefined>(undefined);

export const BasketProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(basketReducer, {items: []});

    return (
        <BasketContext.Provider value={{state, dispatch}}>
            {children}
        </BasketContext.Provider>
    )
};

// Hook pour éviter les erreurs
export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error("useBasket doit être utilisé dans un BasketProvider");
    }
    return context;
};
