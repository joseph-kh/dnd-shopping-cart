import { Product } from "@utils/types";
import { useDrag } from "react-dnd";
import Rating from "@components/Rating";

type Props = {
  productItem: Product;
};
const Product: React.FC<Props> = ({ productItem }) => {
  const { name, price, discounted_price, is_sale, currency, image, rate } =
    productItem;

  const [, dragRef] = useDrag({
    type: "product",
    item: { ...productItem },
  });

  return (
    <div
      ref={dragRef}
      className={`relative m-10 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md cursor-pointer`}
    >
      <img
        className="h-60 rounded-t-lg object-cover"
        src={image}
        alt="product image"
      />
      {is_sale && (
        <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
          Sale
        </span>
      )}
      <div className="mt-4 px-5 pb-5">
        <a>
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">
            {name}
          </h5>
        </a>

        <Rating rate={rate} />

        <div className="flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {`${currency} ${price} `}
            </span>

            {is_sale ? (
              <span className="text-sm text-slate-900 line-through">{`${currency} ${discounted_price}`}</span>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
