import { ReactNode, createContext, useReducer, Dispatch } from "react";
import { NoteProps } from "../hooks/useFetch";

type NoteState = {
  notes: NoteProps[];
};
type NoteAction =
  | { type: "add note"; payload: NoteProps }
  | { type: "set notes"; payload: NoteProps[] }
  | { type: "edit note"; payload: NoteProps }
  | { type: "delete note"; payload: string };

export type ContextProps = {
  children: ReactNode;
};
type ContextType = {
  state: NoteState;
  dispatch: Dispatch<NoteAction>;
};

export const NoteContext = createContext<ContextType | null>(null);
const reducer = (state: NoteState, action: NoteAction) => {
  switch (action.type) {
    case "add note":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "set notes":
      return {
        ...state,
        notes: action.payload,
      };
    case "edit note":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
      };
    case "delete note":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    default:
      return state;
  }
};

const NoteContextProvider = (props: ContextProps) => {
  const initialState: NoteState = {
    notes: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
