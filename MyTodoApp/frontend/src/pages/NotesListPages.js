import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPages = () => {
  let [notes, setNotes] = useState([]);
  // didCompounent, willCompounent
  useEffect(() => {
    getNotes();
  }, []);

  let getNotes = async () => {
    let response = await fetch("/api/notes/");
    let data = await response.json();
    console.log("DATA:", data);
    //debugger;
    setNotes(data);
  };
  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782;</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton/>
    </div>
  );
};

export default NotesListPages;
