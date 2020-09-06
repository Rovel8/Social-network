import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Formik, Form, Field, FormikHelpers} from 'formik';
import {DialogsType, InitialStateType, MessagesType} from "../../redux/dialogs-reducer";

type PropsType = {
    messagesPage: InitialStateType,
    addMessageActionCreator: (newMessageBody: string) => void
}

const Dialogs: React.FC<PropsType> = (props) => {

    let dialogsElement = props.messagesPage.dialogs.map((d: DialogsType) => (<DialogItem name={d.name} id={d.id}/>))

    let messagesElement = props.messagesPage.messages.map((m: MessagesType) => (<Message id={m.id} message={m.message}/>))

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogs__list}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
            <FieldForMessageInput addMessageActionCreator={props.addMessageActionCreator}/>
            </div>
        </div>
    );
}

type formType = {
    addMessageActionCreator: (newMessageBody: string) => void
}

const FieldForMessageInput: React.FC<formType> = (props) => {

    type formValuesType = {
        newMessageBody: string
    }

    let initialValues: formValuesType = {newMessageBody: ''};

    let onSubmit = (values: formValuesType, onSubmitEvents: FormikHelpers<formValuesType>) => {
        props.addMessageActionCreator(values.newMessageBody)
        onSubmitEvents.resetForm()
    }

    return (
            <React.Fragment>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    <Form>
                        <Field as={'textarea'} placeholder={'Type message'} name={'newMessageBody'}/>
                        <button>Send message</button>
                    </Form>
                </Formik>
            </React.Fragment>

    );
}


export default Dialogs