import React from "react";
import classes from './FormsControl.module.css'

export const ErrorMsg: React.FC<{}> = ({children}) => {
    return (
        <div className={classes.error__message}>
            {children}
        </div>
    );
}