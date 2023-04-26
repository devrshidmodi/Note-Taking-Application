import React from 'react';
import classes from './ImageButton.module.css'
import PropTypes from 'prop-types'

const imageButton = ({image, alt, clicked, label, title}) => (
    <div className={classes.Button}>
        <button onClick={clicked} aria-label={label} title={title}>
            <img src={image} alt={alt} aria-hidden="true"/>
        </button>
    </div>
)

imageButton.propTypes = {
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    clicked: PropTypes.func.isRequired,
    label: PropTypes.string,
    title: PropTypes.string
}

export default imageButton;