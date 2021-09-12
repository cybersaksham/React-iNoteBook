import React, { useState } from "react";
import useRequest from "../../Hooks/Request";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const HOST = "http://localhost:5000/api/notes";
  const DUMMY_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzg1ZWNkYWNjMzJmMWM2ZTZjZWIxIn0sImlhdCI6MTYzMDc2NzI0M30._LJqj4oG19yeT71NfIjhJ6lHapTQ36RkZHtb1G3OE5c";

  const [notes, setNotes] = useState([]);

  const checkRequest = useRequest();

  // Fetching Notes
  const fetchNotes = async () => {
    const response = await fetch(HOST, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": DUMMY_TOKEN,
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Adding New Note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": DUMMY_TOKEN,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    checkRequest(response.status, json.error, "Note Added Successfully", () =>
      setNotes(notes.concat(json))
    );
  };

  // Updating a Note
  const editNote = async (id, updated) => {
    const response = await fetch(HOST + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": DUMMY_TOKEN,
      },
      body: JSON.stringify(updated),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Note Updated Successfully",
      fetchNotes
    );
  };

  // Deleting a Note
  const dltNote = async (id) => {
    const response = await fetch(HOST + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": DUMMY_TOKEN,
      },
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Note Deleted Successfully",
      fetchNotes
    );
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchNotes, addNote, editNote, dltNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
