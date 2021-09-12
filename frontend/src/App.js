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
import Login from "./Components/Login";

function App() {
  return (
    <AlertState>
      <NoteState>
        <ModalState>
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
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </Router>
        </ModalState>
      </NoteState>
    </AlertState>
  );
}

export default App;
