import React, {ChangeEvent, useEffect, useState} from "react";
import classes from './ProfileStatus.module.css'

type PropsType = {
    changeUserStatus: (status: string) => void
    status: string
}

export const ProfileStatus: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [localStatus, setStatus] = useState<string>(props.status)

    useEffect(() => {setStatus(props.status)}, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.changeUserStatus(localStatus)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)

    }

    return (
        <div>
            {editMode && <div>
                <input onChange={onStatusChange}  value={localStatus} autoFocus={true} onBlur={deactivateEditMode}/>
            </div>}
            {!editMode && <div>
                <span onClick={activateEditMode} className={classes.statusSpan}
                      >{props.status || '========'}</span>
            </div>}
        </div>

    );
}