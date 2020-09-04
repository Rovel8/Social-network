import {
    authActions,
    authReducer, authUserThunkCreator,
    GET_CAPTCHA, getCaptchaThunkCreator,
    InitialStateType, loginUserThunkCreator, logoutUserThunkCreator,
    SET_ERROR_MESSAGE,
    SET_USER_DATA
} from './auth-reducer'
import {authAPI, captchaAPI, GetCaptchaType, loginAPI} from "../API/API";
jest.mock('../API/API')



describe('async actions',  () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()
    const thunkMockLoginFN = loginAPI as jest.Mocked<typeof loginAPI>

    afterEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

   it('should return captcha url', async () => {

       const getCaptchaAPIMock = captchaAPI as jest.Mocked<typeof captchaAPI>

       const result: GetCaptchaType = {
           url: 'hello.world.com'
       }

       getCaptchaAPIMock.getCaptchaAPI.mockReturnValue(Promise.resolve(result))

       const thunk = getCaptchaThunkCreator()

       await thunk(dispatchMock, getStateMock, {})

       expect(dispatchMock).toBeCalledTimes(1)
   })

    it('log in  thunk with resultCode 0', async () => {
        const result  = {
            resultCode: 0,
            messages: [],
            data: {
                userId: 3
            }
    }

        thunkMockLoginFN.loginUserAPI.mockReturnValue(Promise.resolve(result))

        const thunk = loginUserThunkCreator('hello@world.ru', 'welcome', true)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
    })

    it('log in  thunk with resultCode 1', async () => {

        const result  = {
            resultCode: 1,
            messages: ['some error message'],
            data: {
                userId: 3
            }
        }

        thunkMockLoginFN.loginUserAPI.mockReturnValue(Promise.resolve(result))

        const thunk = loginUserThunkCreator('hello@world.ru', 'welcome', true)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)
    })

    it('log in  thunk with resultCode 10', async () => {
        const result  = {
            resultCode: 10,
            messages: ['invalid anti-bot symbols'],
            data: {
                userId: 3
            }
        }
        thunkMockLoginFN.loginUserAPI.mockReturnValue(Promise.resolve(result))

        const thunk = loginUserThunkCreator('hello@world.ru', 'welcome', true)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(2)
    })

    it('log out thunk', async () => {
        const result  = {
            resultCode: 0,
            messages: [],
            data: {}
        }

        thunkMockLoginFN.logoutUserAPI.mockReturnValue(Promise.resolve(result))

        const thunk = logoutUserThunkCreator()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
    })

    it('auth thunk', async () => {

        const logoutUserThunkCreatorMock = authAPI as jest.Mocked<typeof authAPI>

        const result  = {
            resultCode: 0,
            messages: [],
            data: {
                id: 3,
                email: 'hello@mai.ru',
                login: 'Rok'
            }
        }

        logoutUserThunkCreatorMock.authMe.mockReturnValue(Promise.resolve(result))

        const thunk = authUserThunkCreator()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(1)

    })
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
        expect(authReducer(state, {type: GET_CAPTCHA, captchaURL}).captcha).toEqual(captchaURL)
    })

    it('Should not return any URL address', () => {
        const captchaURL = null
        expect(authReducer(state, {type: GET_CAPTCHA, captchaURL}).captcha).toEqual(captchaURL)
    })

    it('Should return error message', () => {
        const message = 'some error message'
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message}).errorMessage).toEqual(message)
    })

    it('Should not return any error message', () => {
        const message = null
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message}).errorMessage).toEqual(message)
    })

    it('Should not return any error message', () => {
        const message = undefined
        expect(authReducer(state, {type: SET_ERROR_MESSAGE, message}).errorMessage).toEqual(message)
    })

})