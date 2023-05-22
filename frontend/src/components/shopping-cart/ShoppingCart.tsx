import { ShoppingCart as ShoppingCartProps } from "@utils/types";
import ShoppingCartItem from "@components/shopping-cart/ShoppingCartItem";
import { ArrowIcon } from "@components/icons";
import { useLoader } from "@contexts/LoaderContext";
import { checkoutHandler } from "@services/services";
import { useSWRConfig } from "swr";
import Swal from "sweetalert2";

type Props = {
  shoppingCartItems: ShoppingCartProps[];
};

// Prefix shipping fee
const SHIPPING_FEE = 8;

const ShoppingCart: React.FC<Props> = ({ shoppingCartItems }) => {
  const { mutate } = useSWRConfig();

  const { setIsShoppingCartLoading } = useLoader();

  // onCheckoutPess handler and show alert on success
  const onCheckoutPess = async () => {
    setIsShoppingCartLoading(true);
    try {
      await checkoutHandler();
      await mutate("shoppingCart");
      Swal.fire({
        title: "Your payment was successful!",
        text: "Do you want to continue",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsShoppingCartLoading(false);
    }
  };

  // Calculate subtotal price depending if a product is on sale or not by using price or discounted_price
  const subTotalPrice = shoppingCartItems.reduce((total, product) => {
    const price = product.is_sale ? product.discounted_price : product.price;

    const productTotal = product.quantity * price;
    return total + productTotal;
  }, 0);

  const totalPrice = subTotalPrice + SHIPPING_FEE;

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Your shopping cart</h1>
      </div>

      <div className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <ul className="-my-8">
                {shoppingCartItems.map(
                  (shoppingCartItem: ShoppingCartProps) => (
                    <ShoppingCartItem
                      key={shoppingCartItem.id}
                      shoppingCartItem={shoppingCartItem}
                    />
                  )
                )}
              </ul>
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Subtotal</p>
                <p className="text-lg font-semibold text-gray-900">{`USD ${subTotalPrice}`}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Shipping</p>
                <p className="text-lg font-semibold text-gray-900">{`USD ${SHIPPING_FEE}`}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                {`USD ${totalPrice}`}
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={onCheckoutPess}
                className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
              >
                Checkout
                <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
