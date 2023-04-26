import React, { useContext } from 'react'
import classes from './Color.module.css'
import NoteContext from '../../../../context/NoteContext'
import PropTypes from 'prop-types'

const Color = ({active, color}) => {
    const noteContext = useContext(NoteContext);
    const style = active? {backgroundColor: color, border: "5px #4D90FE solid"} : {backgroundColor: color}

    return (
    <button className={classes.color} style={style} onClick={() => {
        noteContext.changeColor(color)
    }}>
    </button>)
}

Color.propTypes = {
    active: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
}

export default Color;
