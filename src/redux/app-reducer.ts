import {authUserThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux.store";

const SET_INITIALIZED = 'SET-INITIALIZED';

type InitialStateType = typeof initialState

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    if(action.type === SET_INITIALIZED) {
        return {
            ...state,
            initialized: true
        }
    }
    return state
}

type ActionsTypes = InferActionsTypes<typeof appActions>

export let appActions = {
    setInitializedAC: () => ({type: SET_INITIALIZED})
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeThunkCreator = (): ThunkType => async (dispatch) => {
    await dispatch(authUserThunkCreator());
    dispatch(appActions.setInitializedAC());
}