import React, {ComponentType, useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    changeUserStatusThunkCreator,
    getUserStatusThunkCreator, saveProfileImage,
    setOwnUserProfileThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {WithAuthRedirect} from "../../HOC/withAuthRedirect";
import {AppStateType} from "../../redux/redux.store";
import {RouteComponentProps} from "react-router";
import {ProfileType} from "../../Types/Types";


const ProfileContainer: React.FC<propsType> = (props) => {
    let refreshProfile = () => {
        let userId: number | null = Number(props.match.params.userId);
        if (!userId) {
            userId = props.loggedUserId;
        }
        props.setOwnUserProfileThunkCreator(userId)
        props.getUserStatusThunkCreator(userId)
    }

    useEffect(() => {
        refreshProfile()
    }, [props.loggedUserId, props.match.params.userId])

    return (
        <div>
            <Profile saveProfileImage={props.saveProfileImage} isOwner={!props.match.params.userId}
                     profile={props.profile} status={props.status}
                     changeUserStatus={props.changeUserStatusThunkCreator} />
        </div>
    );

}

let mapStateToProps = (state: AppStateType): MapStateType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    loggedUserId: state.auth.id,
    isAuth: state.auth.isAuth
});

type MapStateType = {
    profile: ProfileType | null
    status: string
    loggedUserId: number | null
    isAuth: boolean
}

type MapDispatchType = {
    saveProfileImage: (file: File | null) => void
    setOwnUserProfileThunkCreator: (userId: number | null) => void
    getUserStatusThunkCreator: (userId: number | null) => void
    changeUserStatusThunkCreator: (status: string) => void
}

type matchParamType = {
    userId?: string
}

export type propsType = MapStateType & MapDispatchType & RouteComponentProps<matchParamType>



export default compose<ComponentType>(connect(mapStateToProps, {
        saveProfileImage,
        setOwnUserProfileThunkCreator,
        getUserStatusThunkCreator,
        changeUserStatusThunkCreator
    }),
    withRouter,
    WithAuthRedirect
)
(ProfileContainer);// @ts-ignore