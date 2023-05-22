import { SortTypes } from "@App";

type Props = {
  children: React.ReactNode;
  onSortSelect: (value: SortTypes) => void;
};

const ProductsContainer: React.FC<Props> = (props) => {
  const { children, onSortSelect } = props;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortTypes;
    onSortSelect(value);
  };

  return (
    <section className="flex-[0.65]">
      <select
        className="mt-4 ml-14 text-sm rounded-lg block p-3 bg-gray-900 color-red text-white cursor-pointer"
        onChange={onChange}
        defaultValue="none"
      >
        <option value="default">Sort By: Default</option>
        <option value="name_asc">Sort By: A to Z</option>
        <option value="name_desc">Sort By: Z to A</option>
        <option value="rate">Sort By: Review</option>
        <option value="price_asc">Sort By: Price: Ascending</option>
        <option value="price_desc">Sort By: Price: Descending</option>
      </select>
      <div className="flex flex-wrap justify-center">{children}</div>
    </section>
  );
};

export default ProductsContainer;
