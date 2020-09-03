import {
    authActions,
    authReducer,
    GET_CAPTCHA, getCaptchaThunkCreator,
    InitialStateType,
    SET_ERROR_MESSAGE,
    SET_USER_DATA
} from './auth-reducer'


describe('async actions', () => {
    const thunk = getCaptchaThunkCreator()

    const dispatchMock = jest.fn()

    // @ts-ignore
    thunk(dispatchMock)

    expect(dispatchMock).toBeCalledTimes(1)
})
describe('Auth Reducer action creators tests', () => {
    it('setAuthUserData action creator test', () => {
        const payload = {
            login: 'Rovel8',
            id: 94,
            email:'hello@mail,ru',
            isAuth: true
        }
        const expectedAction = {
            type: SET_USER_DATA,
            payload: payload
        }
        expect(authActions.setAuthUserData(payload)).toEqual(expectedAction)
    })

    it('Get captcha URL action creator test', () => {
        const captchaURL = 'hello world'
        const expectedAction = {
            type: GET_CAPTCHA,
            captchaURL
        }
        expect(authActions.getCaptchaActionCreator(captchaURL)).toEqual(expectedAction)
    })

    it('Set error message action creator test', () => {
        const message = 'invalid email address'
        const expectedAction = {
            type: SET_ERROR_MESSAGE,
            message
        }
        expect(authActions.errorMessageActionCreator(message)).toEqual(expectedAction)
    })

})

describe('Auth Reducer tests', () => {

    let state: InitialStateType;

    beforeEach(() => {
        state = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: null,
            errorMessage: null
        }
    })

    it('Should return the initial state', () => {
        // @ts-ignore
        expect(authReducer(undefined, {})).toEqual(state)
    })

    it('should set payload data', () => {
        const payload = {
            login: 'Rovel8',
            id: 94,
            email:'hello@mail,ru',
            isAuth: true
        }
        const expectedState = {
            id: 94,
            login: 'Rovel8',
            email: 'hello@mail,ru',
            isAuth: true,
            captcha: null,
            errorMessage: null
        }
        expect(authReducer(state, {type: SET_USER_DATA,
            payload: payload})).toEqual(expectedState)
    })

    it('Should return captcha URL address', () => {
        const captchaURL = 'hello.world.com'
        const expectedState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: captchaURL,
            errorMessage: null
        }
        expect(authReducer(state, {type: GET_CAPTCHA, captchaURL})).toEqual(expectedState)
    })

    it('Should not return any URL address', () => {
        const captchaURL = null
        const expectedState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: null,
            errorMessage: null
        }
        expect(authReducer(state, {type: GET_CAPTCHA, captchaURL})).toEqual(expectedState)
    })

    it('Should return error message', () => {
        const message = 'some error message'
        const expectedState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: null,
            errorMessage: message
        }
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message})).toEqual(expectedState)
    })

    it('Should not return any error message', () => {
        const message = null
        const expectedState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: null,
            errorMessage: message
        }
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message})).toEqual(expectedState)
    })

    it('Should not return any error message', () => {
        const message = undefined
        const expectedState = {
            id: null,
            login: null,
            email: null,
            isAuth: false,
            captcha: null,
            errorMessage: message
        }
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message})).toEqual(expectedState)
    })

})