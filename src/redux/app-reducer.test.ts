import {appActions, appReducer} from './app-reducer'

let state = {
    initialized: false
}

describe('App Reducer', () => {

    it('Shout return true', () => {
        let reducer = appReducer(state, appActions.setInitializedAC())
        expect(reducer).toBeTruthy()
    })
})