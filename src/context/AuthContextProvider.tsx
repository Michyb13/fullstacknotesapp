import { createContext, useReducer, Dispatch, useEffect } from "react";
import { ContextProps } from "./NoteContextProvider";

type User = {
  user: string;
  token: string;
};

type AuthState = {
  user: User;
};

type AuthAction = { type: "Log In"; payload: User } | { type: "Log Out" };

export const AuthContext = createContext<AuthContextType | null>(null);
type AuthContextType = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

const initialState: AuthState = {
  user: { user: "", token: "" },
};

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "Log In":
      return {
        ...state,
        user: action.payload,
      };
    case "Log Out":
      return {
        ...state,
        user: { user: "", token: "" },
      };
    default:
      return state;
  }
};

const AuthContextProvider = (props: ContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "Log In", payload: JSON.parse(user) });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
