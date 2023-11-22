import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/Details.css";
import { ImCross } from "react-icons/im";
import { BsFillPencilFill } from "react-icons/bs";
import useFetchOne from "../hooks/useFetchOne";
import axios from "axios";
import useNoteContext from "../hooks/useNoteContext";
import useAuthContext from "../hooks/useAuthContext";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useNoteContext();
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
      setTitle(data.title);
      setContent(data.content);
    }
  }, [data]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3500/notes/${id}`);
      dispatch({ type: "delete note", payload: response.data._id });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="details-page">
      <div>
        <label>Title</label>
        <input readOnly value={title} />
      </div>
      <div>
        <label>Content</label>
        <textarea readOnly value={content} />
      </div>
      <div className="buttons">
        <button>
          <Link to={`/notes/edit/${id}`}>
            <BsFillPencilFill className="cross-icon" />
            Edit
          </Link>
        </button>
        <button onClick={handleDelete}>
          <ImCross className="cross-icon" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default Details;
