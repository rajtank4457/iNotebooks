import React, { useState } from "react";
import NoteContext from "./NoteContext";
// eslint-disable-next-line
import { json } from "react-router-dom";

const NoteState = (props) => {
   //const host = "http://localhost:5000";
   const host = "https://inotebook-6pk4.onrender.com"
  const notesIntital = [];

  const [notes, setnotes] = useState(notesIntital);

  //Fetch Notes
  const getNote = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    
    setnotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    //TOdo :API call
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));

    
    
  };

  //delete a Note
  const deleteNote = async (id) => {
    //:API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = response.json();
    

    
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      // eslint-disable-next-line
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = response.json();

    // eslint-disable-next-line
    let newNotes = JSON.parse(JSON.stringify(notes));

    //LOgic to edit client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
