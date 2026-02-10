import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useUser должен использоваться внутри UserProvider");
  return context;
};
