import React from "react";
import { Link } from "react-router-dom";

type NotesProps = {
  key: string;
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  _id: string;
};

const Note = (props: NotesProps) => {
  return (
    <div className="note">
      <Link to={`/notes/${props._id}`}>
        <h1>{props.title}</h1>
        <p>{props.content}</p>
      </Link>
    </div>
  );
};

export default Note;
