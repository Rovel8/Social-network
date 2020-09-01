import React from 'react';
import classes from './Nav.module.css'
import {NavLink} from 'react-router-dom'

const Nav: React.FC<{}> = () => {
    return (
        <div className={classes.Nav}>
            <div className={classes.list__item}>
                <NavLink to='../Profile'>Profile</NavLink>
            </div>
            <div className={classes.list__item}>
                <NavLink to="../Dialogs">Dialogs</NavLink>
            </div>
            <div className={classes.list__item}>
                <NavLink to='../News'>News</NavLink>
            </div>
            <div className={classes.list__item}>
                <NavLink to='../Music'>Music</NavLink>
            </div>
            <div className={classes.list__item}>
                <NavLink to='../Settings'>Settings</NavLink>
            </div>
            <div className={classes.findUsers}><NavLink to='../FindUsers'>Find Users</NavLink></div>
        </div>
    );
}

export default Nav