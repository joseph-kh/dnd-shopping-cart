type Props = {};

const EmptyShoppingCart: React.FC<Props> = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Your shopping cart is empty
      </h1>
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">
        Drag a product from the left side!
      </h1>

      <img className="h-48 rounded-t-lg object-cover" src="shopping-cart.png" />
    </div>
  );
};

export default EmptyShoppingCart;
