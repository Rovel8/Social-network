import React, {ChangeEvent} from "react";
import classes from './ProfileInfo.module.css';
import preloaderGif from '../../../assets/Loading-Image-1.gif'
import defaultPageImage from '../../../assets/unnamed.png'
import ProfileProperties from "./ProfileProperties";
import {ProfileStatus} from "./ProfileStatus";
import {ProfilePropsType} from "../Profile";
import {submitUserDataThunkCreator} from "../../../redux/profile-reducer";


const ProfileInfo: React.FC<ProfilePropsType> = (props) => {

    if(!props.profile) {
        return <img src={preloaderGif} alt="Loader"/>
    }

    const setProfileImage = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files.length) {
            props.saveProfileImage(e.target.files[0])
        }
    }

    return (
      <div className={classes.Info}>
          <img src={props.profile.photos.large ? props.profile.photos.large : defaultPageImage} alt="ProfileImage"/>
          {props.isOwner && <input onChange={setProfileImage} type={'file'}/>}
          <ProfileProperties submitUserDataThunkCreator={submitUserDataThunkCreator} isOwner={props.isOwner} profile={props.profile} />
          <ProfileStatus changeUserStatus={props.changeUserStatus} status={props.status}/>
      </div>
    );
}


export default ProfileInfo