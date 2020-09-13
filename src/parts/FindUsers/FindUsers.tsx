import React, {useEffect} from "react";
import classes from "./FindUsers.module.css";
import pageImage from '../../assets/unnamed.png'
import {NavLink, useHistory} from "react-router-dom";
import {Paginator} from "../../common/Paginator/Paginator";
import {UsersType} from "../../Types/Types";
import SearchForm from "./FindUsers/SearchForm";
import {useSelector, TypedUseSelectorHook, useDispatch} from 'react-redux'
import {
    getCurrentPageSelector, getFollowingInProcessSelector, getFriendSelector,
    getIsFetchingSelector,
    getPageSizeSelector, getTermSelector,
    getTotalUsersCountSelector, getUsersSuperSelector
} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux.store";
import {getUsersThunkCreator, unfollowUserThunkCreator, followUserThunkCreator} from "../../redux/findUser-reducer";
import * as queryString from "querystring";

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector
const FindUsers: React.FC<{}> = () => {

    const currentPage = useTypedSelector(getCurrentPageSelector)
    const pageSize = useTypedSelector(getPageSizeSelector)
    const totalUsersCount = useTypedSelector(getTotalUsersCountSelector)
    const isFetching = useTypedSelector(getIsFetchingSelector)
    const term = useTypedSelector(getTermSelector)
    const friend = useTypedSelector(getFriendSelector)
    const users = useTypedSelector(getUsersSuperSelector)
    const followingInProcess = useTypedSelector(getFollowingInProcessSelector)

    const dispatch = useDispatch()

    const setPage = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize,term, friend))
    }

    const follow = (userId: number) => {
        dispatch(followUserThunkCreator(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUserThunkCreator(userId))
    }

    const history = useHistory()

    type QueryStringType = {term?: string, page?: string, friend?: string}

    useEffect(() => {
        const {search} = history.location
        const parse = queryString.parse(search.substring(1)) as QueryStringType

        debugger

        let actualPageNumber = currentPage
        let filter = term
        let isFriend = friend
        if(parse.page) actualPageNumber = Number(parse.page)
        if(parse.term) filter = parse.term
        if(parse.friend) isFriend = parse.friend === 'null' ? null : parse.friend === 'true' ? true : false


        dispatch(getUsersThunkCreator(actualPageNumber, pageSize, filter, isFriend))
    }, [])

    useEffect(() => {

        const query : QueryStringType = {}

        if(term) query.term = term
        if(friend !== null) query.friend = String(friend)
        if(currentPage !== 1) query.page = String(currentPage)


        history.push({
            pathname: '/FindUsers',
            search: queryString.stringify(query)
        })
    }, [term, currentPage, friend])

    useEffect(() => {
        return () => {dispatch(getUsersThunkCreator(currentPage, pageSize, term,  null))}
    }, [])

    return (
        <div>
            <div className={classes.headerOfPage}>
                <div className={classes.searchForm}>
                    <SearchForm isFetching={isFetching} currentPage={currentPage} pageSize={pageSize} />
                </div>
                <div className={classes.paginator}>
                    <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} setPage={setPage}
                               currentPage={currentPage}/>
                </div>
            </div>
            {
                users.map((u: UsersType) => <div key={u.id} className={classes.FindUsers}>
                    <div className={classes.userSide}>
                        <NavLink to={'/profile/' + u.id}>
                            <img className={classes.userPic} src={u.photos.small ? u.photos.small : pageImage}
                                 alt="UserPicture"/>
                        </NavLink>
                        <div>
                            {u.followed
                                ?
                                <button disabled={followingInProcess.some((id: number) => id === u.id)} onClick={() => {
                                    return unfollow(u.id)
                                }}>Unfollow</button>
                                :
                                <button disabled={followingInProcess.some((id: number) => id === u.id)} onClick={() => {
                                    return follow(u.id)
                                }}>Follow</button>}
                        </div>
                    </div>
                    <div className={classes.userInfo}>
                        <div className={classes.userName}>{u.name}</div>
                        <div className={classes.userStatus}>{u.status}</div>
                        <div className={classes.userCountry}>{"u.location.country"}</div>
                        <div className={classes.userCity}>{"u.location.city"}</div>
                    </div>
                </div>)
            }
        </div>
    );
}

export default FindUsers