import { createContext } from "react";

const ctx = createContext({} as { 
  theme: boolean;
  setTheme: (t: boolean) => void;
});

export default ctx;