import {connect} from "react-redux";
import {submitUserDataThunkCreator} from "../../../redux/profile-reducer";
import React, {useState} from "react";
import {ErrorMsg} from "../../../common/FormsControl/FormsControl";
import classes from './ProfileInfo.module.css'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'
import {ProfileType} from "../../../Types/Types";
import {AppStateType} from "../../../redux/redux.store";

type PropsType = {
    profile: FormDataOmitType
    submitUserDataThunkCreator: (formData: FormDataOmitType, userId: number) => void
    isOwner: boolean
}

const ProfileProperties: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }
    return (
        <div>
            {editMode && <ProfilePropertiess submitUserDataThunkCreator={props.submitUserDataThunkCreator} deactivateEditMode={deactivateEditMode} {...props.profile}/>}
            {!editMode && <UserInfo isOwner={props.isOwner} activateEditMode={activateEditMode} {...props.profile} />}
        </div>
    );
}

type FormDataType = FormDataOmitType & PropsFormDataType
export type FormDataOmitType = Omit<ProfileType, 'photos'>
type PropsFormDataType = {
    submitUserDataThunkCreator: (formData: FormDataOmitType, userId: number) => void
    deactivateEditMode: () => void
}
type SubmitUserDataType = {
    submitUserDataThunkCreator: (formData: FormDataOmitType, userId: number) => void
}

const ProfilePropertiess: React.FC<FormDataType> = (props) => {
    let initialValues = {
        fullName: props.fullName,
        aboutMe: props.aboutMe,
        lookingForAJob: props.lookingForAJob,
        lookingForAJobDescription: props.lookingForAJobDescription,
        contacts: {
            github: props.contacts.github,
            vk: props.contacts.vk,
            facebook: props.contacts.facebook,
            instagram: props.contacts.instagram,
            twitter: props.contacts.twitter,
            website: props.contacts.website,
            youtube: props.contacts.youtube,
            mainLink: props.contacts.mainLink
        },
        userId: props.userId
    };

    type onSubmitDataType = typeof initialValues

    let onSubmit = (formData: onSubmitDataType) => {
        props.submitUserDataThunkCreator(formData, props.userId)
        props.deactivateEditMode()
    }

    let contactLinksValid = Yup.string().url('Invalid url address').nullable()

    let validationSchema = Yup.object ({
        fullName: Yup.string().nullable(),
        aboutMe: Yup.string().nullable(),
        lookingForAJob: Yup.boolean().nullable(),
        lookingForAJobDescription: Yup.string().nullable(),
        contacts: Yup.object({
            github: contactLinksValid,
            vk: contactLinksValid,
            facebook: contactLinksValid,
            instagram: contactLinksValid,
            twitter: contactLinksValid,
            website: contactLinksValid,
            youtube: contactLinksValid,
            mainLink: contactLinksValid
    })
    })

    return (
      <div>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
             <Form>
                 {<button>Save</button>}

                 <div><strong>Full name: </strong>{
                     <Field name={'fullName'} type={'text'}/>}
                     <ErrorMessage component={ErrorMsg} name={'fullName'} />
                 </div>

                 <div><strong>About me: </strong><Field name={'aboutMe'} type={'text'}/>
                     <ErrorMessage component={ErrorMsg} name={'aboutMe'} />
                 </div>

                 <div><strong>Looking for a job: </strong>
                     <Field name={'lookingForAJob'} type={'checkbox'}/>
                     <ErrorMessage component={ErrorMsg} name={'lookingForAJob'} />
                 </div>

                 <div><strong>Job description: </strong>
                     <Field name={'lookingForAJobDescription'} type={'text'}/>
                     <ErrorMessage component={ErrorMsg} name={'lookingForAJobDescription'} />
                 </div>

                 <div><strong>Contacts: </strong></div>
                 {Object.keys(props.contacts).map(key => <div className={classes.ContactItems}><strong>{key}</strong>:
                     <Field name={`contacts.${key}`} type={'text'}/>
                     <ErrorMessage component={ErrorMsg} name={`contacts.${key}`} />
                 </div>)}

             </Form>
         </Formik>
      </div>
    );
}
type EditMode = {
    activateEditMode: () => void
}
type OwnerType = {
    isOwner: boolean
}
const UserInfo: React.FC<FormDataOmitType & EditMode & OwnerType> = (props) => {

    return (
        <div>
            {props.isOwner && <button onClick={props.activateEditMode}>Edit</button>}
            <div><strong>Full name: </strong>{props.fullName}</div>
            <div><strong>About me: </strong>{props.aboutMe}</div>
            <div><strong>Looking for a job: </strong>{props.lookingForAJob ? 'Yes' : 'No'}</div>
            {props.lookingForAJob && <div><strong>Job description: </strong>{props.lookingForAJobDescription}</div>}
            <div><strong>Contacts: </strong></div>
            {Object.keys(props.contacts).map(key => <div className={classes.ContactItems}><strong>{key}</strong>: {props.contacts[key]}</div>)}
        </div>
    );
}


export default connect<null, SubmitUserDataType, {}, AppStateType>(null, {submitUserDataThunkCreator})(ProfileProperties)

