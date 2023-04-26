import React, { useContext } from 'react';
import classes from './NavBar.module.css'
import NavItems from '../NavItems/NavItems'
import Logo from '../../UI/Logo/Logo'
import ImageButton from '../../UI/Button/ImageButton/ImageButton'

import plus from '../../../assets/plus.png'
import pallete from '../../../assets/pallete.png'

import NoteContext from '../../../context/NoteContext'
import Aux from '../../../hoc/Aux'

const NavBar = () => {

    const noteContext = useContext(NoteContext)

    return (
        <header className={classes.NavBar} style={{zIndex: noteContext.zIndex+2}}>
            <div className={classes.Logo}>
                <Logo />
                <h1>Memo.io</h1>
            </div>
            <div className={classes.Button}>
                <Aux>
                    <ImageButton image={plus} alt="plus icon" clicked={noteContext.addNote} label="Add note" title="Add note"/>
                    <ImageButton image={pallete} alt="pallete icon" clicked={() => noteContext.updateModal(3)} label="Change note colour" title="Change note colour" />
                </Aux>
            </div>
            <nav>
                <NavItems />
            </nav>
        </header >
    )
}

export default NavBar;