import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { createBrowserHistory } from "history";
const NotePage = () => {
  let { id } = useParams(); //let noteId = match.params.id;

  let { history } = createBrowserHistory(); //const {history}  = useNavigate();

  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if (id === "new") return;
    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  };
  let createNote = async () => {
    fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };
  let updateNote = async () => {
    if (id === "new") return;
    fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    if (id === "new") return;
    await fetch(`/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history.push("/");
  };
  let handleSubmit = () => {
    if (id !== "new" && note.body == "") {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && id !== null) {
      createNote();
    }
    history.push("/");
  };
  let handleChange = (value) => {
    setNote((note) => ({ ...note, body: value }));
    console.log("Handle Change:", note);
  };

  // ? means do not throw error if we dont have a body
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={updateNote} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
