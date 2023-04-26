import React from 'react'
import classes from './Spinner.module.css'

const Spinner = ({loading}) => {
    return loading ? <div className={classes.loader} /> : null
}

export default Spinner