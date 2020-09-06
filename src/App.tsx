import React, {ComponentType} from 'react';
import './App.css';
import Nav from "./parts/Nav/Nav";
import DialogsContainer from "./parts/Dialogs/DialogsContainer";
import {withRouter, Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Music from "./parts/Music/Music";
import News from "./parts/News/News";
import Settings from "./parts/Settings/Settings";
import {FindUsersContainer} from "./parts/FindUsers/FindUsersContainert";
import ProfileContainer from "./parts/Body/ProfileContainer";
import HeaderContainer from "./parts/Header/HeaderContainer";
import Login from "./parts/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeThunkCreator} from "./redux/app-reducer";
import preloaderGif from './assets/Loading-Image-1.gif'
import store, {AppStateType} from "./redux/redux.store";

type PropsType = MapStateType & DispatchStateType

class App extends React.Component<PropsType, {}> {
    componentDidMount()
    {
        this.props.initializeThunkCreator()
    }
    render() {

        if(!this.props.initialized) {
            return <img src={preloaderGif} alt="Loader"/>
        }

        return (

            <div className='wrapper'>
                <HeaderContainer/>
                <Nav/>
                <div className='content'>
                    <Switch>
                    <Route path="/Profile/:userId?" render={() => <ProfileContainer/>}/>
                    <Route path="/Dialogs" render={() => <DialogsContainer/>}/>
                    <Route path='/Music' component={Music}/>
                    <Route path='/News' component={News}/>
                    <Route path='/Settings' component={Settings}/>
                    <Route path='/FindUsers' render={() => <FindUsersContainer />}/>
                    <Route path='/Login' render={() => <Login/>}/>
                    <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                    <Route path='/*/' render={() => 'ERROR HAS OCCURRED'}/>
                    </Switch>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
    initialized: state.app.initialized
})

type MapStateType = {
    initialized: boolean
}

type DispatchStateType = {
    initializeThunkCreator: () => void
}

const AppContainer =  compose<ComponentType>(withRouter,
    connect(mapStateToProps, {initializeThunkCreator}))(App);

const WholeApp = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
}

export default WholeApp