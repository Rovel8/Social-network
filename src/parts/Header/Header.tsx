import React from 'react';
import classes from './Header.module.css'
import {NavLink} from "react-router-dom";
import {HeaderDispatchStateType, HeaderMapStateType} from "./HeaderContainer";

const Header: React.FC<HeaderMapStateType & HeaderDispatchStateType> = (props) => {
    return (
        <div className={classes.Header}>
            <div>
                <img src="https://compannero.my1.ru/NAHblogger/logoHP.png" alt=""/>
            </div>
            <div className={classes.login__block}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logoutUserThunkCreator}>LogOut</button></div>
                    : <NavLink to={'/Login'}>Login</NavLink>}
            </div>
        </div>
    );
}

export default Header