import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppStateType} from "../redux/redux.store";



export function WithAuthRedirect<WP> (Component: ComponentType<WP>) {
    let RedirectComponent: React.FC<PropsFromRedux> = (props) => {
        let {isAuth, ...restProps} = props
        if(!isAuth) return <Redirect to={'/login'} />
        return <Component {...restProps as WP} />
    }
    let mapStateToPropsForRedirect = (state: AppStateType) => ({isAuth: state.auth.isAuth});
    let connector = connect(
        mapStateToPropsForRedirect,
        {}
    )
    type PropsFromRedux = ConnectedProps<typeof connector>

    let ConnectedAuthRedirectComponent = connector(RedirectComponent)
    return ConnectedAuthRedirectComponent
}