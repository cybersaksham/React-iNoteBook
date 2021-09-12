import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const HOST = "http://localhost:5000/api/notes";
  const AUTH_TOKEN = JSON.parse(localStorage.getItem("token"));

  const [notes, setNotes] = useState([]);
  const history = useHistory();

  const checkRequest = useRequest();

  // Fetching Notes
  const fetchNotes = async () => {
    if (AUTH_TOKEN) {
      const response = await fetch(HOST, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": AUTH_TOKEN,
        },
      });
      const json = await response.json();
      setNotes(json);
    } else {
      history.push("/login");
    }
  };

  // Adding New Note
  const addNote = async ({ title, description, tag }) => {
    const response = await fetch(HOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
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
        "auth-token": AUTH_TOKEN,
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
        "auth-token": AUTH_TOKEN,
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

  // Deleting All Notes
  const dltAll = async () => {
    const response = await fetch(HOST + "/dltAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": AUTH_TOKEN,
      },
    });
    const json = await response.json();
    checkRequest(response.status, json.error, "All Notes Deleted", () =>
      setNotes(json.notes)
    );
  };

  return (
    <NoteContext.Provider
      value={{ notes, fetchNotes, addNote, editNote, dltNote, dltAll }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
