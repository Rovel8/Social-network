import {appActions, appReducer, initializeThunkCreator, SET_INITIALIZED} from './app-reducer'
import {authAPI} from "../API/API";
jest.mock('../API/API')

describe('async actions', () => {
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    afterEach(() => {
        dispatchMock.mockClear()
        getStateMock.mockClear()
    })

    it('initialize thunk', async () => {
        let initializeThunkCreatorMock = authAPI as jest.Mocked<typeof authAPI>

        const result  = {
            resultCode: 0,
            messages: [],
            data: {
                id: 3,
                email: 'hello@mai.ru',
                login: 'Rok'
            }
        }

        initializeThunkCreatorMock.authMe.mockReturnValue(Promise.resolve(result))

        const thunk = initializeThunkCreator()

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(2)
    })
})

describe('Action Creators', () => {
    it('Set initialize action', () => {
        let expectedAction = {
            type: SET_INITIALIZED
        }
        expect(appActions.setInitializedAC()).toEqual(expectedAction)
    })
})

describe('App Reducer', () => {

    it('set true to initialized', () => {
        let state = {
            initialized: false
        }
        let expectedState = {
            initialized: true
        }
        expect(appReducer(state, {type: SET_INITIALIZED})).toEqual(expectedState)
    })
})