import useSWR from "swr";
import { swrAxios } from "@contexts/AxiosContext";

const fetcher = (url: string) => swrAxios.get(url).then((res) => res.data);

// SWR hooks used for GET api for caching and revalidation

// Get products Hook
export const useGetProducts = () => {
  const { data, error } = useSWR("products", fetcher);

  return {
    products: data,
    isProductsLoading: !error && !data,
    isProductsError: error,
  };
};

// Get ShoppingCart Hook
export const useGetShoppingCart = () => {
  const { data, error } = useSWR("shoppingCart", fetcher);

  return {
    shoppingCartItems: data,
    isShoppingCartLoading: !error && !data,
    isShoppingCartError: error,
  };
};
