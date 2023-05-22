import { useLoader } from "@contexts/LoaderContext";
import { forwardRef, HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement> & {
  isOver: boolean;
};

const ShoppingCartContainer = forwardRef<HTMLDivElement, Props>(
  ({ className, children, isOver, ...props }, ref) => {
    const { isShoppingCartLoading } = useLoader();
    return (
      <section
        ref={ref}
        className={`py-12 sm:py-16 lg:py-20 flex-[0.35] ${className} ${
          isShoppingCartLoading ? "is-loading" : ""
        } ${isOver ? "bg-gray-300" : "bg-gray-100 "}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

export default ShoppingCartContainer;
