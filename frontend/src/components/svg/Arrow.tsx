type Props = {};

const Arrow: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    height={24}
    width={24}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m13 7 5 5m0 0-5 5m5-5H6"
    />
  </svg>
);
export default Arrow;
