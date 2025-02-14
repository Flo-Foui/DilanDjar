import {createContext, ReactNode, useContext, useReducer} from "react";
import {BasketState} from "../@types/BasketState";
import {BasketAction} from "../@types/BasketAction";
import {post} from "../api/api";

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
    dispatch: React.Dispatch<BasketAction>;
    checkout: (userId: number) => Promise<void>;
} | undefined>(undefined);

export const BasketProvider = ({children}: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(basketReducer, {items: []});

    const checkout = async (orderId: number) => {
        if (state.items.length === 0) return;

        const orderItems = state.items.map(item => ({
            orderId,
            productId: item.id,
            quantity: item.quantity
        }));

        // Envoyer chaque élément individuellement
        for (const item of orderItems) {
            await post("http://localhost:8080/order-items", item);
        }

        dispatch({type: "CLEAR_BASKET"});
        console.log("Order items sent:", orderItems);
    };


    return (
        <BasketContext.Provider value={{state, dispatch, checkout}}>
            {children}
        </BasketContext.Provider>
    );
};

// Hook perso pour éviter les erreurs
export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error("useBasket doit être utilisé dans un BasketProvider");
    }
    return context;
};
