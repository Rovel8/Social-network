import classes from "../Dialogs.module.css";
import React from "react";
import {MessagesType} from "../../../redux/dialogs-reducer";

const Message: React.FC<MessagesType> = (props) => {
    return (
        <div className={classes.message}>
            {props.message}
        </div>
    );
}

export default Message