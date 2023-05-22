import { useLoader } from "@contexts/LoaderContext";

type Props = {
  children: React.ReactNode;
};

const MainContainer: React.FC<Props> = (props) => {
  const { children } = props;
  const { isLoading } = useLoader();
  return (
    <div className={`min-h-screen flex ${isLoading ? "is-loading" : ""}`}>
      {children}
    </div>
  );
};

export default MainContainer;
