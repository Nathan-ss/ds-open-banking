import { createContext, ReactNode, useState } from "react";

type PropType = {
  children: ReactNode;
};

type ContextType = {
  modalState: boolean;
  setModalState: (newState: boolean) => void;
  info: Array<string>;
  setInfo: (newState: Array<string>) => void;
};

const initialValue = {
  modalState: false,
  setModalState: () => {},
  info: [],
  setInfo: () => {},
};

export const VarContext = createContext<ContextType>(initialValue);

export const Provider = ({ children }: PropType) => {
  const [modalState, setModalState] = useState(initialValue.modalState);
  const [info, setInfo] = useState(initialValue.info);

  const value = { modalState, setModalState, info, setInfo };

  return <VarContext.Provider value={value}> {children} </VarContext.Provider>;
};
