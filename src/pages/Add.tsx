import { ChangeEvent, useState, useEffect } from "react";
import "../styles/AddNote.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import useNoteContext from "../hooks/useNoteContext";
import useAuthContext from "../hooks/useAuthContext";

const Add = () => {
  const navigate = useNavigate();
  const { dispatch } = useNoteContext();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { state: AuthState } = useAuthContext();

  useEffect(() => {
    if (!AuthState.user.user || !AuthState.user.token) {
      navigate("/login");
    }
  }, [AuthState.user.user, AuthState.user.token, navigate]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { title, content };
    setIsLoading(true);
    try {
      const response = await axios.post(`http://localhost:3500/notes`, params, {
        headers: {
          Authorization: `Bearer ${AuthState.user.token}`,
        },
      });
      dispatch({ type: "add note", payload: response.data });
      setTitle("");
      setContent("");
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="add-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            className="title-input"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            className="content-input"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="buttons">
          <button disabled={isLoading} type="submit">
            Add
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

export default Add;
