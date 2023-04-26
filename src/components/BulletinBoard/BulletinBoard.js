import React from 'react';
import classes from './BulletinBoard.module.css';
import Note from '../Note/Note'
import PropTypes from 'prop-types'

const bulletinBoard = ({notes, changed, updateZ, deleted}) => {

    const notesArray = notes.map((note, index) => {
        return <Note key={note.iden} color={note.color} text={note.text} zIndex={note.zIndex}
            deleted={() => deleted(index)} changed={(event) => changed(event, index)}
            updateZ={() => updateZ(index)}></Note>
    })

    return (
        <div className={classes.BulletinBoard}>
            {notesArray}
        </div>
    );

}

bulletinBoard.propTypes = {
    notes: PropTypes.array.isRequired,
    deleted: PropTypes.func.isRequired,
    changed: PropTypes.func.isRequired,
    updateZ: PropTypes.func.isRequired,
}

export default bulletinBoard;