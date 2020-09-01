import {InitialStateType, profileActions} from "../../../redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux.store";

type MapStateType = {
    profilePage: InitialStateType
}
type AddPostACType = {
    addPostActionCreator: (values: string | null) => void
}

let stateToProps = (state: AppStateType) => {
    return {
        profilePage: state.profilePage,
    }
}

let {addPostActionCreator} = profileActions

const PostsContainer = connect<MapStateType, AddPostACType, {}, AppStateType>(stateToProps, {addPostActionCreator})(Posts)

export default PostsContainer