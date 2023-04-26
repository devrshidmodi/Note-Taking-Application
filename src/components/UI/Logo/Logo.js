import React from 'react'
import logoImg from '../../../assets/memo.png'
import classes from './Logo.module.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={logoImg} alt="Memo.io logo" aria-hidden="true"></img>
    </div>
)

export default logo;