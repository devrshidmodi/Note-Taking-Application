import React from "react";
import classes from "./CloseButton.module.css";
import PropTypes from "prop-types";
import { ReactComponent as CloseSVG } from "../../../../assets/CloseButton.svg";

const closeButton = ({ clicked, label, title }) => (
  <button onClick={clicked} className={classes.closeButton} aria-label={label} title={title}>
    <CloseSVG className={classes.svg} />
  </button>
);

closeButton.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default closeButton;