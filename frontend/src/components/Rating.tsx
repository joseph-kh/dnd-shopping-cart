import { StarIcon } from "@components/icons";

type Props = {
  rate: 1 | 2 | 3 | 4 | 5;
};

const Rating: React.FC<Props> = ({ rate }) => {
  const stars = Array.from({ length: rate }, (_, index) => (
    <StarIcon key={index} />
  ));

  return (
    <div className="mt-2.5 mb-5 flex items-center">
      <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
        {rate.toFixed(1)}
      </span>
      <div className="flex">{stars}</div>
    </div>
  );
};

export default Rating;
