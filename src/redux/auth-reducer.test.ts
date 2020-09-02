import {authActions, authReducer} from './auth-reducer'

let state = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captcha: null,
    errorMessage: null
}

describe('Auth Reducer tests', () => {
    it('Should set isAuth to true', () => {
        let reducer = authReducer(state, authActions.setAuthUserData({login: 'Rovel8', id: 304 , email: 'hello@mail.ru'}))
        expect(reducer.isAuth).toBeTruthy()
    })
    it('Should return captcha URL adress', () => {
        let reducer = authReducer(state, authActions.getCaptchaActionCreator('string.alll.com'))
        expect(reducer.captcha).toEqual('string.alll.com')
    })
    it('Should not return any URL address', () => {
        let reducer = authReducer(state, authActions.getCaptchaActionCreator(null))
        expect(reducer.captcha).toBe(null)
    })
    it('Should return error message', () => {
        let reducer = authReducer(state, authActions.errorMessageActionCreator('invalid email address'))
        expect(reducer.errorMessage).toEqual('invalid email address')
    })
    it('Should not return any error message', () => {
        let reducer = authReducer(state, authActions.errorMessageActionCreator(null))
        expect(reducer.errorMessage).toBe(null)
    })
    it('Should not return any error message', () => {
        let reducer = authReducer(state, authActions.errorMessageActionCreator(undefined))
        expect(reducer.errorMessage).toBe(undefined)
    })
})