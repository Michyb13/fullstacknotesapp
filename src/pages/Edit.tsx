import { ChangeEvent, useState } from "react";
import "../styles/EditNote.css";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useFetchOne from "../hooks/useFetchOne";
import useNoteContext from "../hooks/useNoteContext";
import useAuthContext from "../hooks/useAuthContext";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useNoteContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state: AuthState } = useAuthContext();
  const { data } = useFetchOne(
    `http://localhost:3500/notes/${id}`,
    AuthState.user.token
  );

  useEffect(() => {
    if (!AuthState.user.user || !AuthState.user.token) {
      navigate("/login");
    }
  }, [AuthState.user.user, AuthState.user.token, navigate]);
  useEffect(() => {
    if (data) {
      setEditTitle(data.title);
      setEditContent(data.content);
    }
  }, [data]);

  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const handleEditTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditTitle(value);
  };
  const handleEditContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setEditContent(value);
  };

  const handleEditSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { editTitle, editContent };
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3500/notes/${id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${AuthState.user.token}`,
          },
        }
      );
      dispatch({ type: "edit note", payload: response.data });
      setEditTitle("");
      setEditContent("");
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="edit-form">
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>Edit Title</label>
          <input
            className="title-input"
            name="editTitle"
            value={editTitle}
            onChange={handleEditTitleChange}
          />
        </div>
        <div>
          <label>Edit Content</label>
          <textarea
            className="content-input"
            name="editContent"
            value={editContent}
            onChange={handleEditContentChange}
          />
        </div>
        <div className="buttons">
          <button disabled={isLoading} type="submit">
            Save
          </button>
          <button type="button">
            <NavLink to="/">Cancel</NavLink>
          </button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Edit;
