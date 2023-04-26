import React from 'react'
import classes from './Backdrop.module.css'
import PropTypes from 'prop-types'

const backdrop = ({show, style, clicked}) => (
    show===0?null:<div className={classes.backdrop} style={style}
    onClick={clicked}></div>
)

backdrop.propTypes = {
    show: PropTypes.number.isRequired,
    style: PropTypes.object,
    clicked: PropTypes.func.isRequired,
}

export default backdrop;