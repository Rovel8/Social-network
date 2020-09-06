import {createSelector} from "reselect";
import {AppStateType} from "./redux.store";


export const getUsersSelector = (state: AppStateType) => {
    return state.findUsers.users
}

export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSizeSelector = (state: AppStateType) => {
    return state.findUsers.pageSize
}

export const getTotalUsersCountSelector = (state: AppStateType) => {
    return state.findUsers.totalUsersCount
}

export const getCurrentPageSelector = (state: AppStateType) => {
    return state.findUsers.currentPage
}

export const getIsFetchingSelector = (state: AppStateType) => {
    return state.findUsers.isFetching
}

export const getFollowingInProcessSelector = (state: AppStateType) => {
    return state.findUsers.followingInProcess
}

export const getTermSelector = (state: AppStateType) => {
    return state.findUsers.filter.term
}

export const getFriendSelector = (state: AppStateType) => {
    return state.findUsers.friend
}
