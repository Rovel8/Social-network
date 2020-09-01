import React from 'react';
import ProfileInfo from "./Info/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import {ProfileType} from "../../Types/Types";

export type ProfilePropsType = {
    saveProfileImage: (file: File | null) => void
    isOwner: boolean
    changeUserStatus: (status: string) => void
    status: string
    profile: ProfileType | null
}

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo saveProfileImage={props.saveProfileImage} isOwner={props.isOwner} changeUserStatus={props.changeUserStatus} status={props.status} profile={props.profile}/>
            <PostsContainer />
        </div>
    );
}

export default Profile