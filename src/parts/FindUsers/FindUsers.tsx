import React from "react";
import classes from "./FindUsers.module.css";
import pageImage from '../../assets/unnamed.png'
import {NavLink} from "react-router-dom";
import {Paginator} from "../../common/Paginator/Paginator";
import {UsersType} from "../../Types/Types";

type PropsType = {
    currentPage: number
    followUserThunkCreator: (userId: number) => void
    followingInProcess: Array<number>
    pageSize: number
    setPage: (pageNumber: number) => void
    totalUsersCount: number
    unfollowUserThunkCreator: (userId: number) => void
    users: Array<UsersType>
}

const FindUsers: React.FC<PropsType> = ({
                                            currentPage, followUserThunkCreator, followingInProcess, pageSize, setPage, totalUsersCount,
                                            unfollowUserThunkCreator, users
                                        }) => {
    return (
        <div>
            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize} setPage={setPage}
                       currentPage={currentPage}/>
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
                                    return unfollowUserThunkCreator(u.id)
                                }}>Unfollow</button>
                                :
                                <button disabled={followingInProcess.some((id: number) => id === u.id)} onClick={() => {
                                    return followUserThunkCreator(u.id)
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