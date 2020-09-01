import classes from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {DialogsType} from "../../../redux/dialogs-reducer";

const DialogItem: React.FC<DialogsType> = (props) => {
    return (
        <div className={classes.dialogs__listItem}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
};

export default DialogItem