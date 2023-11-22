import Note from "../components/Note";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useNoteContext from "../hooks/useNoteContext";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useNoteContext();
  const { state: AuthState } = useAuthContext();
  const { data } = useFetch(
    "http://localhost:3500/notes",
    AuthState.user.token
  );

  useEffect(() => {
    if (!AuthState.user.user || !AuthState.user.token) {
      navigate("/login");
    }
  }, [AuthState.user.user, AuthState.user.token, navigate]);

  useEffect(() => {
    dispatch({ type: "set notes", payload: data });
  }, [dispatch, data]);

  const render = state.notes.map((note) => {
    return (
      <Note
        key={note._id}
        _id={note._id}
        title={note.title}
        content={note.content}
        createdAt={note.createdAt}
        updatedAt={note.updatedAt}
      />
    );
  });

  return (
    <div className="notes">
      <button className="add-btn">
        <FaPlus />
        <NavLink to="/notes/add">New Note</NavLink>
      </button>
      {state.notes.length !== 0 ? (
        <div className="note-container">{render}</div>
      ) : (
        <h1 className="no-notes">No Notes Added</h1>
      )}
    </div>
  );
};

export default Dashboard;
