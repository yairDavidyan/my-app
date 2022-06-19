import { createContext } from "react";
import { ProductContextType } from "../interfaces/product";

export default createContext<Partial<ProductContextType>>({});
