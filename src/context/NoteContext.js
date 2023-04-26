import React from "react";

const noteContext = React.createContext({
  addNote: () => {},
  changeColor: () => {},
  updateZIndex: () => {},
  updateModal: () => {},
  zIndex: 0,
  isAuthenticated: false,
  notes: [],
});

export default noteContext;