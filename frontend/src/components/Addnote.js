import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import { useState } from "react";

const Addnote = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
      
    })
    props.showAlert("Added successfully","success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2 className="text-center" style={{color:"#a6a6a6"}}>Add a Note</h2>
      <form className="my-3">
        <div className="form-group my-3">
          <label htmlFor="title"><h3 style={{color:"#000000"}}>Title</h3></label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onchange}
            name="title"
            minLength={5}
            required
            value={note.title}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="description"><h3 style={{color:"#000000"}}>Description</h3></label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter Description "
            name="description"
            onChange={onchange}
            minLength={5}
            required
            value={note.description}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="tag"><h3 style={{color:"#000000"}}>Tag</h3></label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Enter Tag "
            name="tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={handleclick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
