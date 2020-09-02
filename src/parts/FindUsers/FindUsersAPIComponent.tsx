import React, {useEffect} from "react";
import FindUsers from "./FindUsers";
import preloaderGif from '../../assets/Loading-Image-1.gif'
import {UsersType} from "../../Types/Types";


type PropsType = {
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProcess: Array<number>

    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
    unfollowUserThunkCreator: (userId: number) => void
    followUserThunkCreator: (userId: number) => void
}

const FindUsersAPIComponent: React.FC<PropsType> = (props ) => {

    useEffect(() => {
        props.getUsersThunkCreator(props.currentPage, props.pageSize)
    }, [])

    let setPage = (pageNumber: number) => {
        props.getUsersThunkCreator(pageNumber, props.pageSize)
    }


        return <>
            {props.isFetching ? <img src={preloaderGif} alt='somepage' /> : ''}
        <FindUsers setPage={setPage}
                          currentPage={props.currentPage}
                          totalUsersCount={props.totalUsersCount}
                          pageSize={props.pageSize}
                          users={props.users}
                          followingInProcess={props.followingInProcess}
                   unfollowUserThunkCreator={props.unfollowUserThunkCreator}
                   followUserThunkCreator={props.followUserThunkCreator}/>
                          </>

}


export default FindUsersAPIComponent