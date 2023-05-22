type Props = {};

const Error: React.FC<Props> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 28 28"
    width={48}
    height={48}
    {...props}
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 8h.01M6 16h.01M6 12h12a4 4 0 0 0 0-8H6a4 4 0 1 0 0 8Zm0 0a4 4 0 0 0 0 8h8M17 16l5 5m0-5-5 5"
    />
  </svg>
);
export default Error;
