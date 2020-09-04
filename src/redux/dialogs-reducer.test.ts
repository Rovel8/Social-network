import {ADD_MESSAGE, dialogsActions, dialogsReducer, DialogsType, MessagesType} from './dialogs-reducer'



describe('Action Creators', () => {
    it('should ',  () => {
        const newMessageBody = 'some text'
        const expectedAction = {type: ADD_MESSAGE, newMessageBody}
        expect(dialogsActions.addMessageActionCreator(newMessageBody)).toEqual(expectedAction)
    });
})

describe('Dialogs reducer', () => {
    it('should ',  () => {
        const state = {
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

        const expectedState = {
            messages: [
                {id: 1, message: "Hello",},
                {id: 2, message: "How was your day?!",},
                {id: 3, message: "I'm going to the cinema tomorrow",},
                {id: 4, message: 'hello world'}
            ] as Array<MessagesType>,
            dialogs: [
                {id: 1, name: "Sasha"},
                {id: 2, name: "Mom"},
                {id: 3, name: "Dad"},
                {id: 4, name: "Sister"},
            ] as Array<DialogsType>,
        }

        expect(dialogsReducer(state, {type: ADD_MESSAGE, newMessageBody: 'hello world'})).toEqual(expectedState)
    });
})