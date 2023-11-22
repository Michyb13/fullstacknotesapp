import { useContext } from "react";
import { NoteContext } from "../context/NoteContextProvider";

const useNoteContext = () => {
  const noteContext = useContext(NoteContext);

  if (!noteContext) {
    throw new Error("useNoteContext must be used within a NoteContextProvider");
  }

  return noteContext;
};

export default useNoteContext;
