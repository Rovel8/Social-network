import {compose, applyMiddleware, combineReducers, createStore, Action} from "redux";
import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {findUsersReducer} from "./findUser-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {appReducer} from "./app-reducer";

let reducersBatch = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sideBar: sidebarReducer,
    findUsers: findUsersReducer,
    auth: authReducer,
    app: appReducer,
});

type ReducersBatchType = typeof reducersBatch
export type AppStateType = ReturnType<ReducersBatchType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducersBatch, composeEnhancers(applyMiddleware(thunkMiddleware)
));


// @ts-ignore
window.store = store


export default store
