import React, {useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {LoginType, loginUserThunkCreator} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux.store";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import {ErrorMsg} from "../../common/FormsControl/FormsControl";


const Login = (props: PropsFromRedux) => {

    if(props.isAuth) {
        return <Redirect to={'/profile'}/>
    }

    type InitialValuesType = {
        email: string | null
        password: string | null
        rememberMe: boolean
        captcha?: string
    }

    let initialValues: InitialValuesType = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: '',
    };
    let onSubmit = (formData: LoginType) => {
        props.loginUserThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };
    let validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required field'),
        password: Yup.string().required('Required field'),
        rememberMe: Yup.boolean(),
        captcha: Yup.string().nullable()
    })
    return (
        <div>
            <h1>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <div>
                        <Field name={'email'} id={'email'} placeholder={'login'} type={'text'} />
                        <ErrorMessage component={ErrorMsg} name={'email'} />
                    </div>

                    <div>
                        <Field name={'password'} id={'password'} placeholder={'password'} type={'text'} />
                        <ErrorMessage component={ErrorMsg} name={'password'} />
                    </div>

                    <div>
                        <Field name={'rememberMe'} id={'rememberMe'} type={'checkbox'} /> Remember me
                    </div>

                    {props.captcha && <img alt='captcha IMG' src={props.captcha}/>}

                    {props.captcha && <div><Field name={'captcha'} placeholder={'Input for Captcha'} type='text' /></div>}

                    {props.errorMessage && <ErrorMsg>{props.errorMessage}</ErrorMsg>}

                    <button>Log in</button>

                </Form>
            </Formik>
        </div>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha,
    errorMessage: state.auth.errorMessage
})

const connector = connect(
    mapStateToProps,
    {loginUserThunkCreator}
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Login)