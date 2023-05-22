import React, { createContext, useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

type LoaderProviderType = {
  isLoading: boolean;
  isShoppingCartLoading: boolean;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsShoppingCartLoading: (value: React.SetStateAction<boolean>) => void;
};

export const LoaderContext = createContext<LoaderProviderType | null>(null);

export const LoaderProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShoppingCartLoading, setIsShoppingCartLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        isShoppingCartLoading,
        setIsLoading,
        setIsShoppingCartLoading,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext) as LoaderProviderType;
