import {InferActionsTypes} from "./redux.store";

export const ADD_MESSAGE = 'ADD-MESSAGE';

export type MessagesType = {
    id: number
    message: string | null
}

export type DialogsType = {
    id: number
    name: string
}

let initialState = {
    messages: [
        {id: 1, message: "Hello",},
        {id: 2, message: "How was your day?!",},
        {id: 3, message: "I'm going to the cinema tomorrow",}
    ] as Array<MessagesType>,
    dialogs: [
        {id: 1, name: "Sasha"},
        {id: 2, name: "Mom"},
        {id: 3, name: "Dad"},
        {id: 4, name: "Sister"},
    ] as Array<DialogsType>,
}

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    if (action.type === ADD_MESSAGE) {
        return {
            ...state,
            messages: [...state.messages, {id: 4, message: action.newMessageBody}]
        }
    }
    return state
}

export type ActionTypes = InferActionsTypes<typeof dialogsActions>

export let dialogsActions = {
    addMessageActionCreator: (newMessageBody: string | null) => ({type: ADD_MESSAGE, newMessageBody})
}


