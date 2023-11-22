import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return authContext;
};

export default useAuthContext;
