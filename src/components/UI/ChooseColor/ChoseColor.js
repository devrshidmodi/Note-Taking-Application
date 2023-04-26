import React from 'react'
import Aux from '../../../hoc/Aux'
import classes from './ChooseColor.module.css'
import Color from './Color/Color'
import PropTypes from 'prop-types'

const chooseColor = ({colorOptions, currentColor}) => {
    const COLORS_TOP = colorOptions.slice(0, Math.ceil(colorOptions.length/2))
    const COLORS_BOTTOM = colorOptions.slice(Math.ceil(colorOptions.length/2), colorOptions.length)

    return (
        <Aux>
            <div className={classes.colorContainer}>
                {COLORS_TOP.map((color) => {
                    return <Color key={color} active={currentColor === color} color={color} />
                })}
            </div>
            <div className={classes.colorContainer}>
                {COLORS_BOTTOM.map((color) => {
                    return <Color key={color} active={currentColor === color} color={color} />
                })}
            </div>
        </Aux>
    )
}

chooseColor.propTypes = {
    colorOptions: PropTypes.array.isRequired,
    currentColor: PropTypes.string.isRequired,
}

export default chooseColor