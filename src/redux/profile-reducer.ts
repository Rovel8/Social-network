import { usersAPI} from "../API/API";
import {PostsType, ProfilePhotosType, ProfileType} from "../Types/Types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux.store";
import {FormDataOmitType} from "../parts/Body/Info/ProfileProperties";

export const ADD_POST = "ADD-POST";
export const SET_USER_PROFILE = 'SET-USER-PROFILE';
export const GET_USER_STATUS = 'GET-USER-STATUS';
export const SET_USER_IMAGE = 'SET-USER-IMAGE';
export const SET_USER_DATA = 'SET-USER-DATA'


let initialState = {
    posts: [
        {id: 1, message: "Hello guys!", name: "Pasha", age: "22", likeCounts: "15"},
        {id: 2, message: "This is my first post", name: "Sasha", age: "13", likeCounts: "20"},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '' as string,
    newPostText: ''
}

export type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    if (action.type === ADD_POST) {
        return {
            ...state,
            posts: [...state.posts, {
                id: 3,
                message: action.newPostText,
                name: 'Pasha',
                age: '22',
                likeCounts: '0',
            }],
            newPostText: '',
        }
    } else if (action.type === SET_USER_PROFILE) {
        return {
            ...state,
            profile: action.profile
        }
    } else if (action.type === GET_USER_STATUS) {
        return {
            ...state,
            status: action.status
        }
    } else if (action.type === SET_USER_IMAGE) {
        return {
            ...state,
            profile: { ...state.profile, photos: action.payload}  as ProfileType
        }
    } else if (action.type === SET_USER_DATA) {
        return {
            ...state,
            profile: action.data as ProfileType
        }
    }
    return state
};


export type ActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
      addPostActionCreator: (newPostText: string | null) => ({type: ADD_POST, newPostText} as const),
      setUserProfile: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
      getUserStatus: (status: string) => ({type: GET_USER_STATUS, status} as const),
      setUserProfileImage: (photos: ProfilePhotosType) => ({type: SET_USER_IMAGE, payload: photos} as const),
      setUserDataActionCreator: (data: ProfileType) => ({type: SET_USER_DATA, data} as const)
}



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const setOwnUserProfileThunkCreator = (userId: number | null): ThunkType => async (dispatch) => {
    let response = await usersAPI.getUserProfileAPI(userId)
    dispatch(profileActions.setUserProfile(response));
}

export const getUserStatusThunkCreator = (userId: number | null): ThunkType  => async (dispatch) => {
    let response = await usersAPI.getUserStatusAPI(userId)
    dispatch(profileActions.getUserStatus(response))
}

export const changeUserStatusThunkCreator = (status: string): ThunkType => async (dispatch) => {
    let response = await usersAPI.changeUserStatusAPI(status)
    if (response.resultCode === 0) {
        dispatch(profileActions.getUserStatus(status))
    }
}

export const saveProfileImage = (image: any): ThunkType => async (dispatch) => {
    let response = await usersAPI.setPhotoAPI(image)
    if (response.resultCode === 0) {
        dispatch(profileActions.setUserProfileImage(response.data.photos))
    }
}

export const submitUserDataThunkCreator = (data: FormDataOmitType, userId: number | null): ThunkType => async (dispatch) => {
    let response = await usersAPI.setUserDataAPI(data)
    if (response.resultCode === 0) {
        let result = await usersAPI.getUserProfileAPI(userId)

        dispatch(profileActions.setUserDataActionCreator(result))
    }
}