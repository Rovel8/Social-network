import Dialogs from "./Dialogs";
import {dialogsActions} from "../../redux/dialogs-reducer";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux.store";
import {ComponentType} from "react";


let stateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.messagesPage,
    }
}
let {addMessageActionCreator} = dialogsActions

const DialogsContainer = compose<ComponentType>(connect(stateToProps, {addMessageActionCreator}), WithAuthRedirect)(Dialogs)

export default DialogsContainer