import "bootstrap-icons/font/bootstrap-icons.css";
import { useContext } from "react";
import NoteContext from "../Context/Note/NoteContext";
import ModalContext from "../Context/Modal/ModalContext";

const NoteItem = (props) => {
  // Props
  const { note } = props;

  // Contexts
  const { editNote, dltNote } = useContext(NoteContext);
  const { modal, setModal } = useContext(ModalContext);

  // Function to handle Save Note button in modal
  const handleEdit = (note_) => {
    editNote(note_._id, {
      title: note_.title,
      description: note_.description,
      tag: note_.tag,
    });
  };

  // Function to handle edit icon
  const handleEditClick = () => {
    const copyModal = JSON.parse(JSON.stringify(modal));
    copyModal.title = "Edit Note";
    copyModal.saveBtn = "Save Note";
    copyModal.saveClick = handleEdit;
    copyModal.note = { ...note };
    setModal(copyModal);
  };

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex justify-content-end">
            <i
              className="bi bi-pen text-primary mx-2"
              data-bs-toggle="modal"
              data-bs-target="#formModal"
              onClick={handleEditClick}
            ></i>
            <i
              onClick={() => dltNote(note._id)}
              className="bi bi-trash-fill text-danger mx-2"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
