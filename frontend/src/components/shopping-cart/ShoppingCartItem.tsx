import { ShoppingCart as ShoppingCartProps } from "@utils/types";
import { RemoveIcon } from "@components/icons";
import { useLoader } from "@contexts/LoaderContext";
import { useSWRConfig } from "swr";
import {
  decreaseProductHandler,
  increaseProductHandler,
  removeProductHandler,
} from "@services/services";

// In case we are using the react useReducer to dispatch and mangage local state
// import { ShoppingCartActionTypes, useShoppingCart } from "@contexts/ShoppingCartContext";

type Props = {
  shoppingCartItem: ShoppingCartProps;
};

const ShoppingCartItem: React.FC<Props> = ({ shoppingCartItem }) => {
  const { name, quantity, is_sale, price, discounted_price, currency, image } =
    shoppingCartItem;

  // const { dispatch, state } = useShoppingCart();

  const { mutate } = useSWRConfig();
  const { setIsShoppingCartLoading } = useLoader();

  const onIncreaseClick = async () => {
    // dispatch({ type: ShoppingCartActionTypes.INCREASE, payload: shoppingCartItem });
    setIsShoppingCartLoading(true);
    try {
      await increaseProductHandler(shoppingCartItem);
      await mutate("shoppingCart");
    } finally {
      setIsShoppingCartLoading(false);
    }
  };

  const onDecreaseClick = async () => {
    // dispatch({ type: ShoppingCartActionTypes.DECREASE, payload: shoppingCartItem });
    setIsShoppingCartLoading(true);
    try {
      await decreaseProductHandler(shoppingCartItem);
      await mutate("shoppingCart");
    } finally {
      setIsShoppingCartLoading(false);
    }
  };

  const onRemoveClick = async () => {
    // dispatch({ type: ShoppingCartActionTypes.REMOVE, payload: shoppingCartItem });
    setIsShoppingCartLoading(true);
    try {
      await removeProductHandler(shoppingCartItem);
      await mutate("shoppingCart");
    } finally {
      setIsShoppingCartLoading(false);
    }
  };

  return (
    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="shrink-0">
        <img
          className="h-24 w-24 max-w-full rounded-lg object-cover"
          src={image}
          alt="#"
        />
      </div>

      <div className="relative flex flex-1 items-center ">
        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
          <div className="pr-8 sm:pr-5">
            <p className="text-base font-semibold text-gray-900">{name}</p>
          </div>

          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
              {`${currency} ${is_sale ? discounted_price : price}`}
            </p>

            <div className="sm:order-1">
              <div className="mx-auto flex h-8 items-stretch text-gray-600">
                <button
                  onClick={onDecreaseClick}
                  className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  -
                </button>
                <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                  {quantity}
                </div>
                <button
                  onClick={onIncreaseClick}
                  className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
          <button
            type="button"
            onClick={onRemoveClick}
            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShoppingCartItem;
