import React, { useContext } from "react";
import ModalContext from "../Context/Modal/ModalContext";

const NoteForm = () => {
  // Contexts
  const { modal, setModal } = useContext(ModalContext);

  // Changing input values
  const handleChange = (e) => {
    const copyModal = { ...modal };
    copyModal.note[e.target.name] = e.target.value;
    setModal(copyModal);
  };

  return (
    <div
      className="modal fade"
      id="formModal"
      tabIndex="-1"
      aria-labelledby="formModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="formModalLabel">
              {modal.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  value={modal.note.title}
                  onChange={handleChange}
                  className="form-control"
                  id="title"
                  name="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  value={modal.note.description}
                  onChange={handleChange}
                  className="form-control"
                  id="description"
                  name="description"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">
                  Tag
                </label>
                <input
                  type="text"
                  value={modal.note.tag}
                  onChange={handleChange}
                  className="form-control"
                  id="tag"
                  name="tag"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={() => modal.saveClick(modal.note)}
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              {modal.saveBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
