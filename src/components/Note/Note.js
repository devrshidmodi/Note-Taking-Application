import React, { useRef } from 'react';
import classes from './Note.module.css'
import { Rnd } from 'react-rnd'
import CloseButton from '../UI/Button/CloseButton/CloseButton'
import PropTypes from 'prop-types'

import { ReactComponent as Resize } from '../../assets/resize.svg'

const Note = ({color, zIndex, updateZ, text, changed, deleted}) => {

    const textRef = useRef(null)
    const enableResize = {
        bottom: true,
        bottomLeft: false,
        bottomRight: true,
        left: false,
        right: true,
        top: false,
        topLeft: false,
        topRight: false
    }

    const handleStyle = {
        bottom: { bottom: "0px" },
        right: { right: "0px" },
        bottomRight: { bottom: "0px", right: "0px", zIndex: "1" }
    }

    return (

        <Rnd default={{
            x: 200,
            y: 200,
            width: 200,
            height: 200,
            minHeight: 200,
            minWidth: 200
        }}
            className={classes.Note}
            style={{ backgroundColor: color, zIndex: zIndex }}
            onResize={(event, dir, ref) => {
                if (parseInt(ref.style.width) < 200) {
                    ref.style.width = "200px";
                }
                if (parseInt(ref.style.height) < 200) {
                    ref.style.height = "200px";
                }
            }}
            bounds="#root"
            onDragStart={updateZ}
            onClick={() => {
                textRef.current.focus()
            }}
            enableResizing={enableResize}
            resizeHandleStyles={handleStyle}
        >
            <textarea type="text" ref={textRef} value={text}
                style={{ backgroundColor: color }}
                className={classes.input}
                onChange={changed} onMouseUp={() => {
                    textRef.current.blur()
                    textRef.current.focus()
                }
                }></textarea>
            <span className={classes.closeButton}>
                <CloseButton clicked={deleted} label="Close note" title="Close note"/>
            </span>
            <Resize className={classes.resizeButton} />
        </Rnd>
    )
}

Note.propTypes = {
    color: PropTypes.string.isRequired,
    zIndex: PropTypes.number.isRequired,
    updateZ: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    deleted: PropTypes.func.isRequired,
}

export default Note;