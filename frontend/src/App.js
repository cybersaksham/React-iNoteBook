import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ModalState from "./Context/Modal/ModalState";
import NoteState from "./Context/Note/NoteState";
import NoteForm from "./Components/NoteForm";
import Alert from "./Components/Alert";
import AlertState from "./Context/Alert/AlertState";

function App() {
  return (
    <NoteState>
      <ModalState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <NoteForm />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </Router>
        </AlertState>
      </ModalState>
    </NoteState>
  );
}

export default App;
