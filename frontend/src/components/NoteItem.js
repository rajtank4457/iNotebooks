import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updateNote } = props;

  // Define keyframes animation for the card outline
  const keyframesAnimation = `
    @keyframes outline {
      0% {
        outline: 2px solid #ffffff; /* Start with white outline */
      }
      50% {
        outline: 2px solid #ff0000; /* Midpoint with red outline */
      }
      100% {
        outline: 2px solid #ffffff; /* End with white outline */
      }
    }
  `;

  // Define inline styles for the card
  const cardStyle = {
    // Add your card styles here
    margin: "10px",
    backgroundColor: "#343a40",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "5px",
    padding: "10px",
    position: "relative",
    animation: "outline 2s infinite",
    // Apply keyframes animation
    WebkitAnimation: "outline 2s infinite", // For Safari
    MozAnimation: "outline 2s infinite", // For Firefox
  };

  return (
    <div className="col-md-3 ">
      <div className="card my-3 bg-dark text-white" style={cardStyle}>
        {/* Apply inline style */}
        <style>{keyframesAnimation}</style> {/* Apply keyframes animation */}
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h4 className="card-title ">{note.title}</h4>
          </div>
          <h6 className="card-text">{note.description}</h6>
          <p className="card-text">{note.tag}</p>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
