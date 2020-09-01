import {followUserAPI, getUsersAPI, unfollowUserAPI} from "../API/API";
import {UsersType} from "../Types/Types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux.store";


const FOLLOW = "FOLLOW";
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS = 'SET-TOTAL-USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'
const FOLLOWING_PROGRESS = 'FOLLOWING-PROGRESS'



let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProcess: [] as Array<number>, // array of users id
}

export type InitialStateType = typeof initialState

export const findUsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    if (action.type === FOLLOW) {
        return {
            ...state,
            users: state.users.map(u => {
                if(u.id === action.userId) {
                    return{...u, followed:true}
                }else return u})
        }
    } else if (action.type === SET_USERS) {
        return {
            ...state,
            users: action.users
        }
    } else if (action.type === UNFOLLOW) {
        return {
            ...state,
            users: state.users.map(u => {if(u.id === action.userId){
                return{...u, followed: false}
            }else return u})
        }
    } else if (action.type === SET_CURRENT_PAGE) {
        return {
            ...state,
            currentPage: action.pageNumber
        }
    } else if (action.type === SET_TOTAL_USERS) {
        return {
            ...state,
            totalUsersCount: action.total
        }
    } else if (action.type === TOGGLE_IS_FETCHING) {
        return {
            ...state,
            isFetching: action.fetching,
        }
    } else if (action.type === FOLLOWING_PROGRESS) {
        return {
            ...state,
            followingInProcess: action.process ? [...state.followingInProcess, action.userId]
                                                  : state.followingInProcess.filter(id => id !== action.userId)
        }
    }
    return state
}

type ActionsTypes = InferActionsTypes<typeof findUserActions>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const findUserActions = {
  followingProcess: (process: boolean, userId: number) => ({type: FOLLOWING_PROGRESS, process, userId} as const),

  setCurrentPage: (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const),

  toFollow: (userId: number) => ({type: FOLLOW, userId} as const),

  toUnfollow: (userId: number) => ({type: UNFOLLOW, userId} as const),

  setUsers: (users: any) => ({type: SET_USERS, users} as const),

  setTotalUsers: (total: number) => ({type: SET_TOTAL_USERS, total} as const),

  setIsFetching: (fetching: boolean) => ({type: TOGGLE_IS_FETCHING, fetching} as const)
}



export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
        dispatch(findUserActions.setCurrentPage((currentPage)))
        dispatch(findUserActions.setIsFetching(true))

        let response = await getUsersAPI(currentPage, pageSize)
            dispatch(findUserActions.setIsFetching(false))
            dispatch(findUserActions.setUsers(response.items));
            dispatch(findUserActions.setTotalUsers(response.totalCount))
}

export const unfollowUserThunkCreator = (userID: number): ThunkType => async (dispatch) => {
        dispatch(findUserActions.followingProcess(true, userID));
        let response = await unfollowUserAPI(userID)
            if (response.resultCode === 0) {
                dispatch(findUserActions.toUnfollow(userID))
            }
            dispatch(findUserActions.followingProcess(false, userID));
}

export const followUserThunkCreator = (userID: number): ThunkType => async (dispatch) => {
        dispatch(findUserActions.followingProcess(true, userID));
        let response = await followUserAPI(userID)
            if (response.resultCode === 0) {
                dispatch(findUserActions.toFollow(userID))
            }
            dispatch(findUserActions.followingProcess(false, userID))
}