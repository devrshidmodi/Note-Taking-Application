import React from 'react';
import classes from './NavItem.module.css'
import PropTypes from 'prop-types'

const navItem = ({ariaLable, clicked, children}) => (
    <li className={classes.NavItem} >
        <button aria-label={ariaLable === undefined ? ariaLable : null} onClick={clicked}>{children}</button>
    </li>
)

navItem.propTypes = {
    ariaLable: PropTypes.string,
    clicked: PropTypes.func.isRequired
}

export default navItem;