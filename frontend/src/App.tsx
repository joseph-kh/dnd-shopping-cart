import { useState } from "react";
import Product from "@components/Product";
import { useDrop } from "react-dnd";
import { useGetProducts, useGetShoppingCart } from "@services/apiHooks";
import MainContainer from "@components/containers/MainContainer";
import ProductsContainer from "@components/containers/ProductsContainer";
import ShoppingCart from "@components/shopping-cart/ShoppingCart";
import EmptyShoppingCart from "@components/shopping-cart/EmptyShoppingCart";
import ShoppingCartContainer from "@components/containers/ShoppingCartContainer";
import Loader from "@components/Loader";
import Error from "@components/Error";
import { useSWRConfig } from "swr";
import { useLoader } from "@contexts/LoaderContext";
import { addToShoppingCartHandler } from "@services/services";
import {
  Product as IProduct,
  ShoppingCart as IShoppingCart,
} from "@utils/types";

// In case we are using the react useReducer to dispatch and mangage local state
// import { ShoppingCartActionTypes, useShoppingCart } from "@contexts/ShoppingCartContext";

export enum SortTypes {
  DEFAULT = "default",
  NAME_ASC = "name_asc",
  NAME_DESC = "name_des",
  PRICE_ASC = "price_asc",
  PRICE_DESC = "price_desc",
  RATE = "rate",
}

function App() {
  // const { state, dispatch } = useShoppingCart();

  // const { shoppingCartItems } = state;

  // Define a state for sortBy select value
  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.DEFAULT);

  // mutate function used for revalidating SWR cache on submit
  const { mutate } = useSWRConfig();

  // Get products using SWR reusable hook
  const { products, isProductsLoading, isProductsError } = useGetProducts();

  // Get shoppingCart using SWR reusable hook
  const { shoppingCartItems, isShoppingCartLoading, isShoppingCartError } =
    useGetShoppingCart();

  // Change loading state on async functions
  const { setIsShoppingCartLoading } = useLoader();

  // On Selecting a sort type
  const onSortSelect = (value: SortTypes) => setSortBy(value);

  // Sort products based on the selected sort type
  const sortedProducts = (sortBy: SortTypes): Product[] => {
    switch (sortBy) {
      case SortTypes.NAME_ASC:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case SortTypes.NAME_DESC:
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      case SortTypes.RATE:
        return [...products].sort((a, b) => b.rate - a.rate);
      case SortTypes.PRICE_ASC:
        return [...products].sort((a, b) => a.price - b.price);
      case SortTypes.PRICE_DESC:
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  // Adding product to shoppingCart OnDrop
  const handleDrop = () => {
    return async (item: IShoppingCart) => {
      // dispatch({ type: ShoppingCartActionTypes.DROP, payload: item });
      setIsShoppingCartLoading(true);
      try {
        await addToShoppingCartHandler(item);
        await mutate("shoppingCart");
      } finally {
        setIsShoppingCartLoading(false);
      }
    };
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: "product",
    drop: handleDrop(),
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  // Show loader while waiting api requests to finish
  if (isProductsLoading || isShoppingCartLoading) return <Loader />;

  // Show error in case api requests failed
  if (isProductsError || isShoppingCartError) return <Error />;

  // Check if shoppingCart is empty to render conditional components
  const isShoppingCartEmpty = shoppingCartItems?.length === 0;

  return (
    <MainContainer>
      <ProductsContainer onSortSelect={onSortSelect}>
        {sortedProducts(sortBy)?.map((product: IProduct) => (
          <Product key={product.id} productItem={product} />
        ))}
      </ProductsContainer>

      <ShoppingCartContainer
        ref={dropRef}
        isOver={isOver}
        className={
          isShoppingCartEmpty ? "flex items-center justify-center" : ""
        }
      >
        {!isShoppingCartEmpty ? (
          <ShoppingCart shoppingCartItems={shoppingCartItems} />
        ) : (
          <EmptyShoppingCart />
        )}
      </ShoppingCartContainer>
    </MainContainer>
  );
}

export default App;
