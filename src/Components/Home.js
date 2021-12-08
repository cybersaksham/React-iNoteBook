import React, { useContext } from "react";
import Notes from "./Notes";
import NoteContext from "../Context/Note/NoteContext";
import ModalContext from "../Context/Modal/ModalContext";

const Home = () => {
  // Contexts
  const { addNote, dltAll } = useContext(NoteContext);
  const { modal, setModal } = useContext(ModalContext);

  // Function to handle Add Note button in modal
  const handleAdd = (note) => addNote(note);

  // Function to handle Add Note button in home page
  const handleAddClick = () => {
    const copyModal = JSON.parse(JSON.stringify(modal));
    copyModal.title = "Add Note";
    copyModal.saveBtn = "Add Note";
    copyModal.saveClick = handleAdd;
    copyModal.note = { title: "", description: "", tag: "" };
    setModal(copyModal);
  };

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between my-2">
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#formModal"
          onClick={handleAddClick}
        >
          Add Note
        </button>
        <button onClick={dltAll} className="btn btn-danger">
          Delete All
        </button>
      </div>
      <h2>Your Notes</h2>
      <hr />
      <Notes />
    </div>
  );
};

export default Home;
