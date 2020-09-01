import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {authUserThunkCreator, logoutUserThunkCreator} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux.store";

const HeaderContainer: React.FC<HeaderMapStateType & HeaderDispatchStateType> = (props) => {

    return <Header {...props}/>
}

const mapStateToProps = (state: AppStateType): HeaderMapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})
export type HeaderMapStateType = {
    isAuth: boolean
    login: string | null
}
export type HeaderDispatchStateType = {
    logoutUserThunkCreator: () => void
    authUserThunkCreator: () => void
}

export default connect<HeaderMapStateType, HeaderDispatchStateType, {}, AppStateType>(mapStateToProps, {authUserThunkCreator, logoutUserThunkCreator})(HeaderContainer)
