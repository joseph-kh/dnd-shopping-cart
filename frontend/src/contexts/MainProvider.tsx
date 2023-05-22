import React from "react";
import { LoaderProvider } from "@contexts/LoaderContext";
import { AxiosProvider } from "@contexts/AxiosContext";
import { ShoppingCartProvider } from "@contexts/ShoppingCartContext";

type Props = {
  children: React.ReactNode;
};

const MainProvider: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <LoaderProvider>
      <AxiosProvider>
        <ShoppingCartProvider>{children}</ShoppingCartProvider>
      </AxiosProvider>
    </LoaderProvider>
  );
};

export default MainProvider;
