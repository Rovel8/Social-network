import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Hello guys!", name: "Pasha", age: "22", likeCounts: "15"},
                {id: 2, message: "This is my first post", name: "Sasha", age: "13", likeCounts: "20"},
            ],
            newPostText: 'samurai'
        },
        messagesPage: {
            messages: [
                {id: 1, message: "Hello",},
                {id: 2, message: "How was your day?!",},
                {id: 3, message: "I'm going to the cinema tomorrow",}
            ],
            newMessageText: 'Hllya',
            dialogs: [
                {id: 1, name: "Sasha"},
                {id: 2, name: "Mom"},
                {id: 3, name: "Dad"},
                {id: 4, name: "Sister"},
            ],
        },
        sideBar: {},
    },
    _callSubscriber() {
        console.log("State was changed")
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    addPost() {
        debugger
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            name: 'Pasha',
            age: 22,
            likeCounts: 0,
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    addMessage() {
        let newMessage = {
            id: 3,
            message: this._state.messagesPage.newMessageText
        };
        this._state.messagesPage.messages.push(newMessage);
        this._state.messagesPage.newMessageText = '';
        this._callSubscriber(this._state)
    },
    updateNewsMessageText(newText) {
        this._state.messagesPage.newMessageText = newText;
        this._callSubscriber(this._state)
    },
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPag = dialogsReducer(this._state.messagesPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);
        this._callSubscriber(this._state)
    },
};


export default store