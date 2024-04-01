import React, { useEffect, useRef } from "react";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  //const {notes, setNotes} = context;
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleclick = (e) => {
    // editNote({id:note.id,title:note.etitle,description:note.edescription,tag:note.etag})
    editNote(note.id, note.etitle, note.edescription, note.etag);

    refclose.current.click();
    props.showAlert("Updated successfully", "success");
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Update Button
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* My form  */}
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter title"
                    onChange={onchange}
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    placeholder="Enter Description "
                    name="edescription"
                    onChange={onchange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>

                <div className="form-group my-3">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    placeholder="Enter Tag "
                    name="etag"
                    onChange={onchange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                type="button"
                className="btn btn-primary"
                onClick={handleclick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="container my-3">
        <h3>{notes.length === 0 && "No notes to display "}</h3>
      </div>
      <div className="row my-3">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              showAlert={props.showAlert}
              updateNote={updateNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
