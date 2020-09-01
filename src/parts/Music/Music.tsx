import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import classes from  './Music.module.css'
import * as Yup from 'yup'

const  Music = () => {
    return (
        <div>
            This is music component
            <SignupForm />
        </div>
    );
}


const SignupForm: React.FC<{}> = () => {
    let initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        comments: '',
        social: {
            facebook: '',
            twitter: '',
        },
        phoneNumbers: ['']
    };

    type InitialStateType = typeof initialValues

    let onSubmit = (values: InitialStateType) => {
        console.log(values)
    };
    let validationSchema = Yup.object({
        firstName: Yup.string().required('Required field'),
        lastName: Yup.string().required('Required field'),
        email: Yup.string().email('Invalid email').required('Required field')
    });
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className={classes.wholeForm}>
            <div className={classes.formElement}>
                <label htmlFor="firstName">First Name</label>
                <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                />
                <ErrorMessage component={TextError} name={'firstName'} />
            </div>

            <div className={classes.formElement}>
                <label htmlFor="lastName">Last Name</label>
                <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                />
                <ErrorMessage component={TextError} name={'lastName'} />
            </div>

            <div className={classes.formElement}>
                <label htmlFor="email">Email Address</label>
                <Field
                    id="email"
                    name="email"
                    type="email"
                />
                <ErrorMessage name={'email'} >
                    {
                        (errorMsg) => <div className={classes.errorMessage}>{errorMsg}</div>
                    }
                </ErrorMessage>
            </div>

            <div className={classes.formElement}>
                <label htmlFor="comments">Comments</label>
                <Field as={'textarea'} name={'comments'} id={'comments'} type={'text'} />
            </div>

            <div className={classes.formElement}>
                <label htmlFor="facebook">Facebook profile</label>
                <Field name={'social.facebook'} id={'facebook'} type={'text'} />
            </div>

            <div className={classes.formElement}>
                <label htmlFor="twitter">Twitter profile</label>
                <Field name={'social.twitter'} id={'twitter'} type={'text'} />
            </div>


            <div className={classes.submitButton}>
                <button type="submit">Submit</button>
            </div>

        </Form>
        </Formik>
    );
};

const TextError = (props: any) => {
    console.log(props)
    return (
        <div className={classes.errorMessage}>
            {props.children}
        </div>
    );
}

export default Music