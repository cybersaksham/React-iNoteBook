import React, { useState } from "react";
import ModalContext from "./ModalContext";

const ModalState = (props) => {
  const [modal, setModal] = useState({
    title: null,
    saveBtn: null,
    saveClick: null,
    note: { title: "", description: "", tag: "" },
  });

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
