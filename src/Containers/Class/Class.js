import React, {Component} from 'react';
import { Button, Header, Image, Loader } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './Class.css';
import MainMenu from '../MainMenu/MainMenu';

export default class Class extends Component {

    // constructor(props) {
    //     super(props);
    // }

    renderPage() {
        const { accountInfo, logout, userInfo } = this.props;

        return (
            <div className='class-page'>
                <MainMenu activeItem='class' firstName={userInfo.firstName} lastName={userInfo.lastName} logout={logout}/>
                <div className='class-container'>
                    CLASS
                </div>
            </div>
        );
    }

    render() {

        const { isLoggedIn, userInfo } = this.props;

        return (
            userInfo ? this.renderPage() :
            isLoggedIn ? <div><Loader active size='massive'>Loading</Loader></div> : 
                <Redirect to='/login' />
        );
    }
}