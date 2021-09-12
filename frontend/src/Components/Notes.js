import { useContext, useEffect } from "react";
import NoteContext from "../Context/Note/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  // Contexts
  const { notes, fetchNotes } = useContext(NoteContext);

  // Fetching initially
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      {notes.map((note) => (
        <NoteItem note={note} key={note._id} />
      ))}
    </div>
  );
};

export default Notes;
