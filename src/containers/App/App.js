import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";

import Layout from "../../components/Layout/Layout";
import BulletinBoard from "../../components/BulletinBoard/BulletinBoard";
import NoteContext from "../../context/NoteContext";
import Modal from "../../components/UI/Modal/Modal";
import Authentication from "../../components/UI/Authentication/Authentication";
import ChooseColor from "../../components/UI/ChooseColor/ChooseColor";

const COLOR_OPTIONS = ["yellow", "#ff7eb9", "#7afcff", "#ADFF2F", "#fbad4b"];

class App extends Component {
  state = {
    currentColor: COLOR_OPTIONS[0],
    currentID: 1,
    currentZIndex: 0,
    notes: [],
    modalState: 0, //0 nothing, 1 login, 2 registration, 3 color chooser,
    isAuthenticated: false,
  };

  addNewNote = () => {
    let notes = [...this.state.notes];
    notes.push({
      color: this.state.currentColor,
      text: "",
      iden: this.state.currentID,
      zIndex: this.state.currentZIndex,
    });
    this.setState((prevState) => {
      return {
        notes: notes,
        currentID: prevState.currentID + 1,
        currentZIndex: prevState.currentZIndex + 1,
      };
    });
  };

  deleteNote = (index) => {
    let notes = [...this.state.notes];
    notes.splice(index, 1);
    this.setState({ notes: notes });
  };

  updateZIndex = (index) => {
    let notes = [...this.state.notes];
    let note = notes[index];
    note.zIndex = this.state.currentZIndex;
    let newZIndex = this.state.currentZIndex + 1;
    this.setState({ notes: notes, currentZIndex: newZIndex });
  };

  updateText = (event, index) => {
    let notes = [...this.state.notes];
    let note = notes[index];
    note.text = event.target.value;
    this.setState({ notes: notes });
  };

  changeColor = (color) => {
    this.setState({ currentColor: color });
  };

  updateModalState = (newState) => {
    this.setState({ modalState: newState });
  };

  authenticate = () => {
    this.setState({ isAuthenticated: true });
  };

  updateNotes = (notes) => {
    const id_notes = _.map(notes, (note, index) => {
      return { ...note, iden: index + 1, zIndex: index };
    });

    this.setState({
      notes: id_notes,
      currentID: id_notes.length + 1,
      currentZIndex: id_notes.length,
    });
  };

  modalSelector = () => {
    const authentication_options = {
      authenticate: this.authenticate,
      updateModal: this.updateModalState,
    };
    switch (this.state.modalState) {
      case 1:
        return (
          <Authentication {...authentication_options} updateNotes={this.updateNotes} login={true} />
        );
      case 2:
        return (
          <Authentication {...authentication_options} notes={this.state.notes} login={false}/>
        );
      case 3:
        return (
          <ChooseColor
            currentColor={this.state.currentColor}
            colorOptions={COLOR_OPTIONS}
          />
        );
      default:
        return null;
    }
  };

  componentDidMount() {
    axios
      .post("/login", null, { withCredentials: true })
      .then((res) => {
        this.updateNotes(res.data);
        this.authenticate();
      })
      .catch((err) => {
        return;
      });
  }

  render() {
    const modalOutput = this.modalSelector();

    return (
      <NoteContext.Provider
        value={{
          addNote: this.addNewNote,
          changeColor: this.changeColor,
          zIndex: this.state.currentZIndex,
          updateZIndex: this.updateZIndex,
          updateModal: this.updateModalState,
          isAuthenticated: this.state.isAuthenticated,
          notes: this.state.notes,
        }}
      >
        <Layout>
          <Modal
            show={this.state.modalState}
            style={{ zIndex: this.state.currentZIndex + 100 }}
            updateModal={this.updateModalState}
          >
            {modalOutput}
          </Modal>
          <BulletinBoard
            notes={this.state.notes}
            deleted={this.deleteNote}
            resize={this.resizeNote}
            changed={this.updateText}
            updateZ={this.updateZIndex}
          />
        </Layout>
      </NoteContext.Provider>
    );
  }
}

export default App;
