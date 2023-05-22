import axios from "@contexts/AxiosContext";
import { ShoppingCart } from "@utils/types";

// Add to product to shoppingCart handler
export const addToShoppingCartHandler = async (data: ShoppingCart) => {
  const response = await axios.post("add-to-shoppingCart", data);
  return response.data;
};

// Increase product quantity in shoppingCart handler
export const increaseProductHandler = async (data: ShoppingCart) => {
  const response = await axios.post("increase-product", data);
  return response.data;
};

// Decrease product quantity in shoppingCart handler
export const decreaseProductHandler = async (data: ShoppingCart) => {
  const response = await axios.post("decrease-product", data);
  return response.data;
};

// Remove product from shoppingCart handler
export const removeProductHandler = async (data: ShoppingCart) => {
  const response = await axios.post("remove-product", data);
  return response.data;
};

// Checkout api handler
export const checkoutHandler = async () => {
  const response = await axios.post("checkout");
  return response.data;
};
