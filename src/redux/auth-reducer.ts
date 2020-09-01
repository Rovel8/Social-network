import {authMe, getCaptchaAPI, loginUserAPI, logoutUserAPI} from "../API/API";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux.store";


const SET_USER_DATA = "SET-USER-DATA";
const GET_CAPTCHA = 'GET-CAPTCHA';
const SET_ERROR_MESSAGE = 'SET-ERROR-MESSAGE';

type InitialStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captcha?: string | null
    errorMessage?: string | null
}

let initialState: InitialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null,
    errorMessage: null
}

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    if (action.type === SET_USER_DATA) {
        return {
            ...state,
            ...action.payload,
        }
    } else if (action.type === GET_CAPTCHA) {
        return {
            ...state,
            captcha: action.captchaURL
        }
    } else if (action.type === SET_ERROR_MESSAGE) {
        return {
            ...state,
            errorMessage: action.message
        }
    }
    return state
};

type ActionsTypes = InferActionsTypes<typeof authActions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authActions = {
    setAuthUserData:  ({id, login, email, isAuth = true}:DataType) => ({type: SET_USER_DATA, payload: { id, login, email, isAuth}} as const),
    getCaptchaActionCreator:  (captchaURL: string | null) => ({type: GET_CAPTCHA, captchaURL} as const),
    errorMessageActionCreator:  (message: string | null | undefined) => ({type: SET_ERROR_MESSAGE, message} as const)
}



type DataType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

export const authUserThunkCreator = (): ThunkType => (dispatch) => {
    return authMe().then((response: any) => {
        if (response.resultCode === 0) {
            let {id, login, email, isAuth} = response.data
            dispatch(authActions.setAuthUserData({id, login, email, isAuth}));
        }
    });
}

export type LoginType = {
    email: string | null
    password: string | null
    rememberMe: boolean,
    captcha?: string | null
}

export const loginUserThunkCreator = (email: string | null, password: string | null,
                                      rememberMe: boolean, captcha: string | null | undefined): ThunkType => async (dispatch) => {
    let response = await loginUserAPI({email, password, rememberMe, captcha})
        if (response.resultCode === 0) {
            await dispatch(authUserThunkCreator())
        } else {
            if(response.resultCode === 10) {
                dispatch(authActions.errorMessageActionCreator(response.messages[0]))
                await dispatch(getCaptchaThunkCreator())
            }
            dispatch(authActions.errorMessageActionCreator(response.messages[0]))
        }
}

export const logoutUserThunkCreator = (): ThunkType => async (dispatch) => {

    let response = await logoutUserAPI()
        if (response.resultCode === 0) {
            dispatch(authActions.setAuthUserData({id: null, login: null, email: null, isAuth: false}))
            dispatch(authActions.getCaptchaActionCreator(null))
            dispatch(authActions.errorMessageActionCreator(null))
        }
}

export const getCaptchaThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await getCaptchaAPI()
    dispatch(authActions.getCaptchaActionCreator(response.url))
}