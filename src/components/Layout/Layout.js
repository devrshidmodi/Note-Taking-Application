import React from 'react';
import Aux from '../../hoc/Aux'
import NavBar from '../Navigation/NavBar/NavBar'
import classes from './Layout.module.css'

const layout = ({children}) => (
    <Aux>
        <NavBar />
        <main className={classes.Layout}>
            {children}
        </main>
    </Aux>
)

export default layout;