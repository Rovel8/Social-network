import FindUsersAPIComponent from "./FindUsersAPIComponent";
import {connect} from "react-redux";
import {getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator
} from "../../redux/findUser-reducer";
import {
    getCurrentPageSelector, getFollowingInProcessSelector, getIsFetchingSelector,
    getPageSizeSelector,
    getTotalUsersCountSelector,
    getUsersSuperSelector
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux.store";
import {UsersType} from "../../Types/Types";
import {WithAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {ComponentType} from "react";

type MapStateToPropsType = {
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProcess: Array<number>
}

type MapDispatchToProps = {
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    unfollowUserThunkCreator: (userId: number) => void
    followUserThunkCreator: (userId: number) => void
}

let mapStateToProps =(state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: getTotalUsersCountSelector(state),
        currentPage: getCurrentPageSelector(state),
        isFetching: getIsFetchingSelector(state),
        followingInProcess: getFollowingInProcessSelector(state),
    }
}
export default compose<ComponentType>(connect<MapStateToPropsType, MapDispatchToProps, null, AppStateType>(mapStateToProps, {getUsersThunkCreator, unfollowUserThunkCreator,
    followUserThunkCreator}), WithAuthRedirect)(FindUsersAPIComponent)



