import { ShoppingCart } from "@utils/types";
import { useReducer, useContext, createContext, Dispatch } from "react";

export enum ShoppingCartActionTypes {
  DROP = "DROP",
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  REMOVE = "REMOVE",
}

type ShoppingCartAction = {
  type: ShoppingCartActionTypes;
  payload: any;
};

type ShoppingCartState = {
  shoppingCartItems: ShoppingCart[];
};

type Props = {
  children: React.ReactNode;
};

type ShoppingCartContextType = {
  state: ShoppingCartState;
  dispatch: Dispatch<ShoppingCartAction>;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | null>(null);

const intialState = {
  shoppingCartItems: [],
};

// Creating a reducer to handle different for action: DROP | INCREASE | DECREASE | REMOVE
const reducer = (state: ShoppingCartState, action: ShoppingCartAction) => {
  switch (action.type) {
    case ShoppingCartActionTypes.DROP:
      const item = action.payload;

      // Check if product already exist in the shoppingCart
      const existingItem = state.shoppingCartItems.find(
        (shoppingCartItem: ShoppingCart) => shoppingCartItem.id === item.id
      );

      // If it already exist in the shoppingCart increment the quantity by one
      if (existingItem) {
        const updatedItems = state.shoppingCartItems.map(
          (shoppingCartItem: ShoppingCart) => {
            if (shoppingCartItem.id === item.id) {
              return {
                ...shoppingCartItem,
                quantity: shoppingCartItem.quantity + 1,
              };
            }
            return shoppingCartItem;
          }
        );

        return { ...state, shoppingCartItems: updatedItems };
      }
      // If it the product doesnt exist append it to the shoppingCart with quanitiy 1
      else {
        const newItem = { ...item, quantity: 1 };

        return {
          ...state,
          shoppingCartItems: [...state.shoppingCartItems, newItem],
        };
      }

    case ShoppingCartActionTypes.INCREASE:
      // find the product in the shoppingCart and increment it by one
      const increasedShoppingCartItems = state.shoppingCartItems?.map(
        (shoppingCartItem) => {
          if (shoppingCartItem.id === action.payload.id) {
            return {
              ...shoppingCartItem,
              quantity: shoppingCartItem.quantity + 1,
            };
          }

          return shoppingCartItem;
        }
      );
      return { ...state, shoppingCartItems: increasedShoppingCartItems };

    case ShoppingCartActionTypes.DECREASE:
      // Find the product in the shoppingCart and decrement it by one and make sure it's never 0
      const decreasedShoppingCartItems = state.shoppingCartItems.map(
        (shoppingCartItem) => {
          if (shoppingCartItem.id === action.payload.id) {
            const newQuantity = Math.max(1, shoppingCartItem.quantity - 1);
            return { ...shoppingCartItem, quantity: newQuantity };
          }
          return shoppingCartItem;
        }
      );

      return { ...state, shoppingCartItems: decreasedShoppingCartItems };

    case ShoppingCartActionTypes.REMOVE:
      // Use filter to exclude the found product from the shoppingCart
      const updatedItems = state.shoppingCartItems.filter(
        (shoppingCartItem) => shoppingCartItem.id !== action.payload.id
      );

      return { ...state, shoppingCartItems: updatedItems };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const ShoppingCartProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <ShoppingCartContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () =>
  useContext(ShoppingCartContext) as ShoppingCartContextType;
